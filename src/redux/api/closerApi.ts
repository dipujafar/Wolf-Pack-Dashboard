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
  }),
});

export const { useGetAllClosersQuery } = closerApi;
