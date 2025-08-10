import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { create } from "domain";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeagues: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/league",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.leagues],
    }),
    getSingleLeague: builder.query({
      query: (id) => ({
        url: `/league/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.league],
    }),

    createLeague: builder.mutation({
      query: (data) => ({
        url: "/league/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.leagues],
    }),

    updateLeague: builder.mutation({
      query: ({ id, data }) => ({
        url: `/league/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.league],
    }),
    deleteLeague: builder.mutation({
      query: (id) => ({
        url: `/league/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.league],
    }),
    deleteLeagues: builder.mutation({
      query: (id) => ({
        url: `/league/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.leagues],
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useGetSingleLeagueQuery,
  useCreateLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
  useDeleteLeaguesMutation,
} = clientApi;
