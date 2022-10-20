import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./store";

jest.mock("./components/PollList", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});
jest.mock("./components/PollDetail", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

test("renders Container correctly when no poll is available", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    { wrapper: Router }
  );
  const questionNumberLabel = screen.getByText(/Number of Questions:/i);
  const createQuestionLink = screen.getByRole("link");

  expect(questionNumberLabel).toBeInTheDocument();
  expect(createQuestionLink.textContent).toEqual("+ Create new Question");
  expect(createQuestionLink.getAttribute("href")).toBe("/questions/new");
});
