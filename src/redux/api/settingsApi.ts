import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: ({ label }: { label: string }) => ({
        url: `/setting/${label}`,
        method: "GET",
      }),
      providesTags: [tagTypes.setting],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.setting],
    }),
  }),
});

export const { useUpdateSettingsMutation, useGetSettingsQuery } = settingsApi;
