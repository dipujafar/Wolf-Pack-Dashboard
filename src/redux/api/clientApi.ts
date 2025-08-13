import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });

        return {
          url: "/client",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.clients],
    }),
    getSingleClient: builder.query({
      query: (id) => ({
        url: `/client/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client],
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "/client/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.clients],
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.client],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetSingleClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} = clientApi;
