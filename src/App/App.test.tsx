/* eslint-disable testing-library/no-unnecessary-act */
import App, { API_ENDPOINT } from "./App";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

test("renders without crashing", () => {
  const fn = () => render(<App />);
  expect(fn).not.toThrowError();
});

test("makes a request when clicking submit in search component", async () => {
  render(<App />);

  axios.get = jest.fn().mockImplementation(() => ({ data: { items: [] }}));

  await act(() => {
    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "john_doe" }});
    fireEvent.click(screen.getByTestId("search-submit"));
  });

  const params = {
    page: 1,
    per_page: 9,
    q: "john_doe in:login",
  };

  expect(axios.get).toHaveBeenCalledWith(API_ENDPOINT, { params });
});
