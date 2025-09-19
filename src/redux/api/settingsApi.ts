import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: `/settings`,
        method: "GET",
      }),
      providesTags: [tagTypes.setting],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.setting],
    }),

    createPromotionalMessage: builder.mutation({
      query: (data) => ({
        url: "/settings/send-promotional-mail",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.promotion],
    }),

    getAllPromotions: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/settings/promotional-mails",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.promotion],
    }),

    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `/settings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
  }),
});

export const {
  useUpdateSettingsMutation,
  useGetSettingsQuery,
  useCreatePromotionalMessageMutation,
  useGetAllPromotionsQuery,
  useDeletePromotionMutation,
} = settingsApi;
