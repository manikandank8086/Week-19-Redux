import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  users: [],
  ediUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action) => {
      state.userInfo = action.payload.user;

      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "accesstoken",
        JSON.stringify(action.payload.accessToken)
      );
    },
    updateUserCredential: (state, action) => {
      state.userInfo = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    removeUserCredential: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accesstoken");
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
      console.log("Users : ", action.payload);
    },

    editUsers: (state, action) => {
      state.ediUser = action.payload;
      console.log("edit user authSlice", state.ediUser);
    },



    // admin auth
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload.admin;
      console.log('working  admin set credential')
      localStorage.setItem("adminInfo", JSON.stringify(action.payload.admin));
      localStorage.setItem(
        "AdminAccesstoken",
        JSON.stringify(action.payload.accessToken)
      );
    },
    removeAdminCredential: (state, action) => {
      state.adminInfo = null;
      console.log('working remove admin credential')
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("AdminAccesstoken");
    },
  },
});

export const {
  setUserCredential,
  removeUserCredential,
  updateUserCredential,
  updateUsers,
  editUsers,
  //   admin
  setAdminCredentials,
  removeAdminCredential,
} = authSlice.actions;

export default authSlice.reducer;
