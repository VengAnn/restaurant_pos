import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

// Configure global Redux store
export const store = configureStore({
  reducer: {
    // Reducer for managing employee/user authentication state
    user: userSlice,
    // Reducer for managing customer information
    customer: customerSlice,
    // Reducer for managing cart items and checkout state
    cart: cartSlice,
  },

  // Enable Redux DevTools only in development mode
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
