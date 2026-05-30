import useCartStore from '../store/useCartStore';
import useModalStore from '../store/useModalStore';

export default function Modal() {
  const clearCart = useCartStore((state) => state.clearCart);
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-6 shadow-xl min-w-64">
        <p className="text-lg font-semibold text-gray-800 text-center">
          장바구니를 모두 비우시겠습니까?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="px-6 py-2 bg-[#1e2a3a] text-white rounded hover:bg-[#2c3e55] font-medium"
          >
            네
          </button>
          <button
            onClick={closeModal}
            className="px-3 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 font-medium"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
