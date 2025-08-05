import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: () => ({
        url: "/banners",
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    uploadBanner: builder.mutation({
      query: (data) => ({
        url: "/banners",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const { useGetAllBannersQuery, useUploadBannerMutation, useDeleteBannerMutation } = bannerApi;
