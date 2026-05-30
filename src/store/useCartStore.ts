import { create } from 'zustand';
import cartItems from '../constants/cartItems';

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  items: cartItems,
  amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
  total: cartItems.reduce((sum, item) => sum + Number(item.price) * item.amount, 0),

  increase: (id) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    }));
    get().calculateTotals();
  },

  decrease: (id) => {
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      if (item.amount === 1) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, amount: i.amount - 1 } : i
        ),
      };
    });
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
    get().calculateTotals();
  },

  clearCart: () => set({ items: [], amount: 0, total: 0 }),

  calculateTotals: () => {
    set((state) => ({
      amount: state.items.reduce((sum, item) => sum + item.amount, 0),
      total: state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.amount,
        0
      ),
    }));
  },
}));

export default useCartStore;
