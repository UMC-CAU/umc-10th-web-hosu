import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../apis/auth";
import Modal from "./Modal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deleteAccountMutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      navigate("/login");
    },
  });

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
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-gray-400 hover:text-white text-sm"
        >
          탈퇴하기
        </button>
      </aside>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-white text-base">정말 탈퇴하시겠습니까?</p>
          <div className="flex gap-4">
            <button
              onClick={() => deleteAccountMutate()}
              disabled={isPending}
              className="px-8 py-2 border border-gray-400 text-white rounded hover:bg-gray-700 transition disabled:opacity-50"
            >
              예
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-5 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              아니오
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}