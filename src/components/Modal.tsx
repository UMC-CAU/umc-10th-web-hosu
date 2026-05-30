import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

export default function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

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
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="px-6 py-2 bg-[#1e2a3a] text-white rounded hover:bg-[#2c3e55] font-medium"
          >
            네
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            className="px-3 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 font-medium"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
