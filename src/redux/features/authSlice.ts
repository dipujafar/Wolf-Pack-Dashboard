/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type TInitialState = { user: TUser | null; token: string | null };

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, refreshToken } = action.payload;

      state.user = user;
      state.token = token;

      // Store token in Cookies for middleware authentication
      Cookies.set("wolf-pack-access-token", token, { path: "/" });
      Cookies.set("refresh-token", refreshToken, { path: "/" });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from cookie
      Cookies.remove("wolf-pack-access-token", { path: "/" });
      Cookies.remove("refresh-token", { path: "/" });
    },
  },
});

// selectors
export const selectUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
