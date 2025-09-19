import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const closerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClosers: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });

        return {
          url: "/closer",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.closers],
    }),
    getSingleCloser: builder.query({
      query: (id) => ({
        url: `/closer/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.closer],
    }),

    updateCloser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/closer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.closers, tagTypes.closer],
    }),
  }),
});

export const { useGetAllClosersQuery, useGetSingleCloserQuery, useUpdateCloserMutation } =
  closerApi;
