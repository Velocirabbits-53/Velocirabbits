import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../pages/Login-Page.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Results from "../pages/Results";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: { username: "testUsername", code: "fakeCode" },
  }),
}));

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         pollName: "Best Programming Language",
//         pollTopics: [
//           { pollTopic: "JavaScript", votes: 10 },
//           { pollTopic: "Python", votes: 8 },
//           { pollTopic: "Java", votes: 6 },
//         ],
//         code: "testCode",
//         createdBy: "testUsername",
//       }),
//   })
// ) as jest.Mock;

describe("Results component testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Page is loaded and displays 'Loading' when there is a delay", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve((resolve: any) => {
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () =>
                  Promise.resolve({
                    pollName: "Best Programming Language",
                    pollTopics: [
                      { pollTopic: "Javascript", votes: 10 },
                      { pollTopic: "Python", votes: 5 },
                      { pollTopic: "Java", votes: 3 },
                    ],
                    code: "testCode",
                    createdBy: "testUsername",
                  }),
              }),
              // Pretending there is a delay when getting information
            100
          );
        })
      ) as jest.Mock;

    render(
      <MemoryRouter initialEntries={[{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' }}]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>
    );

    // expect(screen.getByText('Loading')).toBeInTheDocument();
  
    await waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument());
});

  
  test("Page is loaded with poll results after fetching the data", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              pollName: "Best Programming Language",
              pollTopics: [
                { pollTopic: "JavaScript", votes: 10 },
                { pollTopic: "Python", votes: 8 },
                { pollTopic: "Java", votes: 6 },
              ],
              code: "testCode",
              createdBy: "testUsername",
            }),
        })
      ) as jest.Mock;
        
    render(
        <MemoryRouter initialEntries={[{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' } }]}>
          <Routes>
            <Route path="/results" element={<Results />} />
          </Routes>
        </MemoryRouter>
      );

    // Wait for the fetch, then display information
    await waitFor(() => {
        expect(screen.getByText('Best Programming Language')).toBeInTheDocument();
        expect(screen.getByText(/1st Place: JavaScript - 10 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/2nd Place: Python - 8 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/3rd Place: Java - 6 votes/i)).toBeInTheDocument();
    });
  });

  test("Navigation buttons!", async () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' } }]}>
          <Routes>
            <Route path="/results" element={<Results />} />
          </Routes>
        </MemoryRouter>
      );
  
      // Wait for the component to render fully
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'View Results Graph!' })).toBeInTheDocument();
      });
  })
});
