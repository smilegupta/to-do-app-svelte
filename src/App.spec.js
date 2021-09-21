import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/svelte";

import Header from "./components/Header.svelte";

test("shows proper heading when rendered", () => {
  const { getByText } = render(Header, { name: "Smile" });

  expect(getByText(`Smile's To-Do List`)).toBeInTheDocument();
});
