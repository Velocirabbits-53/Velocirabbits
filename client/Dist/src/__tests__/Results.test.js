var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../pages/Login-Page.tsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Results from "../pages/Results";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => (Object.assign(Object.assign({}, jest.requireActual("react-router-dom")), { useNavigate: () => mockNavigate, useLocation: () => ({
        state: { username: "testUsername", code: "fakeCode" },
    }) })));
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
    test("Page is loaded and displays 'Loading' when there is a delay", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch = jest.fn(() => Promise.resolve((resolve) => {
            setTimeout(() => resolve({
                ok: true,
                json: () => Promise.resolve({
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
            100);
        }));
        render(_jsx(MemoryRouter, { initialEntries: [{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' } }], children: _jsx(Routes, { children: _jsx(Route, { path: "/results", element: _jsx(Results, {}) }) }) }));
        // expect(screen.getByText('Loading')).toBeInTheDocument();
        yield waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument());
    }));
    test("Page is loaded with poll results after fetching the data", () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                pollName: "Best Programming Language",
                pollTopics: [
                    { pollTopic: "JavaScript", votes: 10 },
                    { pollTopic: "Python", votes: 8 },
                    { pollTopic: "Java", votes: 6 },
                ],
                code: "testCode",
                createdBy: "testUsername",
            }),
        }));
        render(_jsx(MemoryRouter, { initialEntries: [{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' } }], children: _jsx(Routes, { children: _jsx(Route, { path: "/results", element: _jsx(Results, {}) }) }) }));
        // Wait for the fetch, then display information
        yield waitFor(() => {
            expect(screen.getByText('Best Programming Language')).toBeInTheDocument();
            expect(screen.getByText(/1st Place: JavaScript - 10 votes/i)).toBeInTheDocument();
            expect(screen.getByText(/2nd Place: Python - 8 votes/i)).toBeInTheDocument();
            expect(screen.getByText(/3rd Place: Java - 6 votes/i)).toBeInTheDocument();
        });
    }));
    test("Navigation buttons!", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(MemoryRouter, { initialEntries: [{ pathname: '/results', state: { username: 'testUsername', code: 'testCode' } }], children: _jsx(Routes, { children: _jsx(Route, { path: "/results", element: _jsx(Results, {}) }) }) }));
        // Wait for the component to render fully
        yield waitFor(() => {
            expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'View Results Graph!' })).toBeInTheDocument();
        });
    }));
});
