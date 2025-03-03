//* Confirmation page after user clicked Create Poll

import React, { useState } from 'react';

// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';

function Confirmation() {

  //can this be deleted?
  // const [userName, setUserName] = useState('username');

  const navigate = useNavigate();

  // bringing data from: dashboard?
  const location = useLocation();
  const data = location.state;
  // deconstructed data
  const { username, code } = data;
  
  

  // TODO Create where users click Vote Now
  // function sends the user's response to the server when they click the button (Create Poll)
  // create a new poll record in mongoose w/ fetch post req
  const voteNowHandleButtonClick = 
  // async 
  () => {
    // try {
    //   const response = await fetch('/', {
    //     // how client sends req to server
    //     // fetch(arg1: server url, arg2: object (req options))
    //     // fetch sends req to the server at the route (route) = arg1 | req to create a new poll
    //     // arg2: specifying that its a get req
    //     method: 'GET',
    //   });

    //   // TODO user is to User Input page
    //   // if request is successful, redirect user to Confirmation.jsx
    //   if (response.ok) {
        navigate('/voting-page',{ state: { username: `${username}`, code: `${code}`}});
    //   } else {
    //     // otherwise log error
    //     console.error('Failed to get the requested poll');
    //   }
    // } catch (error) {
    //   // if something goes wrong in try block, error is logged
    //   console.error('Error:', error);
    // }
  };

  return (
    <div>
      <h1>Congrats, {username}</h1>
      <p>Your poll code is ready to be shared! </p>
      <p> {code} </p>
      {/* onClick handler calls voteNowHandleButtonClick */}
      {/* send data to db when a button is clicked */}
      <button onClick={()=>voteNowHandleButtonClick()}>Vote Now!</button>
      <button
        onClick={() =>
          navigate('/dashboard', { state: { username: `${username}`, code : `${code}` } })
        }
      >
        Dashboard
      </button>
    </div>
  );
}

// export VotingPage component so that it can be used in other files
export default Confirmation;
