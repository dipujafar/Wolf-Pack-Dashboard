import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupports: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/contacts",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.support],
    }),
    sendReply: builder.mutation({
      query: ({ message, id }: { message: string; id: string }) => ({
        url: `/contacts/reply/${id}`,
        method: "POST",
        body: {
          message,
        },
      }),
      invalidatesTags: [tagTypes.support],
    }),
  }),

  overrideExisting: true,
});

export const { useGetSupportsQuery, useSendReplyMutation } = supportApi;
