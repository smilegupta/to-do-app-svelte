import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";

import App from "./App.svelte";
import Header from "./components/Header.svelte";

test("should render", () => {
  const results = render(App);
    expect(results).toBeDefined();
});

test("shows proper heading when rendered", () => {
  const { getByText } = render(Header, { name: "Smile" });
  expect(getByText(`Smile's To-Do List`)).toBeInTheDocument();
});
