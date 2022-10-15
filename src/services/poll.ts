import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints


export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://polls.apiblueprint.org/" }),
  endpoints: (builder) => ({
    getQuestions: builder.query<any, string>({
      query: () => "questions",
    }),
    getSingleQuestion: builder.query<any, string>({
        query: (questionId) => `questions/${questionId}`,
      }),

      addPoll: builder.mutation<any ,{body:any,questionId:number} >({
        query:({body , questionId}) =>{
          return {
            url: `/questions/${questionId}`,
            method: "POST",
            body,
          };
        },
      }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuestionsQuery , useGetSingleQuestionQuery, useAddPollMutation } = pollApi;