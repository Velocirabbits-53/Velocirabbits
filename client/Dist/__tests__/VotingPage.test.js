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
import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VotingPage from '../pages/VotingPage';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockNavigate, useLocation: () => ({ state: { username: 'testUser', code: '12345' } }) })));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // clear previous click trackers
    jest.clearAllMocks();
    // fake a user entry to the page
    mockNavigate.mockClear();
    // make a fetch for a code
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            pollName: 'Best FTRI 53 Team',
            pollTopics: [
                { pollTopic: 'Velocirabbits', votes: 0 },
                { pollTopic: 'Cat Snakes', votes: 0 },
                { pollTopic: 'Danger Noodles', votes: 0 },
                { pollTopic: 'Panda Whales', votes: 0 },
            ],
        }),
    }));
    // render the stuff
    yield act(() => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BrowserRouter, { children: _jsx(VotingPage, {}) }));
    }));
}));
describe('Checking the Voting Page component to see...', () => {
    test('...if the Voting Page component can render.', () => {
        // Expect the vote text to be on the screen
        expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
    });
    test('...if the poll name is displayed correctly.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Expect the poll name to appear
        yield waitFor(() => expect(screen.getByText(/Best FTRI 53 Team/i)).toBeInTheDocument());
    }));
    test('...if the poll topics are rendered as buttons.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Expect the Poll Topics to be the FTRI teams
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
            expect(screen.getByText(/Danger Noodles/i)).toBeInTheDocument();
            expect(screen.getByText(/Panda Whales/i)).toBeInTheDocument();
        });
        // Get the increment and Decrement buttons
        const plusButtons = screen.getAllByText('+');
        const minusButtons = screen.getAllByText('-');
        // Expect the number of buttons to be 4
        expect(plusButtons.length).toBe(4);
        expect(minusButtons.length).toBe(4);
    }));
    test('...if the initial vote count is displayed correctly for each topic.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Expect the team names to be on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
            expect(screen.getByText(/Danger Noodles/i)).toBeInTheDocument();
            expect(screen.getByText(/Panda Whales/i)).toBeInTheDocument();
        });
        // Expect the  page to have 0 votes for all teams on the page
        expect(screen.getByText(/Velocirabbits\s*:\s*0 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/Cat Snakes\s*:\s*0 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/Danger Noodles\s*:\s*0 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/Panda Whales\s*:\s*0 votes/i)).toBeInTheDocument();
    }));
    test('...if clicking the "+" button increases the vote count.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Get the Velocirabbits team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
        });
        // Get the + button
        const plusButton = screen.getAllByText('+')[0];
        // Add a vote
        fireEvent.click(plusButton);
        // Expect the vote to go up by one
        expect(screen.getByText(/Velocirabbits\s*:\s*1 votes/i)).toBeInTheDocument();
    }));
    test('...if clicking the "-" button decreases the vote count.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Get the Velocirabbits team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
        });
        // Get the + & - buttons
        const plusButton = screen.getAllByText('+')[0];
        const minusButton = screen.getAllByText('-')[0];
        // Add a vote
        fireEvent.click(plusButton);
        // Expect the vote to go up by one
        expect(screen.getByText(/Velocirabbits\s*:\s*1 votes/i)).toBeInTheDocument();
        // Add a vote
        fireEvent.click(minusButton);
        // Expect the vote to go down by one
        expect(screen.getByText(/Velocirabbits\s*:\s*0 votes/i)).toBeInTheDocument();
    }));
    test('...if a user cannot vote more than 3 times for a single topic.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Get the Velocirabbits team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
        });
        // Get the + button
        const plusButton = screen.getAllByText('+')[0];
        // Add a vote 4 times
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        // Expect there to only be 3 votes
        expect(screen.getByText(/Velocirabbits\s*:\s*3 votes/i)).toBeInTheDocument();
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if a user cannot exceed the total vote limit of 6.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Get the Velocirabbits and Cat snake team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
        });
        // Get the + button
        const plusButton = screen.getAllByText('+');
        // Add a vote 3 times for Velo
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        // Add a vote 3 times for Cats
        fireEvent.click(plusButton[1]);
        fireEvent.click(plusButton[1]);
        fireEvent.click(plusButton[1]);
        // Attempt a 7th vote
        fireEvent.click(plusButton[0]);
        // Expect total votes to equal 6
        expect(screen.getByText(/Velocirabbits\s*:\s*3 votes/i)).toBeInTheDocument();
        expect(screen.getByText(/Cat Snakes\s*:\s*3 votes/i)).toBeInTheDocument();
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if an alert is triggered when trying to exceed the vote limit.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make an error interceptor to prevent a console error
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        // Mock window alert
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
        // Get the Velocirabbits and Cat snake team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
        });
        // Get the + button
        const plusButton = screen.getAllByText('+');
        // Add a vote 3 times for Velo
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        // Add a vote 3 times for Cats
        fireEvent.click(plusButton[1]);
        fireEvent.click(plusButton[1]);
        fireEvent.click(plusButton[1]);
        // Attempt a 7th vote
        fireEvent.click(plusButton[0]);
        // Expect error to be thrown
        expect(alertMock).toHaveBeenCalledWith(`Couldn't add voteCheck votes remaining is 0, or if votes for a topic exceeds 3`);
        // Reset the console to remove the error
        consoleErrorSpy.mockRestore();
    }));
    test('...if the "Submit" button exists on the page.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Expect voting to be on the page.
        yield waitFor(() => {
            expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
        });
        // Expect the submit button to be on the page
        expect(screen.getByText(/Submit!/i)).toBeInTheDocument();
    }));
    xtest('...if clicking "Submit" sends the correct vote data.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make a fake submit
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        }));
        // Get the Velocirabbits and Cat snake team on the page
        yield waitFor(() => {
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
        });
        // Get the + button
        const plusButton = screen.getAllByText('+');
        // Add a vote 3 times for Velo
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        fireEvent.click(plusButton[0]);
        // Add a vote 2 times for Cats
        fireEvent.click(plusButton[1]);
        fireEvent.click(plusButton[1]);
        // Get the submit button
        const submitButton = screen.getByText(/Submit!/i);
        // Hit it
        fireEvent.click(submitButton);
        // Expect the fetch to be called w/ the correct data
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/user/updated-votes', expect.objectContaining({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes: [2, 1, 0, 0],
                code: '12345',
            }),
        }));
    }));
    test('...if clicking "Submit" navigates the user to the results page.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Wait for screen to load
        yield waitFor(() => {
            expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
        });
        // Get the submit button
        const submitButton = screen.getByText(/Submit!/i);
        // Hit it
        fireEvent.click(submitButton);
        // Expect the navigate function to have been called
        yield waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/results', {
                state: { username: 'testUser', code: '12345' },
            });
        });
    }));
    test('...if the dashboard button exists and navigates correctly.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Wait for the page to load
        yield waitFor(() => {
            expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
        });
        // get the dashboard button
        const dashboardButton = screen.getByText(/Dashboard/i);
        // Expect the dashboard to be in the document
        expect(dashboardButton).toBeInTheDocument();
        // Click it
        fireEvent.click(dashboardButton);
        // Wait for the navigate to trigger with the dashboard
        yield waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
                state: { username: 'testUser' },
            });
        });
    }));
    test('...if an error message appears when the vote submission fails.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Fake a failed submit
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false, // Simulating a failed response
            json: () => Promise.resolve({ message: 'Vote submission failed' }),
        }));
        // Make an alert window
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
        // Wait for the topics to render
        yield waitFor(() => {
            expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
        });
        // Get the submit button
        const submitButton = screen.getByText(/Submit!/i);
        // Click it
        fireEvent.click(submitButton);
        // Expect the alert to have been triggered
        yield waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Updated votes failedVote submission failed');
        });
        // Restore the alert
        alertMock.mockRestore();
    }));
    test('...if the fetch call correctly retrieves poll data on mount.', () => __awaiter(void 0, void 0, void 0, function* () {
        // Wait for the fetch request to complete
        yield waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/user/voting-page/12345');
        });
        // Expect the poll data to be displayed
        yield waitFor(() => {
            expect(screen.getByText(/Best FTRI 53 Team/i)).toBeInTheDocument();
            expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
            expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
            expect(screen.getByText(/Danger Noodles/i)).toBeInTheDocument();
            expect(screen.getByText(/Panda Whales/i)).toBeInTheDocument();
        });
    }));
});
