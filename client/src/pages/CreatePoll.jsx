//* Create Poll page after user clicked Create a new Poll
import React, { useState } from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';

function CreatePoll() {
  const [pollName, setPollName] = useState('');

  const navigate = useNavigate();

  // passing data into create poll
  const location = useLocation();
  const data = location.state;

  console.log('test 💙:', data);

  // TODO Create Poll Button
  // function sends the user's response to the server when they click the button (Create Poll)
  // create a new poll record in mongoose w/ fetch post req
  const createPollHandleButtonClick = async () => {
    try {
      const response = await fetch('/CreatePoll', {
        // how client sends req to server
        // fetch(arg1: server url, arg2: object (req options))
        // fetch sends req to the server at the route (route) = arg1 | req to create a new poll
        // arg2: specifying that its a get req
        method: 'GET',
      });

      // TODO user is to be redirected to Confirmation for Poll Created
      // if request is successful, redirect user to Confirmation.jsx
      
      if (response.ok) {
        navigate('/confirmation');
      } else {
        // otherwise log error
        console.error('Failed to Create Poll');
      }
    } catch (error) {
      // if something goes wrong in try block, error is logged
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <h1>Name of Poll</h1>
      <input
      //
      />
      <p>Name of Topics:</p>
      {/* onClick handler calls addTopics, createPolltHandleButtonClick*/}
      {/* <button onClick={addTopicsHandleButtonClick}>+</button> */}
      <button onClick={createPollHandleButtonClick}>Create Poll</button>
      {/* onClick handler redirects user back to Dashboard */}
      <button onClick={() => navigate('/dashboard')}> Dashboard </button>
    </div>
  );
}

// export CreatePoll component so that it can be used in other files
export default CreatePoll;
