import { useForm } from "react-hook-form";
import type { ProfileFormData } from "../../schemas/auth";
import { profileSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onNext: (nickname: string) => void;
  onBack: () => void;
}

export default function ProfileStep({ onNext, onBack }: Props) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: { nickname: "" },
  });

  return (
    <form onSubmit={handleSubmit((data) => onNext(data.nickname))} className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </div>

      <div>
        <input
          type="text"
          {...register("nickname")}
          placeholder="닉네임을 입력해주세요!"
          className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
        />
        {errors.nickname && (
          <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded border border-gray-600 text-white hover:bg-gray-800 transition"
        >
          이전
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={`flex-1 py-3 rounded transition ${
            !isValid
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
}
