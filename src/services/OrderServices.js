import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const OrderApi = createApi({
    reducerPath: 'OrderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    tagTypes: ['orders'],
    endpoints: (builder) => ({
      getOrders: builder.query({
        query: () => `orders`,
        providesTags: ['orders'],
      }),
      addOrder: builder.mutation({
        query: (newOrder) => ({
          url: 'orders', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'POST',
          body: newOrder,
        }),
        invalidatesTags: ['orders'],
      }),
      editOrder: builder.mutation({
        query: (editOrder) => ({
          url: 'orders', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'PUT',
          body: editOrder,
        }),
        invalidatesTags: ['orders'],
      }),

      deleteOrder: builder.mutation({
        query: (id) => ({
          url: `orders/${id}`, 
          method: 'DELETE'
        }),
        invalidatesTags: ['orders'],
      }),

    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
export const { useAddOrderMutation,useGetOrdersQuery,useEditOrderMutation,useDeleteOrderMutation  } = OrderApi