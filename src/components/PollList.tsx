import { Link } from "react-router-dom";
import {getDate} from "../utils/date";
import {getChoiceId} from "../utils/getChoiceId";
import {IChoice , IPoll} from "../types";

const PollList = ({
  polls = [],
  error,
  isLoading,
}: {
  polls?: IPoll[];
  error?: Object;
  isLoading: boolean;
}) => {

  const renderQuestion = () =>
    polls.map((poll) => {
      return (
        <div style={{ padding: "1rem 1rem 0 4rem" }} key={poll.url}>
          <div style={{ paddingBottom: "1rem" }}>
            {getDate(poll.published_at)}
          </div>
          <div style={{ paddingBottom: "1rem", fontWeight: "800" }}>
            {poll.question}
          </div>
           <ul style={{ padding: "1rem 0.5rem",lineHeight: "2rem" }}>
              {poll.choices.map((choice) => {
                const answeredQuestion = {
                  choiceId: getChoiceId(choice.url),
                  url: choice.url,
                  votes: choice.votes,
                  choice: choice.choice,
                };
                return (
                  <li key={choice.url}>
                   {choice.choice}
                  </li>
                );
              })}
          </ul>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <Link to={poll.url}>Poll Detail</Link>
          </section>
          <hr style={{ margin: "2rem 0", border: "2px solid" }} />
        </div>
      );
    });
  return <div>{renderQuestion()}</div>;
};

export default PollList;
