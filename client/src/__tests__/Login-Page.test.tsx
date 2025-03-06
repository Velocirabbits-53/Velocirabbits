import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login-Page';

// Mock the useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
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

  test('should call loginRequest function and navigate to dashboard when login button is clicked', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    // Set the input values
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testPass' } });

    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/user/login', expect.any(Object));
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard', { state: { username: 'testUser' } });
    });
  });

  test('should navigate to register page when register button is clicked', () => {
    const registerButton = screen.getByText(/Register/i);
    fireEvent.click(registerButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });
});