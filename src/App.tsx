import { useEffect, useState } from "react";
import "./App.css";
// import {  } from "./types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import styled from "styled-components";
import { useGetQuestionsQuery } from "./services/poll";
import type { RootState } from "./store";
import { decrement, increment } from "./slices/poll/questionSlice";
import PollList from "./components/PollList";

const Title = styled.h2`
  color: blue;
  padding: 1rem 4rem;
`;
function App() {
  // const count = useSelector((state: RootState) => state.question.value , shallowEqual);
  const { data, error, isLoading } = useGetQuestionsQuery("all");
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState<any[]>([]);
  return (
    <>
      <div>
        <Title>Number of Questions: {data?.length}</Title>
        <PollList polls={data} error={error} isLoading={isLoading} />
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment!
        </button>
      </div>
    </>
  );
}

export default App;
