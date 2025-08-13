import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: `/settings`,
        method: "GET",
      }),
      providesTags: [tagTypes.setting],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.setting],
    }),
  }),
});

export const { useUpdateSettingsMutation, useGetSettingsQuery } = settingsApi;
