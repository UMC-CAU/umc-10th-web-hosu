import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../apis/auth";

interface NavbarProps {
  onToggle?: () => void;
}

export default function Navbar({ onToggle }: NavbarProps) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      getMe().then((user) => setName(user.name));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <button onClick={onToggle}>☰</button>
        <div className="text-pink-500 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>DOLIGO</div>
      </div>
      <div className="flex gap-3">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <button>🔍</button>
            <div>{name}님 반갑습니다.</div>
            <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
