//* Create Poll page after user clicked Create a new Poll
import React, { useState } from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';

function CreatePoll() {
  const [pollName, setPollName] = useState('');
  const [pollTopics, setPollTopics] = useState('');

  const navigate = useNavigate();

  // passing data into ??
  const location = useLocation();
  const data = location.state;

  console.log('test 💙:', data);

  // TODO the topics the user will be able to type in

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
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify({
          pollName: pollName, // poll name user is voting on (this should have been passed down from Dashboard)
          pollTopics: pollTopics, // name of topics user selected
          code: codeName, // the name of the code assigned to the poll name
        }),
      });

      // TODO user is to be redirected to Confirmation page for poll created
      // if request is successful, redirect user to Confirmation.jsx
      if (response.ok) {
        navigate('/Confirmation.jsx');
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
      <input />
      <p>Name of Topics:</p>
      <div>
        {/* The text box for user input */}
        <input
          type='text'
          // bounds prop value to pollTopics (where it's coming from)
          value={pollTopics}
          // onChange handler calls setPollTopics to update the state whenever the user types
          onChange={(e) => setPollTopics(e.target.value)} // Update state as they type
          placeholder='Type poll topic'
          className='text-input'
        />
      </div>
      <div>
        {/* The text box for user input */}
        <input
          type='text'
          // bounds prop value to pollTopics (where it's coming from)
          value={pollTopics}
          // onChange handler calls setPollTopics to update the state whenever the user types
          onChange={(e) => setPollTopics(e.target.value)} // Update state as they type
          placeholder='Type poll topic'
          className='text-input'
        />
      </div>
      <div>
        {/* The text box for user input */}
        <input
          type='text'
          // bounds prop value to pollTopics (where it's coming from)
          value={pollTopics}
          // onChange handler calls setPollTopics to update the state whenever the user types
          onChange={(e) => setPollTopics(e.target.value)} // Update state as they type
          placeholder='Type poll topic'
          className='text-input'
        />
      </div>
      {/* onClick handler calls addTopics, createPolltHandleButtonClick*/}
      {/* <button onClick={addTopicsHandleButtonClick}>+</button> */}
      <button onClick={createPollHandleButtonClick}>Create Poll</button>
      {/* onClick handler redirects user back to Dashboard */}
      <button onClick={() => navigate('/')}> Dashboard </button>
    </div>
  );
}

// export CreatePoll component so that it can be used in other files
export default CreatePoll;
