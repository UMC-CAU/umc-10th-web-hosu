import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../apis/auth";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import ProfileStep from "./ProfileStep";

type Step = "email" | "password" | "profile";

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  const handleBack = () => {
    if (step === "profile") setStep("password");
    else if (step === "password") setStep("email");
    else navigate(-1);
  };

  const handleEmailNext = (email: string) => {
    setSavedEmail(email);
    setStep("password");
  };

  const handlePasswordNext = (password: string) => {
    setSavedPassword(password);
    setStep("profile");
  };

  const handleProfileNext = async (nickname: string) => {
    try {
      await signup(savedEmail, savedPassword, nickname);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="w-80 flex flex-col gap-4">
        <div className="flex items-center relative mb-2">
          <button onClick={handleBack} className="absolute left-0 text-white text-lg">
            {"<"}
          </button>
          <h1 className="text-xl font-semibold w-full text-center">회원가입</h1>
        </div>

        {step === "email" && <EmailStep onNext={handleEmailNext} />}
        {step === "password" && (
          <PasswordStep
            email={savedEmail}
            onNext={handlePasswordNext}
            onBack={() => setStep("email")}
          />
        )}
        {step === "profile" && (
          <ProfileStep
            onNext={handleProfileNext}
            onBack={() => setStep("password")}
          />
        )}
      </div>
    </div>
  );
}
