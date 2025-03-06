import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../pages/Login-Page.tsx";
import { BrowserRouter } from "react-router-dom";
import Confirmation from "../pages/Confirmation";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: { username: "testUsername", code: "fakeCode" },
  }),
}));

describe("Confirmation component tests", () => {
  test("Page is loaded with the correct username and code", () => {
    render(
      <BrowserRouter>
        <Confirmation />
      </BrowserRouter>
    );

    expect(screen.getByText("Congrats, testUsername")).toBeInTheDocument();
    expect(
      screen.getByText("Your poll code is ready to be shared!")
    ).toBeInTheDocument();
    expect(screen.getByText("fakeCode")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Vote Now!" })
    ).toBeInTheDocument();
  });

  test("The 'Vote Now' button redirects the user correctly", () => {
    render(
      <BrowserRouter>
        <Confirmation />
      </BrowserRouter>
    );

    const voteNowButt = screen.getByRole("button", { name: "Vote Now!" });
    fireEvent.click(voteNowButt);

    expect(mockNavigate).toHaveBeenCalledWith("/voting-page", {
      state: { username: "testUsername", code: "fakeCode" },
    });
  });

  test("The 'Dashboard' button redirects the user to the dashboard", () => {
    render(
      <BrowserRouter>
        <Confirmation />
      </BrowserRouter>
    );

    const dashboard = screen.getByRole("button", { name: "Dashboard" });
    fireEvent.click(dashboard);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
      state: { username: "testUsername", code: "fakeCode" },
    });
  });
});
