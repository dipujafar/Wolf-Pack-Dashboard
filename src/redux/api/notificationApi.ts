import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/notification/notifications",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.notification],
    }),
    seenNotification: builder.mutation({
      query: () => ({
        url: "/notification/read",
        method: "PATCH",
        // after trigger this api then all notification will be seen
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/notification",
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    testNotification: builder.mutation({
      query: () => ({
        url: "/notification/create",
        method: "POST",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSeenNotificationMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useTestNotificationMutation,
} = settingsApi;
