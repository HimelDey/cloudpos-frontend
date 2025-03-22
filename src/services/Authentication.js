import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AuthenticationApi = createApi({
    reducerPath: 'AuthenticationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    tagTypes: ['authentication'],
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => `users`,
        providesTags: ['authentication'],
      }),
      addUsers: builder.mutation({
        query: (user) => ({
          url: 'users', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'POST',
          body: user,
        }),
        invalidatesTags: ['authentication'],
      }),
      authenticate: builder.mutation({
        query: (userData) => ({
          url: 'users/authenticate', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'POST',
          body: userData,
        }),
        invalidatesTags: ['authentication'],
      }),
      editUsers: builder.mutation({
        query: (user) => ({
          url: 'users', // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'PUT',
          body: user,
        }),
        invalidatesTags: ['authentication'],
      }),

      deleteUsers: builder.mutation({
        query: (id) => ({
          url: `users/${id}`, // assuming 'cuisines' is the endpoint for adding a new cuisine
          method: 'DELETE'
        }),
        invalidatesTags: ['authentication'],
      }),

    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useAddUsersMutation,useAuthenticateMutation,useEditUsersMutation, useGetUsersQuery, useDeleteUsersMutation } = AuthenticationApi