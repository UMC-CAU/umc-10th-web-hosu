import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex gap-6 p-4">
        <NavLink to="/" className={({ isActive }) => `gap${isActive ? "font-bold text-green-300" : ""}`}>홈</NavLink>
        <NavLink to="/popular" className={({ isActive }) => `${isActive ? "font-bold text-green-300" : ""}`}>인기 영화</NavLink>
        <NavLink to="/on-screen" className={({ isActive }) => `${isActive ? "font-bold text-green-300" : ""}`}>상영 중</NavLink>
        <NavLink to="/high-rate" className={({ isActive }) => `${isActive ? "font-bold text-green-300" : ""}`}>평점 높은</NavLink>
        <NavLink to="/coming-soon" className={({ isActive }) => `${isActive ? "font-bold text-green-300" : ""}`}>개봉 예정</NavLink>
      </nav>
      <div className="flex items-center justify-center gap-4 my-4">
        <button className="px-4 py-2 bg-gray-300 rounded-lg">{'<'}</button>
        <span>1 페이지</span>
        <button className="px-4 py-2 bg-purple-300 rounded-lg">{'>'}</button>
      </div>
    </>
  )
}

export default Navbar;