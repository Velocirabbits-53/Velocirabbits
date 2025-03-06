import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
  jest.clearAllMocks(); 
  render(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
});

describe('Checking the Registration component to see...', () => {
  test('...if the registration component can render.', () => {

    // Get the username and password fields
    const usernameInput = screen.getByLabelText(
      /Username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;
  });

  test('...if the registration accepts inputs.', () => {

    // Get the username and password fields
    const usernameInput = screen.getByLabelText(
      /Username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;

    // Enter new details
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

    // Expect the fields to have new data in them
    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('securePass123');
  });

  test('...if the registration submits the form successfully.', async () => {
    // Define a fake fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    // Find the username/password input boxes
    const usernameInput = screen.getByLabelText(
      /Username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;

    // Input a username & password
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

    // Click submit
    fireEvent.click(screen.getByText(/Sign Up/i));

    // Expect a fetch call to the backend with the correct object settings
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/user/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'testUser',
          password: 'securePass123',
        }),
      })
    );

    // Expect a navigation trigger to have been called once, with the state object
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        state: { username: 'testUser' },
      })
    );
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  });

  test('...if the registration fails if the user already exists.', async () => {
    // Define a fake failed fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'User already exists' }),
      })
    ) as jest.Mock;

    // Make an alert to verify it's called
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Find the username/password input boxes
    const usernameInput = screen.getByLabelText(
      /Username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;

    // Input a username & password
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

    // Click submit
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => 
      expect(window.alert).toHaveBeenCalledWith(
        'Login failed: User already exists'
      )
    )
    // Expect an error to appear in the console log
    expect(consoleErrorSpy).toHaveBeenCalledWith('Registration failed', { message: 'User already exists' });
    
    // Expect the navigate not to have triggered
    expect(mockNavigate).not.toHaveBeenCalled();

    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  test('...if the registration prevents submission when fields are empty.', async () => {
    
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
    // Click Sign Up without entering any input
    fireEvent.click(screen.getByText(/Sign Up/i));
  
    // Expect fetch to not get called
    expect(global.fetch).not.toHaveBeenCalled();
  
    // Expect navigation was not triggered
    expect(mockNavigate).not.toHaveBeenCalled();
    
    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });

  
  test('...if the registration prevents submission when only one field is filled.', async () => {
      
    // Make an error interceptor to prevent a console error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Get username & password fields
    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
  
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
  
     // Expect the glabal fetch not to trigger
    expect(global.fetch).not.toHaveBeenCalled();
    
    // Expect navigation was not triggered
    expect(mockNavigate).not.toHaveBeenCalled();
  
    // Reset the console to remove the error
    consoleErrorSpy.mockRestore();
  });
  
});
