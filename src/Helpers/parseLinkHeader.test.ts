import { parseLinkHeader } from "./parseLinkHeader";

test("returns 'empty' object when parameter is falsy", async () => {
  const input = "";
  const output = await parseLinkHeader(input);
  expect(output).toEqual({ first: 0, prev: 0, next: 0, last: 0 });
});

test("parses first, prev, next and last pages", async () => {
  const input = [
    "<https://api.github.com/search/users?q=test&page=1>; rel=\"first\"",
    "<https://api.github.com/search/users?q=test&page=11>; rel=\"prev\"",
    "<https://api.github.com/search/users?q=test&page=13>; rel=\"next\"",
    "<https://api.github.com/search/users?q=test&page=99>; rel=\"last\"",
  ].join(",");
  const output = await parseLinkHeader(input);
  expect(output).toEqual({ first: 1, prev: 11, next: 13, last: 99 });
});

test("ignores other types of pages", async () => {
  const input = "<https://api.github.com/search/users?q=test&page=1>; rel=\"temp\"";
  const output = await parseLinkHeader(input);
  expect(output).toEqual({ first: 0, prev: 0, next: 0, last: 0 });
});
