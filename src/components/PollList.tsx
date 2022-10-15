import { ChildProcess } from "child_process";
import { useEffect, useState } from "react";

interface IChoice {
  choice: string;
  votes: number;
  url: string;
}
const PollList = ({
  polls,
  error,
  isLoading,
}: {
  polls: {
    published_at: string;
    question: string;
    choices: IChoice[];
    url: string;
  }[];
  error?: Object;
  isLoading: boolean;
}) => {
  const [answers, setAnswer] = useState<(IChoice & { choiceId: string })[] | []>(
    []
  );
console.log("answer", answers)
  const getDate = (date: string) => {
    return new Date(date).toISOString().substring(0, 10);
  };

  const getChoiceId = (url: string = "") => {
    var n = url.lastIndexOf("/");
    return url.substring(n + 1);
  };
  const handleSubmitAnswer = () => {};

  const renderQuestion = () =>
    polls?.map((poll) => {
      return (
        <div style={{ padding: "1rem 1rem 0 4rem" }}>
          <div style={{ paddingBottom: "1rem" }}>
            {getDate(poll.published_at)}
          </div>
          <div style={{ paddingBottom: "1rem", fontWeight: "800" }}>
            {poll.question}
          </div>
          <form style={{ padding: "1rem 0.5rem" }}>
            <fieldset id="choices" style={{ lineHeight: "2rem" }}>
              {poll.choices.map((choice) => {
                const answeredQuestion = {
                  choiceId: getChoiceId(choice.url),
                  url: choice.url,
                  votes: choice.votes,
                  choice: choice.choice,
                };
                return (
                  <section>
                    <input
                      type="radio"
                      id={choice.choice}
                      name="choices"
                      value={choice.choice}
                      onClick={() =>
                        setAnswer((state) => [answeredQuestion, ...state])
                      }
                    />
                    <label htmlFor={choice.choice}>{choice.choice}</label>
                  </section>
                );
              })}
            </fieldset>
          </form>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <button onClick={() => handleSubmitAnswer()}>
              Submit Your Answer
            </button>
            <a href={poll.url}>Poll Detail</a>
          </section>
          <hr style={{ margin: "2rem 0", border: "2px solid" }} />
        </div>
      );
    });
  return <div>{polls && polls.length && renderQuestion()}</div>;
};

export default PollList;
