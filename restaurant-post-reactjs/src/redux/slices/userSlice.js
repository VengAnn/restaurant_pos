import { createSlice } from "@reduxjs/toolkit";

// Initial state for employee/user authentication and profile info
const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  isAuth: false, // track current user loggined or not
};

// Slice to handle user-related state changes (login, logout, session persistence)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sets user profile details upon successful registration or login
    setUser: (state, action) => {
      const { _id, name, phone, email, role } = action.payload;
      state._id = _id;
      state.name = name;
      state.phone = phone;
      state.email = email;
      state.role = role;
      state.isAuth = true;
    },

    // Clears user profile details upon logout or invalid token session
    removeUser: (state) => {
      state._id = "";
      state.email = "";
      state.name = "";
      state.phone = "";
      state.role = "";
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
