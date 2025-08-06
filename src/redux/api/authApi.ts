import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    forgetPass: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    reSetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPassMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useReSetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
