import Message from "./Message";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  const fn = () => render(<Message />);
  expect(fn).not.toThrowError();
});

test("doesn't have the visible class", () => {
  render(<Message />);
  expect(screen.getByTestId("message")).not.toHaveClass("visible");
});

test("has the visible class", () => {
  render(<Message visible />);
  expect(screen.getByTestId("message")).toHaveClass("visible");
});

test("renders the content as string", () => {
  render(<Message content="Hello world" />);
  expect(screen.getByText("Hello world")).not.toBeNull();
});

test("renders the content as node", () => {
  render(<Message content={<>Hello world</>} />);
  expect(screen.getByText("Hello world")).not.toBeNull();
});
