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
import Register from '../pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockNavigate })));
beforeEach(() => {
    mockNavigate.mockClear();
    jest.clearAllMocks();
    render(_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: '/', element: _jsx(Register, {}) }) }) }));
});
describe('Checking the Registration component to see...', () => {
    test('...if the registration component can render.', () => {
        // Get the username and password fields
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
    });
    test('...if the registration accepts inputs.', () => {
        // Get the username and password fields
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        // Enter new details
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });
        // Expect the fields to have new data in them
        expect(usernameInput.value).toBe('testUser');
        expect(passwordInput.value).toBe('securePass123');
    });
    test('...if the registration submits the form successfully.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Define a fake fetch call
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        }));
        // Find the username/password input boxes
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        // Input a username & password
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });
        // Click submit
        fireEvent.click(screen.getByText(/Sign Up/i));
        // Expect a fetch call to the backend with the correct object settings
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/user/register', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testUser',
                password: 'securePass123',
            }),
        }));
        // Expect a navigation trigger to have been called once, with the state object
        yield waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
            state: { username: 'testUser' },
        }));
        yield waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
    }));
    test('...if the registration fails if the user already exists.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Define a fake failed fetch call
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'User already exists' }),
        }));
        // Make an alert to verify it's called
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        // Find the username/password input boxes
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        // Input a username & password
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });
        // Click submit
        fireEvent.click(screen.getByText(/Sign Up/i));
        yield waitFor(() => expect(window.alert).toHaveBeenCalledWith('Login failed: User already exists'));
        // Expect an error to appear in the console log
        expect(consoleErrorSpy).toHaveBeenCalledWith('Registration failed', { message: 'User already exists' });
        // Expect the navigate not to have triggered
        expect(mockNavigate).not.toHaveBeenCalled();
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if the registration prevents submission when fields are empty.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        // Click Sign Up without entering any input
        fireEvent.click(screen.getByText(/Sign Up/i));
        // Expect fetch to not get called
        expect(global.fetch).not.toHaveBeenCalled();
        // Expect navigation was not triggered
        expect(mockNavigate).not.toHaveBeenCalled();
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if the registration prevents submission when only one field is filled.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        // Get username & password fields
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        // Enter data into only field
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Sign Up/i));
        // Expect the global fetch not to trigger
        expect(global.fetch).not.toHaveBeenCalled();
        // Expect navigation was not triggered
        expect(mockNavigate).not.toHaveBeenCalled();
        // Reset username field
        fireEvent.change(usernameInput, { target: { value: '' } });
        // Try submitting with only password
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });
        fireEvent.click(screen.getByText(/Sign Up/i));
        // Expect the global fetch not to trigger
        expect(global.fetch).not.toHaveBeenCalled();
        // Expect navigation was not triggered
        expect(mockNavigate).not.toHaveBeenCalled();
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if the registration handles network failures.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock fetch to throw a network error
        global.fetch = jest.fn(() => Promise.reject(new Error('Network failure')));
        // Mock alert and console.error to verify calls
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'securePass123' } });
        fireEvent.click(screen.getByText(/Sign Up/i));
        // Ensure the correct alert message is displayed
        yield waitFor(() => expect(window.alert).toHaveBeenCalledWith('Network error: Please try again later.'));
        // Ensure the correct error is logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Network error:', expect.any(Error));
        // Ensure navigation was NOT triggered
        expect(mockNavigate).not.toHaveBeenCalled();
        // Restore console.error after the test
        consoleErrorSpy.mockRestore();
    }));
});
