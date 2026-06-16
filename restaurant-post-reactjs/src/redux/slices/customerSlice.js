import { createSlice } from "@reduxjs/toolkit";

// Initial state for customer information and table selection
const initialState = {
  orderId: "", // Unique identifier for the order (timestamp-based)
  customerName: "", // Name of the customer
  customerPhone: "", // Phone number of the customer
  guests: 0, // Number of guests/diners
  table: null, // Assigned table details (e.g., table number, status)
};

/**
 * Redux Slice for managing customer information and table assignments.
 */
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // Sets customer details and auto-generates a unique order ID
    setCustomer: (state, action) => {
      const { name, phone, guests } = action.payload;
      state.orderId = `${Date.now()}`;
      state.customerName = name;
      state.customerPhone = phone;
      state.guests = guests;
    },

    // Clears all customer details and resets fields back to defaults
    removeCustomer: (state) => {
      state.customerName = "";
      state.customerPhone = "";
      state.guests = 0;
      state.table = null;
    },

    // Updates the table details associated with the customer
    updateTable: (state, action) => {
      state.table = action.payload.table;
      state.tableId = action.payload.tableId;
    },
  },
});

// Export active action creators
export const { setCustomer, removeCustomer, updateTable } =
  customerSlice.actions;

// Export the reducer to be registered in the store
export default customerSlice.reducer;
