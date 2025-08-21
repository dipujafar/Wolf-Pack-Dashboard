import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    allUser: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "user/users",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),
    topUsers: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "user/top-users",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getBadges: builder.query({
      query: (id) => ({
        url: `/user/badges/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getPrizeWinners: builder.query({
      query: () => ({
        url: `/user/prize-winner`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.user],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    updateUserStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    uploadFiles: builder.mutation({
      query: (data) => ({
        url: "/user/upload-files",
        method: "POST",
        //headers: { "Content-Type": "multipart/form-data" },
        body: data,
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateUserMutation,
  useAllUserQuery,
  useGetSingleUserQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useGetBadgesQuery,
  useTopUsersQuery,
  useGetPrizeWinnersQuery,
  useUploadFilesMutation,
} = userApi;
