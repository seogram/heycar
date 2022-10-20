import React from "react";
import { render, screen } from "@testing-library/react";
import PollList from "./PollList";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock("./PollDetail", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

test("renders nothing when no polls are available", () => {
  const args = {
    polls: [],
    isLoading: false,
    error: undefined,
  };
  render(<PollList {...args} />);
  const linkElement = screen.queryByText(/Poll Detail/i);
  expect(linkElement).toEqual(null);


});

test("renders Loading state", () => {
  const args = {
    polls: [],
    isLoading: true,
    error: undefined,
  };
  render(<PollList {...args} />);

  const loadingLabel = screen.getByText(/Loading.../i);
  expect(loadingLabel).toBeInTheDocument();

});


test("renders the list when polls are available", () => {
  const choices = [
    {
      choice: "choice 1",
      votes: 2,
      url: "/choiceurl",
    },
  ];
  const polls = [
    {
      published_at: "2022-10-01",
      question: "question1",
      choices: choices,
      url: "/sampleurl",
    },
    {
      published_at: "2022-10-11",
      question: "question11",
      choices: choices,
      url: "/sampleurl11",
    },
  ];
  const args = {
    polls,
    isLoading: false,
    error: undefined,
  };
  render(<PollList {...args} />, { wrapper: Router });
  const Polls = screen.getAllByRole("article");
  expect(Polls.length).toBe(2);
});
