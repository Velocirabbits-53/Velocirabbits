//* Voting page after user clicked 'Vote Now'

import React from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate } from 'react-router-dom';

function VotingPage() {
  const navigate = useNavigate();

  // TODO Create Submit Button and redirect to Results / Graphs
  //
  const submitHandleButtonClick = async () => {};
  return (
    <div>
      <h1>Casting your Vote</h1>
      <p>Votes Remaining: </p>
      {/* onClick handler calls submitHandleButtonClick */}
      {/* send data to db when a button is clicked */}
      <button onClick={submitHandleButtonClick}>Submit!</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </div>
  );
}

// export VotingPage component so that it can be used in other files
export default VotingPage;
