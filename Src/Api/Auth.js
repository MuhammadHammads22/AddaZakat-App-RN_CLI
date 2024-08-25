// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl:'http://api.addazakat.com/user/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'login/',
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json',
        }
      }),
    }),
    verifyPhoneNumber: builder.mutation({
      query: (body) => {
        return {
          url: `verify-phone-number/`,
          method: 'POST',
          body: body,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    signUp: builder.mutation({
      query:(body) => ({
        url: 'register/',
        method: 'POST',
        body: body,
        headers: {
          'Content-type': 'application/json',
        }
      })
    }),
    refreshToken: builder.mutation({
      query:(refresh_token)=>{
        return{
          url: "refresh/",
          method: "POST",
          body: refresh_token,
          headers:{
            'Content-type':'application/json'
          }
        }
      }
    }), getLoggedUser: builder.query({
      query: (username) => {
        return {
          url: `get-user-detial/${username}`,
          method: 'GET',
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token') }`,
          }
        }
      }
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData }) => {
        return {
          url: 'changepassword/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token') }`,
          }
        }
      }
    }),

    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'reswordEmail/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset/${id}/${token}/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useVerifyPhoneNumberMutation,useSignUpMutation,useLoginMutation,useSendPasswordResetEmailMutation } = Api