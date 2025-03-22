import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
      getProduct: builder.query({
        query: () => `products`,
        providesTags: ['products'],
      }),
      addProduct: builder.mutation({
        query: (newProduct) => ({
          url: 'products', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'POST',
          body: newProduct,
        }),
        invalidatesTags: ['products'],
      }),
      editProduct: builder.mutation({
        query: (editProduct) => ({
          url: 'products', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'PUT',
          body: editProduct,
        }),
        invalidatesTags: ['products'],
      }),

      deleteCuisine: builder.mutation({
        query: (id) => ({
          url: `products/${id}`, 
          method: 'DELETE'
        }),
        invalidatesTags: ['products'],
      }),

    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetProductQuery, useAddProductMutation, useEditProductMutation, useDeleteCuisineMutation } = ProductApi