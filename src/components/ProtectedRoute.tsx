import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthLayout from "../layout/auth-layout";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const location = useLocation(); // Change to logged-in, it shows page to visit
  const [confirmed, setConfirmed] = useState(false);

  if (!token) {
    if (!confirmed) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-zinc-800 rounded-xl p-8 flex flex-col items-center gap-5 shadow-xl">
            <p className="text-white text-base">로그인이 필요한 서비스입니다. 로그인을 해주세요!</p>
            <button
              className="bg-cyan-500 hover:bg-cyan-400 transition text-white rounded-full px-8 py-2 font-medium"
              onClick={() => setConfirmed(true)}
            >
              확인
            </button>
          </div>
        </div>
      );
    }
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <AuthLayout />;
}
