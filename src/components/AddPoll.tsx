import { useState, useRef } from "react";
import { useAddPollMutation } from "../services/poll";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  padding: 1rem 1rem 1rem 4rem;
  line-height: 4rem;
`;

const ButtonWrapper = styled.button`
  margin-left: 2rem;
`;
const Message = styled.div`
  color: green;
`;

const Choices = styled.li`
  line-height: 1.5rem;
`;
const AddPoll = () => {
  const questionRef = useRef<HTMLInputElement>(null);
  const choiceRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<{
    question: string;
    currentChoice: string;
  }>({ question: "", currentChoice: "" });
  const [choices, setChoices] = useState<string[]>([]);
  const [addPost, result] = useAddPollMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const questionValue = questionRef?.current?.value;
    const choiceValue = choiceRef?.current?.value;
    if (questionValue) {
      setValue((prev) => ({ ...prev, question: questionValue }));
    }
    if (choiceValue) {
      setValue((prev) => ({ ...prev, currentChoice: choiceValue }));
    }
  };
  const handleAddChoice = () => {
    if (choiceRef.current) {
      choiceRef.current.value = "";
    }
    setChoices((choices) => [...choices, value.currentChoice]);
  };

  const payload = {
    question : value.question,
    choices,
  };
  const handleAddPost = () => {
    if (questionRef.current) {
      questionRef.current.value = "";
      addPost(payload);
    }
  };
  return (
    <Section>
      <Link to="/">Back to the Poll list</Link>
      <section>
        <label htmlFor="question">Question : </label>
        <input
          value={value.question}
          onChange={handleChange}
          ref={questionRef}
        />
      </section>
      <section>
        <label htmlFor="question">Choices : </label>
        <input
          type="question"
          onChange={handleChange}
          ref={choiceRef}
        />
        <ButtonWrapper onClick={handleAddChoice}>Add Choice</ButtonWrapper>
      </section>
      <ul>
        {choices.map((choice: string) => (
          <Choices>{choice}</Choices>
        ))}
      </ul>
      <section>
        <ButtonWrapper onClick={() => handleAddPost()}>
          Create Question
        </ButtonWrapper>
      </section>
      <Message>
        {result.isSuccess && "Question is created successfully"}
      </Message>
    </Section>
  );
};

export default AddPoll;
