import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom"; 
import "../pages/Login-Page.tsx"
import Login from "../pages/Login-Page";

xtest('renders login page without crashing', () => {
    // Render the Login component
    render(
    <MemoryRouter>
        <Login />;
    </MemoryRouter>
    );
    
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});