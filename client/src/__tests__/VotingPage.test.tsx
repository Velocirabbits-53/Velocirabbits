import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VotingPage from '../pages/VotingPage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { username: 'testUser', code: '12345' } }),
}));

beforeEach(async () => {
  // clear previous click trackers
  jest.clearAllMocks();
  // fake a user entry to the page
  mockNavigate.mockClear();
  // make a fetch for a code
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          pollName: 'Best FTRI 53 Team',
          pollTopics: [
            { pollTopic: 'Velocirabbits', votes: 0 },
            { pollTopic: 'Cat Snakes', votes: 0 },
            { pollTopic: 'Danger Noodles', votes: 0 },
            { pollTopic: 'Panda Whales', votes: 0 },
          ],
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
    // Expect the vote text to be on the screen
    expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
  });

  test('...if the poll name is displayed correctly.', async () => {
    // Expect the poll name to appear
    await waitFor(() =>
      expect(screen.getByText(/Best FTRI 53 Team/i)).toBeInTheDocument()
    );
  });

  test('...if the poll topics are rendered as buttons.', async () => {
    // Expect the Poll Topics to be the FTRI teams
    await waitFor(() => {
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
  });

  test('...if the initial vote count is displayed correctly for each topic.', async () => {
    // Expect the team names to be on the page
    await waitFor(() => {
      expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
      expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
      expect(screen.getByText(/Danger Noodles/i)).toBeInTheDocument();
      expect(screen.getByText(/Panda Whales/i)).toBeInTheDocument();
    });

    // Expect the  page to have 0 votes for all teams on the page
    expect(
      screen.getByText(/Velocirabbits\s*:\s*0 votes/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Cat Snakes\s*:\s*0 votes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Danger Noodles\s*:\s*0 votes/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Panda Whales\s*:\s*0 votes/i)).toBeInTheDocument();
  });

  test('...if clicking the "+" button increases the vote count.', async () => {
    // Get the Velocirabbits team on the page
    await waitFor(() => {
      expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
    });

    // Get the + button
    const plusButton = screen.getAllByText('+')[0];

    // Add a vote
    fireEvent.click(plusButton);

    // Expect the vote to go up by one
    expect(
      screen.getByText(/Velocirabbits\s*:\s*1 votes/i)
    ).toBeInTheDocument();
  });

  test('...if clicking the "-" button decreases the vote count.', async () => {
    // Get the Velocirabbits team on the page
    await waitFor(() => {
      expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
    });

    // Get the + & - buttons
    const plusButton = screen.getAllByText('+')[0];
    const minusButton = screen.getAllByText('-')[0];

    // Add a vote
    fireEvent.click(plusButton);

    // Expect the vote to go up by one
    expect(
      screen.getByText(/Velocirabbits\s*:\s*1 votes/i)
    ).toBeInTheDocument();

    // Add a vote
    fireEvent.click(minusButton);

    // Expect the vote to go down by one
    expect(
      screen.getByText(/Velocirabbits\s*:\s*0 votes/i)
    ).toBeInTheDocument();
  });

  test('...if a user cannot vote more than 3 times for a single topic.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Get the Velocirabbits team on the page
    await waitFor(() => {
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
    expect(
      screen.getByText(/Velocirabbits\s*:\s*3 votes/i)
    ).toBeInTheDocument();

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if a user cannot exceed the total vote limit of 6.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Get the Velocirabbits and Cat snake team on the page
    await waitFor(() => {
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
    expect(
      screen.getByText(/Velocirabbits\s*:\s*3 votes/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Cat Snakes\s*:\s*3 votes/i)).toBeInTheDocument();

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if an alert is triggered when trying to exceed the vote limit.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Mock window alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Get the Velocirabbits and Cat snake team on the page
    await waitFor(() => {
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
    expect(alertMock).toHaveBeenCalledWith(
      `Couldn't add voteCheck votes remaining is 0, or if votes for a topic exceeds 3`
    );

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if the "Submit" button exists on the page.', async () => {
    // Expect voting to be on the page.
    await waitFor(() => {
      expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
    });

    // Expect the submit button to be on the page
    expect(screen.getByText(/Submit!/i)).toBeInTheDocument();
  });

  test('...if clicking "Submit" sends the correct vote data.', async () => {
    // Make a fake submit
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    // Get the Velocirabbits and Cat snake team on the page
    await waitFor(() => {
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
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/user/updated-votes',
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          votes: [3, 2, 0, 0],
          code: '12345',
        }),
      })
    );
  });

  test('...if clicking "Submit" navigates the user to the results page.', async () => {
    // Wait for screen to load
    await waitFor(() => {
      expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
    });

    // Get the submit button
    const submitButton = screen.getByText(/Submit!/i);

    // Hit it
    fireEvent.click(submitButton);

    // Expect the navigate function to have been called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/results', {
        state: { username: 'testUser', code: '12345' },
      });
    });
  });

  test('...if the dashboard button exists and navigates correctly.', async () => {
    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
    });
    // get the dashboard button
    const dashboardButton = screen.getByText(/Dashboard/i);

    // Expect the dashboard to be in the document
    expect(dashboardButton).toBeInTheDocument();

    // Click it
    fireEvent.click(dashboardButton);

    // Wait for the navigate to trigger with the dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        state: { username: 'testUser' },
      });
    });
  });

  test('...if an error message appears when the vote submission fails.', async () => {
    // Fake a failed submit
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, // Simulating a failed response
        json: () => Promise.resolve({ message: 'Vote submission failed' }),
      })
    ) as jest.Mock;

    // Make an alert window
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Wait for the topics to render
    await waitFor(() => {
      expect(screen.getByText(/Casting your Vote/i)).toBeInTheDocument();
    });

    // Get the submit button
    const submitButton = screen.getByText(/Submit!/i);

    // Click it
    fireEvent.click(submitButton);

    // Expect the alert to have been triggered
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        'Updated votes failedVote submission failed'
      );
    });

    // Restore the alert
    alertMock.mockRestore();
  });

  test('...if the fetch call correctly retrieves poll data on mount.', async () => {
    // Wait for the fetch request to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/user/voting-page/12345'
      );
    });

    // Expect the poll data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Best FTRI 53 Team/i)).toBeInTheDocument();
      expect(screen.getByText(/Velocirabbits/i)).toBeInTheDocument();
      expect(screen.getByText(/Cat Snakes/i)).toBeInTheDocument();
      expect(screen.getByText(/Danger Noodles/i)).toBeInTheDocument();
      expect(screen.getByText(/Panda Whales/i)).toBeInTheDocument();
    });
  });
});
