import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => 'user',
      credentials: 'include',
    }),
    logout: builder.mutation({
        query: () => ({
          url: 'auth/logout', // Assuming your API has a logout route
          method: 'GET',
          credentials: 'include', // Ensure session cookies are sent
        }),
      }),
  }),

});

export const { useGetUserInfoQuery, useLogoutMutation } = userApi;
