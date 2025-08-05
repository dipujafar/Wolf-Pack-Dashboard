import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/payments",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.payment],
    }),
    getEaringChart: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/dashboard/earningChart",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.payment],
    }),
    getPaymentAmount: builder.query({
      query: (query: { label: string; value: string }[]) => {
        const params = new URLSearchParams();
        query.forEach(({ label, value }) => {
          if (label && value) {
            params.append(label, value);
          }
        });
        return {
          url: "/payments/amount",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.payment],
    }),
  }),

  overrideExisting: true,
});

export const { useGetPaymentsQuery, useGetEaringChartQuery, useGetPaymentAmountQuery } = paymentApi;
