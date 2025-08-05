import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const plansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.package],
    }),

    getPackages: builder.query({
      query: () => ({
        url: `/packages`,
        method: "GET",
      }),
      providesTags: [tagTypes.package],
    }),

    getSinglePackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.package],
    }),

    updatePackage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/packages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.package],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.package],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetSinglePackageQuery,
} = plansApi;
