import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';
import { MemoryRouter } from 'react-router-dom';

describe('Checking the Registration component to see...', () => {
  test('...if the registration component can render.', () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument(); 
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
});
