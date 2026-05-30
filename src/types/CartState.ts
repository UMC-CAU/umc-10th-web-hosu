import type { CartItem } from './CartItem';

export interface CartState {
  items: CartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}
