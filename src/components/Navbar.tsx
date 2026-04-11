export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
      <div className="text-pink-500 font-bold text-xl">돌려돌려LP판</div>
      <div className="flex gap-3">
        <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition">
          로그인
        </button>
        <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
          회원가입
        </button>
      </div>
    </nav>
  )
}
