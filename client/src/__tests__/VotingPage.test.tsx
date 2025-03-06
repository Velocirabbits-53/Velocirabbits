import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VotingPage from '../pages/VotingPage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { username: 'testUser' } }),
}));

beforeEach(async () => {
  // fake a user entry to the page
  mockNavigate.mockClear();
  // clear previous click trackers
  jest.clearAllMocks();
  // make a fetch for a code
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          pollName: 'Best FTRI 53 Team',
          pollTopics: [{ pollTopic: 'Velocirabbits', votes: 0 }, { pollTopic: 'Cat Snakes', votes: 0 }, { pollTopic: 'Danger Noodles', votes: 0 },{ pollTopic: 'Panda Whales', votes: 0 }],
        }),
    })
  ) as jest.Mock;
  // render the stuff
  await act(async () => {
    render(
      <BrowserRouter>
        <VotingPage />
      </BrowserRouter>
    );
  });
});

describe('Checking the Voting Page component to see...', () => {
  test('...if the Voting Page component can render.', () => {
    // // Make an error interceptor to prevent a console error
    // const consoleErrorSpy = jest
    //   .spyOn(console, 'error')
    //   .mockImplementation(() => {});

    // Expect the vote text to be on the screen
    expect(
      screen.getByText(/Casting your Vote/i)
    ).toBeInTheDocument();

    // // Reset the console to remove the error
    // consoleErrorSpy.mockRestore();
  });

  test('...if the poll name is displayed correctly.', async () => {

    // Expect the poll name to appear
    await waitFor(() =>
      expect(screen.getByText(/Best Programming Language/i)).toBeInTheDocument()
    );

  });

  test('...if the poll topics are rendered as buttons.', () => {

  });

  xtest('...if the initial vote count is displayed correctly for each topic.', () => {});

  xtest('...if clicking the "+" button increases the vote count.', () => {});

  xtest('...if clicking the "-" button decreases the vote count.', () => {});

  xtest('...if a user cannot vote more than 3 times for a single topic.', () => {});

  xtest('...if a user cannot exceed the total vote limit of 6.', () => {});

  xtest('...if an alert is triggered when trying to exceed the vote limit.', () => {});

  xtest('...if the "Submit" button exists on the page.', () => {});

  xtest('...if clicking "Submit" sends the correct vote data.', () => {});

  xtest('...if clicking "Submit" navigates the user to the results page.', () => {});

  xtest('...if the dashboard button exists and navigates correctly.', () => {});

  xtest('...if an error message appears when the vote submission fails.', () => {});

  xtest('...if the fetch call correctly retrieves poll data on mount.', () => {});

  xtest('...if the component shows an error message when fetch fails.', () => {});
});
