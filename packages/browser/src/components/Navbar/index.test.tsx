import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./index";

describe("Navbar", () => {
  it("render Navbar", () => {
    expect.assertions(2);

    const links = [
      { to: "/", content: "Home" },
      { to: "/polls", content: "Polls" }
    ];
    const { queryByText } = render(
      <Navbar>
        {links.map(({ to, content }) => (
          <a key={content} href={to}>
            {content}
          </a>
        ))}
      </Navbar>,
      {
        wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
      }
    );

    links.forEach(({ content }) => {
      expect(queryByText(content)).toBeTruthy();
    });
  });
});
