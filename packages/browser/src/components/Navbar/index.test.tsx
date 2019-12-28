import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./index";

describe("Navbar", () => {
  it("render Navbar", () => {
    expect.assertions(2);

    const links = [
      { path: "/", content: "Home" },
      { path: "/polls", content: "Polls" }
    ];
    const { getByText } = render(<Navbar links={links} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
    });
    links.forEach(({ content }) => {
      expect(getByText(content)).toBeTruthy();
    });
  });
});
