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
  const voteNowHandleButtonClick = (): void => {
      navigate('/voting-page', {
        state: { username: `${username}`, code: `${code}` },
      });
    };
 
  return (
    <div>
      <h1>Congrats, {username}</h1>
      <p>Your poll code is ready to be shared! </p>
      <p> {code} </p>
      {/* onClick handler calls voteNowHandleButtonClick */}
      {/* send data to db when a button is clicked */}
      <button onClick={() => voteNowHandleButtonClick()}>Vote Now!</button>
      <button
        onClick={() =>
          navigate('/dashboard', {
            state: { username: `${username}`, code: `${code}` },
          })
        }
      >
        Dashboard
      </button>
    </div>
  );
}

// export VotingPage component so that it can be used in other files
export default Confirmation;
