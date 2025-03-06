//Boilerplate imports
import React, { useRef, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import "./Login-Page.css";
import { LocationState } from "../types";

function Login() {
  // declare navigate to change web addresses
  const navigate = useNavigate();
  // setting the username/passRefs as useRef.
  const usernameRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  async function loginRequest(): Promise<void> {
    if (!usernameRef.current || !passwordRef.current) {
      console.error("Username or password input is not available.");
      return;
    }
    // the buttonclick invokes this function
    const username: string = usernameRef.current.value;
    const password: string = passwordRef.current.value;
    console.log(username);
    console.log(password);
    try {
      console.log("hello Anthony");
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      console.log("The value of response.body is", response);
      if (response.ok) {
        console.log("You are logged in");
        // the line below is currently refreshing the page. we can test a redirect with another page once we have one, but it currently isn't correct.
        // window.location.href = '/' //put page structure for Dashboard/Homepage here.
        navigate("/dashboard", {
          state: { username: `${username}` } as LocationState,
        });
      } else {
        const error = await response.json();
        console.error("Login failed", error);
        alert("Login failed" + (error.message || "Invalid login information."));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const registerButtonClick = async (): Promise<void> => {
    // redirect user to Register.jsx
    navigate("/register");
  };

  return (
    <>
      <h1>Log In</h1>
      <div className='inputs'>
        //add label for username via htmlFor attribute
        <label className='label' htmlFor = 'username'>Username</label>
        <input type='text' id = 'username' ref={usernameRef} />
      </div>
      <div className='inputs'>
        {' '}
        //add label for password via htmlFor attribute
        <label className='label' htmlFor = 'password'>Password</label>
        <input type='password' id = 'password' ref={passwordRef} />

      </div>
      <div className="card">
        {/* onclick, this should update the refs  */}
        <div>
          <button onClick={loginRequest}>Login</button>
          <button onClick={registerButtonClick}>Register</button>
        </div>
      </div>
    </>
  );
}

export default Login;
