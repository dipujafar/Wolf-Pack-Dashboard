import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const leagueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllPrizeQuery, useUpdatePrizeMutation } = leagueApi;
