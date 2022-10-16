import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPoll, IQuestionBody } from "../types";

// Define a service using a base URL and expected endpoints

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://polls.apiblueprint.org/" }),
  endpoints: (builder) => ({
    getQuestions: builder.query<IPoll[], string>({
      query: () => "questions",
    }),
    getSingleQuestion: builder.query<IPoll, string>({
      query: (questionId) => `questions/${questionId}`,
    }),
    answerPoll: builder.mutation<any, {questionId:string , choiceId:string}>({
      query: ( {questionId , choiceId} ) => {
        return {
          url: `questions/${questionId}/choices/${choiceId}`,
          method: "POST",
        };
      },
    }),
    addPoll: builder.mutation<IQuestionBody, any>({
      query: ( body ) => {
        return {
          url: "questions",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetQuestionsQuery,
  useGetSingleQuestionQuery,
  useAddPollMutation,
  useAnswerPollMutation,
} = pollApi;
