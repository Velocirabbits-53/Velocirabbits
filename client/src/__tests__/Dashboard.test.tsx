import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../pages/Login-Page.tsx";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard component tests", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useLocation to simulate a location state
    require("react-router-dom").useLocation.mockReturnValue({
      state: { username: "testUsername" },
    });
    // Mock the navigate function
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  test("Page is rendered without crashing", () => {
    render(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>
    )
    // expect the dashboard page to have a DASHBOARD label
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();

    // expect the dashboard to have a greeting to the mock user
    expect(screen.getByText('Hello, testUsername')).toBeInTheDocument();
    

    // expect the dashboard page to have the 3 buttons it's supposed to have
    expect(
      screen.getByRole("button", { name: 'Create a New Poll' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: 'Vote Now!' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: 'View Past Polls' })
    ).toBeInTheDocument();

    // expect the dashboard page to have the input it's supposed to have
    expect(screen.getByPlaceholderText("Enter Code")).toBeInTheDocument();
  });

  // TODO change this test title to follow better naming conventions like the above test
  test("updates the mock user's poll code upon input change", async () => {
    render(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>
    )
    // We tested this earlier, but in order to do the next test, we need a value that will serve to be the element where the user is going to be entering the poll code
    const input = screen.getByPlaceholderText("Enter Code");

    // Simulate that the user is typing their username into the text field
    await fireEvent.change(input, { target: { value: "testpoll" } });

    // Checking now to see if the input's value has changed to the expected value
    expect(input).toHaveValue("testpoll");
  });

  // TODO change this test title to follow better naming conventions like the first test
  test("takes you to the right place when you click 'Create a New Poll'", async () => {
    render(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>
    )

    // Getting the "Create a New Poll" button
    const createPollButt = screen.getByRole("button", {
      name: 'Create a New Poll',
    });

    // Simulate clicking the button
    fireEvent.click(createPollButt);

    // Does it take you to the right place?
    await waitFor(() => {
      // Checking here to see if navigate was called with the right endpoint and state information
      expect(mockNavigate).toHaveBeenCalledWith("/create-poll", { state: { username: "testUsername" } });
    });
  });

  // TODO change this test title to follow better naming conventions like the first test
  test("takes you to the right place when you click 'Vote Now!'", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true, 
          json: () => Promise.resolve({}), 
        })
      ) as jest.Mock;

      render(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>
    )
    
    const input = screen.getByPlaceholderText('Enter Code');
    fireEvent.change(input, { target: { value: 'testpoll' } });
    
    const createVoteButt = screen.getByRole("button", {
        name: 'Vote Now!',
    });
  
    // Simulate clicking the button
    fireEvent.click(createVoteButt);
  
    // Does it take you to the right place?
    await waitFor(() => {
        // Checking here to see if navigate was called with the right endpoint and state information
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/user/results/testpoll", 
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        expect(mockNavigate).toHaveBeenCalledWith("/voting-page", { state: { username: "testUsername", code: "testpoll" } });
    });
  });

  test("Clicking the 'Past Polls' Button reroutes you to the past polls page", () => {
    render(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>
    )

    const pastPollsButt = screen.getByRole('button', { name: 'View Past Polls' });

    fireEvent.click(pastPollsButt);

    expect(mockNavigate).toHaveBeenCalledWith('/pastpolls', { state: { username: 'testUsername' } });
  });
});
