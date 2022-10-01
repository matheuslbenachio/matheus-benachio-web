/* eslint-disable testing-library/render-result-naming-convention */
import Search from "./Search";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  const fn = () => render(<Search onSubmit={jest.fn()} />);
  expect(fn).not.toThrowError();
});

test("renders search icon", () => {
  render(<Search onSubmit={jest.fn()} />);
  expect(screen.getByTestId("search-icon")).toBeVisible();
});

test("re-focuses the input when submitting with an empty value", () => {
  render(<Search onSubmit={jest.fn()} />);
  expect(screen.getByTestId("search-icon")).not.toHaveFocus();
  fireEvent.click(screen.getByTestId("search-submit"));
  expect(screen.getByTestId("search-input")).toHaveFocus();
});

test("changes the input value correctly", () => {
  render(<Search onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByTestId("search-input"), { target: { value: "john_doe" }});
  expect(screen.getByTestId("search-input")).toHaveValue("john_doe")
});

test("calls onSubmit when submitting a valid query", () => {
  const onSubmit = jest.fn();
  render(<Search onSubmit={onSubmit} />);
  fireEvent.change(screen.getByTestId("search-input"), { target: { value: "john_doe" }});
  fireEvent.click(screen.getByTestId("search-submit"));
  expect(onSubmit).toHaveBeenCalledWith("john_doe");
});
