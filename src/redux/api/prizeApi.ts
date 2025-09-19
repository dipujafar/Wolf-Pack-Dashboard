import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const leagueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPrize: builder.mutation({
      query: (data) => ({
        url: "/prize/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.prizes],
    }),

    getAllPrize: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/prize",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.prizes],
    }),
    getSinglePrize: builder.query({
      query: (id) => ({
        url: `/prize/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.prize],
    }),
    updatePrize: builder.mutation({
      query: ({ data, id }) => ({
        url: `/prize/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.prizes],
    }),
  }),
});

export const {
  useCreatePrizeMutation,
  useGetAllPrizeQuery,
  useGetSinglePrizeQuery,
  useUpdatePrizeMutation,
} = leagueApi;
