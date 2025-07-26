import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const initialState = {
  token,
  user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
