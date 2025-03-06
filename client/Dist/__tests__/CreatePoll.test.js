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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePoll from '../pages/CreatePoll';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockNavigate, useLocation: () => ({ state: { username: 'testUser' } }) })));
beforeEach(() => {
    // fake a user entry to the page
    mockNavigate.mockClear();
    // clear previous click trackers
    jest.clearAllMocks();
    // make a fetch for a code
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        text: () => Promise.resolve('12345'),
        status: 200,
    }));
    // render the stuff
    render(_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: '/', element: _jsx(CreatePoll, {}) }) }) }));
});
describe('Checking the Create Poll component to see...', () => {
    test('...if the Create Poll component can render.', () => {
        expect(screen.getByText(/Name Your Poll/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Type poll name/i)).toBeInTheDocument();
        expect(screen.getByText(/Name of Topics/i)).toBeInTheDocument();
    });
    test('...if the Create Poll accepts inputs.', () => {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Make some input for the poll name
        const pollNameInput = screen.getByPlaceholderText(/Type poll name/i);
        // Send it
        fireEvent.change(pollNameInput, { target: { value: 'Test Poll' } });
        expect(pollNameInput.value).toBe('Test Poll');
        // Make some input for the poll topics
        const topicInputs = screen.getAllByPlaceholderText(/Type poll topic/i);
        // Send it
        fireEvent.change(topicInputs[0], { target: { value: 'Topic 1' } });
        // Expect the poll to be have data in it
        expect(topicInputs[0].value).toBe('Topic 1');
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    });
    test('...if typing in a topic input updates its value.', () => {
        // Grab the topic input box
        const topicInputs = screen.getAllByPlaceholderText(/Type poll topic/i);
        // Add some topic data
        fireEvent.change(topicInputs[0], { target: { value: 'New Topic' } });
        // Expect the input box to have data in it
        expect(topicInputs[0].value).toBe('New Topic');
    });
    test('...if the Create Poll submits the form successfully.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Add a name to the poll
        fireEvent.change(screen.getByPlaceholderText(/Type poll name/i), {
            target: { value: 'My Poll' },
        });
        // Add topics to the poll
        const topicInputs = screen.getAllByPlaceholderText(/Type poll topic/i);
        fireEvent.change(topicInputs[0], { target: { value: 'Option A' } });
        fireEvent.change(topicInputs[1], { target: { value: 'Option B' } });
        fireEvent.change(topicInputs[2], { target: { value: 'Option C' } });
        // Attempt to create a poll
        fireEvent.click(screen.getByText(/Create Poll/i));
        // Expect the submit function to be called once
        yield waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        // Expect the navigation to send us to confirmation
        yield waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/confirmation', expect.anything()));
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if clicking the Add Topic button adds a new input field.', () => {
        // Click the add topic button
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        // Grab the number of topics on screen
        const topicInputs = screen.getAllByPlaceholderText(/Type poll topic/i);
        // Expect it to be 4, because it starts at 3
        expect(topicInputs.length).toBe(4);
    });
    test('...if clicking the Dashboard button navigates correctly.', () => {
        // click the dashboard right away
        fireEvent.click(screen.getByText(/Dashboard/i));
        // Expect to see a navigation call
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard', expect.anything());
    });
    test('...if the Create Poll button does not submit when poll name is empty.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Submit the attempt
        fireEvent.click(screen.getByText(/Create Poll/i));
        // Expect the thing not to run.
        yield waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if the Create Poll button does not submit when all topics are empty.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Add a poll name
        fireEvent.change(screen.getByPlaceholderText(/Type poll name/i), {
            target: { value: 'Valid Poll Name' },
        });
        // Go straight to submit, without topics
        fireEvent.click(screen.getByText(/Create Poll/i));
        // Expect the function to not have been called.
        yield waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
});
