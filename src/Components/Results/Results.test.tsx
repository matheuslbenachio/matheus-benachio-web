import Results, { GithubUser } from "./Results";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  const fn = () => render(<Results data={[]} />);
  expect(fn).not.toThrowError();
});

test("renders table header", () => {
  render(<Results data={[]} />);
  expect(screen.getByText("Login")).not.toBeNull();
  expect(screen.getByText("Type")).not.toBeNull();
});

test("renders rows correctly", () => {
  const data: GithubUser[] = [
    { id: 1, avatar_url: "http://localhost:3000/", login: "john_doe", type: "User" },
    { id: 2, avatar_url: "http://localhost:3000/", login: "janeDOE", type: "Organization" },
    { id: 3, avatar_url: "http://localhost:3000/", login: "ludwig", type: "User" },
  ];

  render(<Results data={data} />);

  for (let i = 0; i < data.length; i++) {
    expect(screen.getByTestId(`user-${data[i].id}`)).toHaveClass("visible");
    expect(screen.getByTestId(`user-${data[i].id}`)).toHaveStyle(`animation-delay: ${i * 0.05}s`);
    expect(screen.getByTestId(`user-${data[i].id}-img`)).toHaveProperty("src", data[i].avatar_url);
    expect(screen.getByTestId(`user-${data[i].id}-login`)).toHaveTextContent(data[i].login);
    expect(screen.getByTestId(`user-${data[i].id}-type`)).toHaveTextContent(data[i].type);
  }
});

test("quickly hides rows if table is loading", () => {
  const data: GithubUser[] = [
    { id: 1, avatar_url: "http://localhost:3000/", login: "john_doe", type: "User" },
    { id: 2, avatar_url: "http://localhost:3000/", login: "janeDOE", type: "Organization" },
    { id: 3, avatar_url: "http://localhost:3000/", login: "ludwig", type: "User" },
  ];

  render(<Results data={data} loading />);

  expect(screen.getByTestId("user-1")).not.toHaveClass("visible");
  expect(screen.getByTestId("user-1")).toHaveStyle("animation-delay: 0s");
  expect(screen.getByTestId("user-2")).not.toHaveClass("visible");
  expect(screen.getByTestId("user-2")).toHaveStyle("animation-delay: 0.01s");
  expect(screen.getByTestId("user-3")).not.toHaveClass("visible");
  expect(screen.getByTestId("user-3")).toHaveStyle("animation-delay: 0.02s");
});
