import { useForm } from "react-hook-form";
import { type EmailFormData, emailSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onNext: (email: string) => void;
}

export default function EmailStep({ onNext }: Props) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  return (
    <form onSubmit={handleSubmit((data) => onNext(data.email))} className="flex flex-col gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-3 w-full border border-gray-600 py-3 rounded hover:bg-gray-800 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span>구글 로그인</span>
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-600" />
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-600" />
      </div>

      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="이메일을 입력해주세요!"
          className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded transition ${
          !isValid
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-pink-500 text-white hover:bg-pink-600"
        }`}
      >
        다음
      </button>
    </form>
  );
}
