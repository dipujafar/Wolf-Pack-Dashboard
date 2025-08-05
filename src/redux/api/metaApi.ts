import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCount: builder.query({
      query: ({ year }) => {
        const params: any = {};

        if (year) {
          params["JoinYear"] = year;
        }

        return {
          url: "/dashboard/count",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),
    getUserChart: builder.query({
      query: ({ year }) => {
        const params: any = {};

        if (year) {
          params["JoinYear"] = year;
        }

        return {
          url: "/dashboard/userChart",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),

    getTotalShiftCount: builder.query({
      query: () => ({
        url: "/meta/total-shift-count",
        method: "GET",
      }),
      providesTags: [tagTypes.shift],
    }),
  }),
});

export const { useGetUserCountQuery, useGetTotalShiftCountQuery, useGetUserChartQuery } = metaApi;
