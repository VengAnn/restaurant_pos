import { createSlice } from "@reduxjs/toolkit";

// Initial state for the shopping cart (starts as an empty array of items)
const initialState = [];

/**
 * Redux Slice for managing cart operations such as adding items,
 * removing items, updating item quantities, and attaching kitchen preparation notes.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds an item to the cart. If the item already exists, increments its quantity.
    addItems: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // Decrements an item's quantity. If the quantity drops to 0, removes it from the cart.
    decrementItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          return state.filter((item) => item.id !== action.payload);
        }
      }
    },

    // Completely removes an item from the cart regardless of its quantity.
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    // Updates preparation notes (e.g. "no onion", "extra spicy") for a specific item.
    updateItemNotes: (state, action) => {
      const { id, notes } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.notes = notes;
      }
    },

    // Resets the cart back to an empty list.
    removeAllItems: (state) => {
      return [];
    },
  },
});

// Selector to calculate the total price of all items currently in the cart
export const getTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

// Export active action creators
export const {
  addItems,
  decrementItem,
  removeItem,
  updateItemNotes,
  removeAllItems,
} = cartSlice.actions;

// Export the reducer to be registered in the store
export default cartSlice.reducer;
