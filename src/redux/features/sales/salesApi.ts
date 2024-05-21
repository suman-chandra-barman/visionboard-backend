import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (data) => {
        return {
          url: "/sales/create-sale",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["sales", "eyeglasses"],
    }),

    getAllSales: builder.query({
      query: (query) => {
        return {
          url: `/sales?history=${Number(query?.day)}`,
          method: "GET",
        };
      },
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSalesMutation, useGetAllSalesQuery } = salesApi;
