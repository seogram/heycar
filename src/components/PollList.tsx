import { Link } from "react-router-dom";
import { getDate } from "../utils/date";
import { IPoll } from "../types";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
  width: 100%;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 20%;
  background: #fff;
  border: 1px solid #ccc;
  margin-bottom: 50px;
  transition: 0.3s;
  @media (max-width: 1000px) {
    width: 40%;
  }
  @media (max-width: 620px) {
    width: 100%;
  }
`;

const PollDetail = styled.section`
  margin-top: auto;
  padding: 0.2rem;
`;

const QuestionTitle = styled.section`
  padding-bottom: 1rem;
  font-size: 1.5em;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChoiceWrapper = styled.ul`
  padding: 1rem 0.5rem;
  line-height: 2rem;
`;

const DateWrapper = styled.div`
padding-bottom: 2rem;
text-align : right;
`;

const PollList = ({
  polls = [],
  isLoading,
  error,
}: {
  polls?: IPoll[];
  error?: Object;
  isLoading: boolean;
}) => {
  const renderQuestion = () =>
    polls.map((poll) => {
      return (
        <Article key={poll.url}>
          <DateWrapper>
            {getDate(poll.published_at)}
          </DateWrapper>
          <QuestionTitle data-testid="title">{poll.question}</QuestionTitle>
          <ChoiceWrapper>
            {poll.choices.map((choice) => {
              return <li key={choice.url}>{choice.choice}</li>;
            })}
          </ChoiceWrapper>

          <PollDetail>
            <Link to={poll.url}>Poll Detail</Link>
          </PollDetail>
        </Article>
      );
    });

  if (error) return <div>Something went wrong!</div>;
  return <Section>{!isLoading ? renderQuestion() : "Loading..."}</Section>;
};

export default PollList;
