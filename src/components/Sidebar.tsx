import { useNavigate } from "react-router-dom"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* 모바일 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-40 transition-transform duration-300
        md:static md:z-auto md:h-auto md:translate-x-0
        w-48 bg-gray-900 border-r border-gray-800 flex flex-col justify-between py-6 px-4
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col gap-4 mt-16 md:mt-0">
          <button onClick={() => { navigate("/search"); onClose(); }} className="flex items-center gap-3 text-white hover:text-pink-500">
            🔍 찾기
          </button>
          <button onClick={() => { navigate("/me"); onClose(); }} className="flex items-center gap-3 text-white hover:text-pink-500">
            👤 마이페이지
          </button>
        </div>
        <button className="text-gray-400 hover:text-white text-sm">
          탈퇴하기
        </button>
      </aside>
    </>
  )
}