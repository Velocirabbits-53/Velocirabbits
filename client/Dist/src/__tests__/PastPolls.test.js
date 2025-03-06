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
import { BrowserRouter as Router } from 'react-router-dom';
import PastPolls from '../pages/PastPolls';
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => jest.fn(), useLocation: () => ({
        state: { username: 'testUser' },
    }) })));
describe('PastPolls', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    pollName: 'Test Poll 1',
                    pollTopics: [
                        { pollTopic: 'Topic 1', votes: 10 },
                        { pollTopic: 'Topic 2', votes: 20 },
                    ],
                },
                {
                    pollName: 'Test Poll 2',
                    pollTopics: [
                        { pollTopic: 'Topic 3', votes: 30 },
                        { pollTopic: 'Topic 4', votes: 40 },
                    ],
                },
            ]),
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render past polls and handle navigation', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(Router, { children: _jsx(PastPolls, {}) }));
        expect(screen.getByText('Past Polls:')).toBeInTheDocument();
        yield waitFor(() => {
            expect(screen.getByText('Test Poll 1')).toBeInTheDocument();
            expect(screen.getByText('Topic 1: 10 votes')).toBeInTheDocument();
            expect(screen.getByText('Topic 2: 20 votes')).toBeInTheDocument();
            expect(screen.getByText('Test Poll 2')).toBeInTheDocument();
            expect(screen.getByText('Topic 3: 30 votes')).toBeInTheDocument();
            expect(screen.getByText('Topic 4: 40 votes')).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText('Dashboard'));
        fireEvent.click(screen.getByText('Past Polls Graphs'));
        // Add assertions for navigation if needed
        // Example:
        // expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
        // expect(mockedNavigate).toHaveBeenCalledWith('/past-polls-graphs');
    }));
    it('should handle fetch errors', () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
        }));
        render(_jsx(Router, { children: _jsx(PastPolls, {}) }));
        yield waitFor(() => {
            expect(screen.getByText('Error fetching past polls')).toBeInTheDocument();
        });
    }));
});
