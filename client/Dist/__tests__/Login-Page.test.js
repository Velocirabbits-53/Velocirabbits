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
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login-Page';
// Mock the useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockedNavigate })));
describe('Login Page', () => {
    beforeEach(() => {
        render(_jsx(MemoryRouter, { children: _jsx(Login, {}) }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should render login page without crashing', () => {
        expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    });
    test('should render username and password input fields', () => {
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
    test('should render login and register buttons', () => {
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });
    test('should call loginRequest function and navigate to dashboard when login button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the fetch function
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        }));
        // Set the input values
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testPass' } });
        const loginButton = screen.getByText(/Login/i);
        fireEvent.click(loginButton);
        yield waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/user/login', expect.any(Object));
            expect(mockedNavigate).toHaveBeenCalledWith('/dashboard', { state: { username: 'testUser' } });
        });
    }));
    test('should navigate to register page when register button is clicked', () => {
        const registerButton = screen.getByText(/Register/i);
        fireEvent.click(registerButton);
        expect(mockedNavigate).toHaveBeenCalledWith('/register');
    });
});
