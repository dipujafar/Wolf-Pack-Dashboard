/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";
import { tagTypesList } from "../tagTypes";
import cookie from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const otpToken = sessionStorage.getItem("token");
    const forgotPasswordToken = sessionStorage.getItem("forgotPasswordToken");
    const token = (getState() as any).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (otpToken) {
      headers.set("token", otpToken);
    }
    if (forgotPasswordToken) {
      headers.set("token", forgotPasswordToken);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    try {
      const refreshToken = cookie.get("refresh-token");
      if (!refreshToken) {
        api.dispatch(logout());
        return result;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
        credentials: "include",
        body: JSON.stringify({
          refreshToken,
        }),
      });
      const data = await res.json();
      if (data?.data?.accessToken) {
        const user = api.getState().auth.user;

        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          }),
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.log(error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,

  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
