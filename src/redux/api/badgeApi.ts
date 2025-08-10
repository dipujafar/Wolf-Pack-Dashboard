import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const badgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBadges: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/badge",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.badges],
    }),
    getSingleBadge: builder.query({
      query: (id) => ({
        url: `/badge/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.badge],
    }),

    createBadge: builder.mutation({
      query: (data) => ({
        url: "/badge/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.badges],
    }),

    updateBadge: builder.mutation({
      query: ({ id, data }) => ({
        url: `/badge/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.badge],
    }),

    deleteBadge: builder.mutation({
      query: (id) => ({
        url: `/badge/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.badge],
    }),
  }),
});

export const {
  useGetAllBadgesQuery,
  useGetSingleBadgeQuery,
  useCreateBadgeMutation,
  useUpdateBadgeMutation,
  useDeleteBadgeMutation,
} = badgeApi;
