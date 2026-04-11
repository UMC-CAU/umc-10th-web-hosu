import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

function LoginPage() {
  const navigate = useNavigate();

  const { errors, touched, getInputProps, isValid } = useForm({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      const errors: { email?: string; password?: string } = {};
      if (values.email && (!values.email.includes("@") || !values.email.includes("."))) {
        errors.email = "올바른 이메일 형식이 아닙니다.";
      }
      if (values.password && values.password.length < 6) {
        errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
      }
      return errors;
    },
  });

  return (
    <div>
      <div className="flex justify-center mt-24">
        <div className="w-80 flex flex-col gap-4">
          <div className="flex items-center relative mb-2">
            <button onClick={() => navigate(-1)} className="absolute left-0 text-white text-lg">{"<"}</button>
            <h1 className="text-xl font-semibold w-full text-center">로그인</h1>
          </div>

          <button className="flex items-center justify-center gap-3 w-full border border-gray-600 py-3 rounded hover:bg-gray-800 transition">
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
              {...getInputProps("email")}
              placeholder="이메일을 입력해주세요!"
              className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...getInputProps("password")}
              placeholder="비밀번호를 입력해주세요!"
              className="w-full bg-transparent border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={!isValid}
            className={`w-full py-3 rounded transition ${
              !isValid
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            로그인
          </button>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;
