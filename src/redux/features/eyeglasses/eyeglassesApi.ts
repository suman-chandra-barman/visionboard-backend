import { baseApi } from "../../api/baseApi";

const eyeglassesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEyeglasses: builder.mutation({
      query: (data) => {
        return {
          url: "/eyeglasses/create-eyeglass",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["eyeglasses"],
    }),

    getAllEyeglasses: builder.query({
      query: (query) => {
        return {
          url: `/eyeglasses?${query?.queryName}=${
            query?.value ? query?.value : {}
          }`,
          method: "GET",
        };
      },
      providesTags: ["eyeglasses"],
    }),

    getSingleEyeglasses: builder.query({
      query: (id: string) => {
        return {
          url: `/eyeglasses/${id}`,
          method: "GET",
        };
      },
      providesTags: ["eyeglasses"],
    }),

    updateEyeglasses: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/eyeglasses/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["eyeglasses"],
    }),

    deleteEyeglasses: builder.mutation({
      query: (id) => {
        return {
          url: `/eyeglasses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["eyeglasses"],
    }),

    bulkDeleteEyeglasses: builder.mutation({
      query: (data) => {
        return {
          url: `/eyeglasses`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["eyeglasses"],
    }),
  }),
});

export const {
  useCreateEyeglassesMutation,
  useGetAllEyeglassesQuery,
  useGetSingleEyeglassesQuery,
  useUpdateEyeglassesMutation,
  useDeleteEyeglassesMutation,
  useBulkDeleteEyeglassesMutation,
} = eyeglassesApi;
