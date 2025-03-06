import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePoll from '../pages/CreatePoll';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { username: 'testUser' } }),
}));

beforeEach(() => {
  // fake a user entry to the page
  mockNavigate.mockClear();
  // clear previous click trackers
  jest.clearAllMocks();
  // make a fetch for a code
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve('12345'),
      status: 200,
    } as Response)
  ) as jest.Mock;
  // render the stuff
  render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
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
      .mockImplementation(() => {});

    // Make some input for the poll name
    const pollNameInput =
      screen.getByPlaceholderText<HTMLInputElement>(/Type poll name/i);

    // Send it
    fireEvent.change(pollNameInput, { target: { value: 'Test Poll' } });
    expect(pollNameInput.value).toBe('Test Poll');

    // Make some input for the poll topics
    const topicInputs =
      screen.getAllByPlaceholderText<HTMLInputElement>(/Type poll topic/i);

    // Send it
    fireEvent.change(topicInputs[0], { target: { value: 'Topic 1' } });

    // Expect the poll to be have data in it
    expect(topicInputs[0].value).toBe('Topic 1');

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if typing in a topic input updates its value.', () => {
    // Grab the topic input box
    const topicInputs =
      screen.getAllByPlaceholderText<HTMLInputElement>(/Type poll topic/i);

    // Add some topic data
    fireEvent.change(topicInputs[0], { target: { value: 'New Topic' } });

    // Expect the input box to have data in it
    expect(topicInputs[0].value).toBe('New Topic');
  });

  test('...if the Create Poll submits the form successfully.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Add a name to the poll
    fireEvent.change(
      screen.getByPlaceholderText<HTMLInputElement>(/Type poll name/i),
      {
        target: { value: 'My Poll' },
      }
    );

    // Add topics to the poll
    const topicInputs =
      screen.getAllByPlaceholderText<HTMLInputElement>(/Type poll topic/i);
    fireEvent.change(topicInputs[0], { target: { value: 'Option A' } });
    fireEvent.change(topicInputs[1], { target: { value: 'Option B' } });
    fireEvent.change(topicInputs[2], { target: { value: 'Option C' } });

    // Attempt to create a poll
    fireEvent.click(screen.getByText(/Create Poll/i));

    // Expect the submit function to be called once
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Expect the navigation to send us to confirmation
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(
        '/confirmation',
        expect.anything()
      )
    );

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

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

  test('...if the Create Poll button does not submit when poll name is empty.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Submit the attempt
    fireEvent.click(screen.getByText(/Create Poll/i));

    // Expect the thing not to run.
    await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if the Create Poll button does not submit when all topics are empty.', async () => {
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Add a poll name
    fireEvent.change(screen.getByPlaceholderText(/Type poll name/i), {
      target: { value: 'Valid Poll Name' },
    });

    // Go straight to submit, without topics
    fireEvent.click(screen.getByText(/Create Poll/i));

    // Expect the function to not have been called.
    await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });
});
