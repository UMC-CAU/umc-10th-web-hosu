import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, amount, total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200">
            <img
              src={item.img}
              alt={item.title}
              className="w-20 h-20 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-snug">{item.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{item.singer}</p>
              <p className="font-bold text-gray-900 mt-1">${item.price}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrease(item.id))}
                  className="w-8 h-8 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium">{item.amount}</span>
                <button
                  onClick={() => dispatch(increase(item.id))}
                  className="w-8 h-8 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="text-gray-400 hover:text-red-500 text-xl leading-none"
                aria-label="삭제"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={() => dispatch(openModal())}
          className="px-8 py-3 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 font-medium"
        >
          전체 삭제
        </button>
        <div className="text-center text-gray-700 space-y-1">
          <p>총 수량: <span className="font-bold">{amount}개</span></p>
          <p>총 금액: <span className="font-bold">{total.toLocaleString()}원</span></p>
        </div>
      </div>
    </div>
  );
}
