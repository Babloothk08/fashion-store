import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     value : 0,
// }

export const cartSlice = createSlice({
    name : 'cart',
    initialState: {
        items:[],
    },
    reducers : {
      addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (i) => i.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (i) => i.product.id !== action.payload
      );
    },
  },
});
export const {addItem,  increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer