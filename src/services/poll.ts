import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPoll, IQuestionBody } from "../types";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://polls.apiblueprint.org/" }),
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getQuestions: builder.query<IPoll[], string>({
      query: () => "questions",
      providesTags: ["Questions"],
    }),
    getSingleQuestion: builder.query<IPoll, string>({
      query: (questionId) => `questions/${questionId}`,
      providesTags: ["Questions"],
    }),
    answerPoll: builder.mutation<
      void,
      { questionId: string; choiceId: string }
    >({
      query: ({ questionId, choiceId }) => {
        return {
          url: `questions/${questionId}/choices/${choiceId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Questions"]

    }),
    addPoll: builder.mutation<void, IQuestionBody>({
      query: (body) => {
        return {
          url: "questions?",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
      invalidatesTags: ["Questions"]
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetSingleQuestionQuery,
  useAddPollMutation,
  useAnswerPollMutation,
} = pollApi;
