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
}

const initialState: CartState = {
  items: cartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.amount > 1) item.amount -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { increase, decrease, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
