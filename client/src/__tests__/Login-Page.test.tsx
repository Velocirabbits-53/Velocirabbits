import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import "../pages/Login-Page.tsx"
import { MemoryRouter } from "react-router-dom"; 
import Login from "../pages/Login-Page";

test('renders login page without crashing', () => {
    // Render the Login component
    render(
    <MemoryRouter>
        <Login />;
    </MemoryRouter>
    );
    
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });