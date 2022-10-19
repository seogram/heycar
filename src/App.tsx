import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetQuestionsQuery } from "./services/poll";
import PollList from "./components/PollList";

const Container = styled.article`
  padding: 1rem 1rem 0 4rem;

  @media (max-width: 620px) {
    padding: 1rem 1rem 0 1rem;
  }
`;
const Head = styled.h3`
  display: flex;
  justify-content: space-between;
  @media (max-width: 620px) {
    flex-direction: column;
    font-size: 1em;
  }
`;
const Title = styled.h3`
  color: blue;
  margin-top: 0;
`;
const App = () => {
  const { data, error, isLoading } = useGetQuestionsQuery("all");
  return (
    <Container>
      <Head>
        <Title>Number of Questions: {data?.length}</Title>
        <Link to="/questions/new">+ Create new Question</Link>
      </Head>

      <PollList polls={data} error={error} isLoading={isLoading} />
    </Container>
  );
};

export default App;
