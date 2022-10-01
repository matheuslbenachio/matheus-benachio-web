/* eslint-disable testing-library/render-result-naming-convention */
import Pagination, { Pages } from "./Pagination";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  const fn = () => render(<Pagination onChangePage={jest.fn()} pages={{}} />);
  expect(fn).not.toThrowError();
});

test("renders 4 buttons", () => {
  render(<Pagination onChangePage={jest.fn()} pages={{}} />);
  expect(screen.getByTestId("first")).not.toBeNull();
  expect(screen.getByTestId("prev")).not.toBeNull();
  expect(screen.getByTestId("next")).not.toBeNull();
  expect(screen.getByTestId("last")).not.toBeNull();
});

test("disables buttons without a page", () => {
  const pages = { first: 1, next: 12 };
  render(<Pagination onChangePage={jest.fn()} pages={pages} />);
  expect(screen.getByTestId("first")).toHaveProperty("disabled", false);
  expect(screen.getByTestId("prev")).toHaveProperty("disabled", true);
  expect(screen.getByTestId("next")).toHaveProperty("disabled", false);
  expect(screen.getByTestId("last")).toHaveProperty("disabled", true);
});

test("adds `title` property to each button", () => {
  render(<Pagination onChangePage={jest.fn()} pages={{}} />);
  expect(screen.getByTestId("first")).toHaveProperty("title", "first");
  expect(screen.getByTestId("prev")).toHaveProperty("title", "prev");
  expect(screen.getByTestId("next")).toHaveProperty("title", "next");
  expect(screen.getByTestId("last")).toHaveProperty("title", "last");
});

test("calls onChangePage according to pages object", () => {
  const pages: Pages = { first: 1, prev: 10, next: 12, last: 99 };
  const onChange = jest.fn();

  render(<Pagination onChangePage={onChange} pages={pages} />);

  for (const key in pages) {
    const pageButton = screen.getByTestId(key);
    fireEvent.click(pageButton);
    expect(onChange).toHaveBeenCalledWith(pages[key as keyof Pages]);
  }
});
