import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  passwordSchema,
  profileSchema,
  type EmailFormData,
  type PasswordFormData,
  type ProfileFormData,
} from "../schemas/auth";
import useLocalStorage from "../hooks/useLocalStorage";

type Step = "email" | "password" | "profile";

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [, setToken] = useLocalStorage<string | null>("token", null);
  const [, setUser] = useLocalStorage<{ email: string; nickname: string } | null>("user", null);

  // 단계별로 입력 데이터 보존
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: { nickname: "" },
  });

  const handleEmailNext = emailForm.handleSubmit((data) => {
    setSavedEmail(data.email);
    setStep("password");
  });

  const handlePasswordNext = passwordForm.handleSubmit((data) => {
    setSavedPassword(data.password);
    setStep("profile");
  });

  const handleSignup = profileForm.handleSubmit((data) => {
    // 실제 API 연동 전까지 모의 토큰 저장
    const mockToken = `mock-token-${Date.now()}`;
    setToken(mockToken);
    setUser({ email: savedEmail, nickname: data.nickname });

    console.log("회원가입 완료:", {
      email: savedEmail,
      password: savedPassword,
      nickname: data.nickname,
    });

    navigate("/");
  });

  const handleBack = () => {
    if (step === "profile") setStep("password");
    else if (step === "password") setStep("email");
    else navigate(-1);
  };

  return (
    <div>
      <div className="flex justify-center mt-24">
        <div className="w-80 flex flex-col gap-4">
          <div className="flex items-center relative mb-2">
            <button onClick={handleBack} className="absolute left-0 text-white text-lg">
              {"<"}
            </button>
            <h1 className="text-xl font-semibold w-full text-center">회원가입</h1>
          </div>

          {step === "email" && (
            <form onSubmit={handleEmailNext} className="flex flex-col gap-4">
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
                  {...emailForm.register("email")}
                  placeholder="이메일을 입력해주세요!"
                  className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!emailForm.formState.isValid}
                className={`w-full py-3 rounded transition ${
                  !emailForm.formState.isValid
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                다음
              </button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordNext} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                <span>{savedEmail}</span>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...passwordForm.register("password")}
                    placeholder="비밀번호를 입력해주세요!"
                    className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    {...passwordForm.register("passwordConfirm")}
                    placeholder="비밀번호를 다시 한 번 입력해주세요!"
                    className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPasswordConfirm ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordForm.formState.errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!passwordForm.formState.isValid}
                className={`w-full py-3 rounded transition ${
                  !passwordForm.formState.isValid
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                다음
              </button>
            </form>
          )}

          {step === "profile" && (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                  {...profileForm.register("nickname")}
                  placeholder="닉네임을 입력해주세요!"
                  className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
                {profileForm.formState.errors.nickname && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileForm.formState.errors.nickname.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!profileForm.formState.isValid}
                className={`w-full py-3 rounded transition ${
                  !profileForm.formState.isValid
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                회원가입 완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
