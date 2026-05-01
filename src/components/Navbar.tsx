import { useNavigate } from "react-router-dom";
import { logout } from "../apis/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
      <div className="text-pink-500 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>돌려돌려LP판</div>
      <div className="flex gap-3">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
          >
            로그아웃
          </button>
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
