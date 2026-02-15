import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // check if item already exists
      const existingItem = state.cartItems.find(
        (product) => product._id === item._id,
      );

      if (existingItem) {
        // increase quantity instead of adding duplicate
        existingItem.quantity += 1;
      } else {
        // add new item
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (product) => product._id === action.payload,
      );
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (product) => product._id === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
