import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.product],
    }),
  }),

  overrideExisting: true,
});

export const { useGetProductsQuery } = productApi;
