import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../pages/Login-Page.tsx";
import { BrowserRouter } from "react-router-dom";
import Confirmation from "../pages/Confirmation";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => (Object.assign(Object.assign({}, jest.requireActual("react-router-dom")), { useNavigate: () => mockNavigate, useLocation: () => ({
        state: { username: "testUsername", code: "fakeCode" },
    }) })));
describe("Confirmation component tests", () => {
    test("Page is loaded with the correct username and code", () => {
        render(_jsx(BrowserRouter, { children: _jsx(Confirmation, {}) }));
        expect(screen.getByText("Congrats, testUsername")).toBeInTheDocument();
        expect(screen.getByText("Your poll code is ready to be shared!")).toBeInTheDocument();
        expect(screen.getByText("fakeCode")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Vote Now!" })).toBeInTheDocument();
    });
    test("The 'Vote Now' button redirects the user correctly", () => {
        render(_jsx(BrowserRouter, { children: _jsx(Confirmation, {}) }));
        const voteNowButt = screen.getByRole("button", { name: "Vote Now!" });
        fireEvent.click(voteNowButt);
        expect(mockNavigate).toHaveBeenCalledWith("/voting-page", {
            state: { username: "testUsername", code: "fakeCode" },
        });
    });
    test("The 'Dashboard' button redirects the user to the dashboard", () => {
        render(_jsx(BrowserRouter, { children: _jsx(Confirmation, {}) }));
        const dashboard = screen.getByRole("button", { name: "Dashboard" });
        fireEvent.click(dashboard);
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
            state: { username: "testUsername", code: "fakeCode" },
        });
    });
});
