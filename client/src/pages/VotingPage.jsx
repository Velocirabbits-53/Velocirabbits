//* Voting page after user clicked 'Vote Now'

import React, {useEffect, useState} from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';

function VotingPage() {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()
   const data = location.state
   const { username, code } = data;
   console.log(code)
  const url = `http://localhost:3000/user/voting-page${code}`
useEffect(()=>{
fetch(url)
.then((response)=>{
  if (!response.ok) {
    throw new Error('the response contains an error');
  }
  return response.json();
}).then((data)=>{

setPolls([data])
}).catch((error)=>{
  console.error('error fetching data', error)
})

}, [url])

console.log(polls)

  // TODO Create Submit Button and redirect to Results / Graphs
  //
  const submitHandleButtonClick = async () => {};
  return (
    <div>
      <h1>Casting your Vote</h1>
      <p>Votes Remaining: </p>
      {/* onClick handler calls submitHandleButtonClick */}
      {/* send data to db when a button is clicked */}
      <div>
      {polls.map((poll, index) => (
        <div key={index}>
          <h2>{poll.pollName}</h2>
          <ul>
            {poll.pollTopics.map((topic, topicIndex) => (
              <li key={topicIndex}>
                {topic.pollTopic}: {topic.votes} votes
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
      <button onClick={submitHandleButtonClick}>Submit!</button>
      <button onClick={() => navigate('/dashboard', { state: { username: `${username}` } })}>Dashboard</button>
    </div>
  );
}

// export VotingPage component so that it can be used in other files
export default VotingPage;