import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ProductCategoryApi = createApi({
    reducerPath: 'ProductCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    tagTypes: ['cuisines'],
    endpoints: (builder) => ({
      getProductCategory: builder.query({
        query: () => `cuisines`,
        providesTags: ['cuisines'],
      }),
      addCuisine: builder.mutation({
        query: (newCuisine) => ({
          url: 'cuisines', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'POST',
          body: newCuisine,
        }),
        invalidatesTags: ['cuisines'],
      }),
      editCuisine: builder.mutation({
        query: (editCuisine) => ({
          url: 'cuisines', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'PUT',
          body: editCuisine,
        }),
        invalidatesTags: ['cuisines'],
      }),

      deleteCuisine: builder.mutation({
        query: (id) => ({
          url: `cuisines/${id}`, // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'DELETE'
        }),
        invalidatesTags: ['cuisines'],
      }),

    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetProductCategoryQuery,useAddCuisineMutation,useEditCuisineMutation,useDeleteCuisineMutation } = ProductCategoryApi