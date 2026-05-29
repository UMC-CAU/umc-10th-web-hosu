import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
});

export default cartSlice.reducer;
