import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';

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
}

const initialState: CartState = {
  items: cartItems,
  amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
  total: cartItems.reduce((sum, item) => sum + Number(item.price) * item.amount, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
      cartSlice.caseReducers.calculateTotals(state);
    },
    decrease(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx === -1) return;
      if (state.items[idx].amount === 1) {
        state.items.splice(idx, 1);
      } else {
        state.items[idx].amount -= 1;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart(state) {
      state.items = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals(state) {
      state.amount = state.items.reduce((sum, item) => sum + item.amount, 0);
      state.total = state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.amount,
        0
      );
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
