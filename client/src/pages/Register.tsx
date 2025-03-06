import React, { useRef, useState } from 'react';
import '../App.css';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  // declare navigate to change web addresses
  const navigate = useNavigate();

  // setting the email/passRefs as useRef.
  const usernameRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  async function regRequest(): Promise<void> {
    if (!usernameRef.current || !passwordRef.current) {
      console.error('Username or password input is not available.');
      return;
    }

    // the buttonclick invokes this function
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    
    if (!username || !password) {
      console.error('Registration failed: Empty fields.');
      alert('Username and password cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        console.log('You are logged in');
        navigate('/dashboard', {
          state: { username: `${username}` },
        });
      } else {
        let error;
        try {
          error = await response.json();
        } catch {
          error = { message: 'Unknown error occurred' };
        }
        console.error('Registration failed', error);
        alert(
          'Login failed: ' + (error.message || 'Invalid login information.')
        );
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Please try again later.');
    }
  }

  return (
    <>
      <h1>Register</h1>
      <div className='inputs'>
        <label className='label' htmlFor='username'>
          Username
        </label>
        <input id='username' type='username' ref={usernameRef} />
      </div>
      <div className='inputs'>
        {' '}
        <label className='label' htmlFor='password'>
          Password
        </label>
        <input id='password' type='password' ref={passwordRef} />
      </div>
      <div className='card'>
        {/* onclick, this should update the refs  */}
        <button
          onClick={(e) => {
            e.preventDefault();
            regRequest();
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export default Register;
