import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PastPolls from '../pages/PastPolls';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: { username: 'testUser' },
  }),
}));

describe('PastPolls', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
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
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render past polls and handle navigation', async () => {
    render(
      <Router>
        <PastPolls />
      </Router>
    );

    expect(screen.getByText('Past Polls:')).toBeInTheDocument();

    await waitFor(() => {
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
  });

  it('should handle fetch errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    render(
      <Router>
        <PastPolls />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching past polls')).toBeInTheDocument();
    });
  });
});