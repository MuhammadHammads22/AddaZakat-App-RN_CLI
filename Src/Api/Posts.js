import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken } from '../store/localStore'
import { selectAccessToken } from '../Slices/UserSlice'
// import { token } from '../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define a service using a base URL and expected endpoints
export const postApis = createApi({
  reducerPath: 'postApis',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.addazakat.com/post'   
  }),
  
  endpoints: (builder) => ({
    
    getPostList: builder.query({
      query: ({token}) =>({ 
      url: '/get-posts',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }),
   
    getPostHistory: builder.query({
      query: ({token}) => {
        return {
          url: '/history',
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        }
      },
    }),

    getPostSatisfied: builder.query({
      query: ({token}) => {
        return {
          url: '/satisfied',
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        }
      }, 
    }),

    getPostDocFiles: builder.query({
      query: ({slug,token}) => {
        return {
          url: `/get-post-doc-files/${slug}`,
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        }
      }, 
    }),

    getPostSaves: builder.query({
      query: ({token}) => {
        return {
          url: '/showSave',
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
          }
          
        }
      },
    }),

    getPostDetail: builder.query({
      query: ({slug,token}) => {
        // console.log("token:"+token,"slug:"+slug)
        return {
          url: `/detail-post/${slug}`,
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }
      },
    }),

    createPost: builder.mutation({
      query: ({data,token}) => {
        return {
          url: '/create/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: data
        }
      },

    }),

    uploadFile : builder.mutation({
      query: ({formData,token}) => {
        console.log('***** formData', formData)
        return {
          url: '/upload-file/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      },
    }),

    upvote : builder.mutation({
      query: ({slug,token}) => {
        console.log("token:"+token,"slug:"+slug)
        return {
          url: `/upvote-post/${slug}/`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      },
    }),

    downvote : builder.mutation({
      query: ({slug,token}) => {
        return {
          url: `/downvote-post/${slug}`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      },
    }),

    save : builder.mutation({
      query: ({slug,token}) => {
        console.log("token:"+token,"slug:"+slug)
        return {
          url: `/save-post/${slug}/`,
          method:'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      },
    }),

    comment : builder.mutation({
      query: ({slug,comment,token}) => {
        return {
          url: 'PostCommenta/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: {slug:slug,body:comment}
        }
      },
    }),
    getComments: builder.query({
      query: ({slug,token}) => {
        console.log("accesstoken:"+token,"\nslug: "+slug)
        return{
          url:`/get-post-comments/${slug}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }}
    }),

    search: builder.query({
      query: (query) => {
        return {
          url: 'search/',
          method: 'GET',
          params: {query},
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      },
    }),


    report : builder.mutation({
      query: ({data,token}) => {
        return {
          url: '/report-post/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data
        }
      },
    }),

    donate : builder.mutation({
      query: (data) => {
        return {
          url: '/donate-post/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: data
        }
      },
    }),

    filter: builder.query({
      query: (query) => {
        return {
          url: 'filter/',
          method: 'GET',
          params: {query},
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      },
    }),

    profilePost: builder.query({
      query: () => {
        return {
          url: 'profile-posts/',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      },
    }),


    supportHistory: builder.query({
      query: () => {
        return {
          url: 'donate-history/',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      },
    })
  }),
})

export const { 
    useGetPostListQuery, useGetPostHistoryQuery, useGetPostSatisfiedQuery, useGetPostSavesQuery, useGetPostDetailQuery, useGetPostDocFilesQuery, useCreatePostMutation, useUploadFileMutation,
    useUpvoteMutation, useDownvoteMutation, useSaveMutation, useCommentMutation, useGetCommentsQuery, useSearchQuery, useReportMutation, useDonateMutation, useFilterQuery, useProfilePostQuery, useSupportHistoryQuery

} = postApis

