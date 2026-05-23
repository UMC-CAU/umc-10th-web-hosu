import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PasswordFormData } from "../../schemas/auth";
import { passwordSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  email: string;
  onNext: (password: string) => void;
  onBack: () => void;
}

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
  </svg>
);

export default function PasswordStep({ email, onNext, onBack }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: { password: "", passwordConfirm: "" },
  });

  return (
    <form onSubmit={handleSubmit((data) => onNext(data.password))} className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
        <span>{email}</span>
      </div>

      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="비밀번호를 입력해주세요!"
            className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <input
            type={showPasswordConfirm ? "text" : "password"}
            {...register("passwordConfirm")}
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
            className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPasswordConfirm ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>
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
          다음
        </button>
      </div>
    </form>
  );
}
