import { useParams } from "react-router-dom";
import {
  useGetSingleQuestionQuery,
  useAnswerPollMutation,
} from "../services/poll";
import { Link } from "react-router-dom";
import { getDate } from "../utils/date";
import styled from "styled-components";
import { IChoice } from "../types";
import { getChoiceId } from "../utils/getChoiceId";

const Section = styled.div`
  padding: 1rem 1rem 1rem 4rem;
  line-height: 2rem;
`;

const LabelWrapper = styled.div`
  font-weight: 800;
  padding: 1rem 0;
`;

const Row = styled.div`
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: #80807f;
  display: flex;
  color: white;
`;

const RowItem = styled.div`
  flex: 1;
`;

const Vote = styled.div`
  padding: "0.4rem;
  background-color: #0DCED4;
  width: 3rem;
  flex: 1:
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #90d14f;
  width: 6rem;
  border-radius: 4px;
  background-color: #90d14f;
  padding: 0.4rem;
`;

const PollDetail = () => {
  const { questionId } = useParams();
  console.log()
  const { data, error, isLoading } = useGetSingleQuestionQuery(
    questionId || ""
  ) || {};
console.log(useGetSingleQuestionQuery(""))
  const [answerPoll] = useAnswerPollMutation();

  const getlVotesPercent = (votes: number) => {
    if (votes === 0) return 0;
    const totalVotes =
      data?.choices.reduce((total, choice) => {
        return choice.votes + total;
      }, 0) || 0;
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  const handleSubmitAnswer = (url: string) => {
    const choiceId = getChoiceId(url);
    if (questionId && choiceId) {
      answerPoll({ questionId, choiceId });
    }
  };

  const renderPollDetail = () => (
    <>
      <Section>
        <article>{getDate(data?.published_at)}</article>
        <LabelWrapper>{data?.question}</LabelWrapper>

        {data?.choices.map((choice: IChoice) => {
          return (
            <Row key={choice.choice}>
              <RowItem>{choice.choice}</RowItem>
              <RowItem>Votes# {choice.votes} </RowItem>
              <RowItem>
                <Vote>{getlVotesPercent(choice.votes)}%</Vote>
              </RowItem>
              <RowItem>
                <Button onClick={() => handleSubmitAnswer(choice.url)}>
                  Vote
                </Button>
              </RowItem>
            </Row>
          );
        })}
      </Section>
      <Section>
        <Link to="/">Back to the Poll list</Link>
      </Section>
    </>
  );
  if (error) return <div>Something went wrong...</div>;
  return <div> {!isLoading && data ? renderPollDetail() : <>Loading</>}</div>;
};

export default PollDetail;
