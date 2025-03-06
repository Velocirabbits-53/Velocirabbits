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

describe('Checking the Voting Page component to see...', () => {
  test('...if the Voting Page component can render.', () => {});

  test('...if the poll name is displayed correctly.', () => {});

  test('...if the poll topics are rendered as buttons.', () => {});

  test('...if the initial vote count is displayed correctly for each topic.', () => {});

  test('...if clicking the "+" button increases the vote count.', () => {});

  test('...if clicking the "-" button decreases the vote count.', () => {});

  test('...if a user cannot vote more than 3 times for a single topic.', () => {});

  test('...if a user cannot exceed the total vote limit of 6.', () => {});

  test('...if an alert is triggered when trying to exceed the vote limit.', () => {});

  test('...if the "Submit" button exists on the page.', () => {});

  test('...if clicking "Submit" sends the correct vote data.', () => {});

  test('...if clicking "Submit" navigates the user to the results page.', () => {});

  test('...if the dashboard button exists and navigates correctly.', () => {});

  test('...if an error message appears when the vote submission fails.', () => {});

  test('...if the fetch call correctly retrieves poll data on mount.', () => {});

  test('...if the component shows an error message when fetch fails.', () => {});
});
