import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaCount: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });

        return {
          url: "/meta/counts",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),
    getUserChart: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });

        return {
          url: "/meta/users",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),
    getCloserChart: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });

        return {
          url: "/meta/closers",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),

    getSingleUserSalesOverview: builder.query({
      query: ({ id, query }: { id: string; query: { label: string; value: string }[] }) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: `/meta/sales-overview/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetMetaCountQuery,
  useGetUserChartQuery,
  useGetCloserChartQuery,
  useGetSingleUserSalesOverviewQuery,
} = metaApi;
