import React, { useState, useEffect } from 'react';
import '../../public/styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocationState, Poll } from '../types';

const PastPolls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as LocationState;
  const { username } = data;

  const [polls, setPolls] = useState<Poll[]>([]);
  //add a error useState
  const[error, setError] = useState<string | null>(null);

  const getPastPolls = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/pastpolls/${username}`
      );
      //add a error handler if no response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Poll[] = await response.json();
      console.log(data);
      setPolls(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching past polls:', error);
      setError('Error fetching past polls');
    }
  };

  useEffect(() => {
    getPastPolls();
  }, [username]);

  return (
    <div>
      <h1>Past Polls:</h1>
      <button onClick={getPastPolls}>Past Polls</button>
      {/* display the error if occur */}
      {error && <p>{error}</p>}
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
      <button onClick={() => navigate('/dashboard', { state: { username } })}>
        Dashboard
      </button>
      <button
        onClick={() => navigate('/pastPollsGraph', { state: { username } })}
      >
        Past Polls Graphs
      </button>
    </div>
  );
};

export default PastPolls;

// import { useState } from 'react';
// import '../App.css';
// import { useNavigate, useLocation } from 'react-router-dom';

// const PastPolls = () => {
//   const navigate = useNavigate();

//   // bringing data from: dashboard?
//   const location = useLocation();
//   const data = location.state;
//   // deconstructed data
//   const { username } = data;

//   const [polls, setPolls] = useState([]);

//   const getPastPolls = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/user/pastpolls${username}`);
//       const data = await response.json();
//       console.log(data);
//       setPolls(data);
//     } catch (error) {
//       console.error('Error fetching past polls:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Past Polls:</h1>
//       <button onClick={() => getPastPolls()}>Past Polls</button>
//       {polls.map((poll, index) => (
//         <div key={index}>
//           <h2>{poll.pollName}</h2>
//           <ul>
//             {poll.pollTopics.map((topic, topicIndex) => (
//               <li key={topicIndex}>
//                 {topic.pollTopic}: {topic.votes} votes
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       <button
//         onClick={() =>
//           navigate('/dashboard', { state: { username: `${username}` } })
//         }
//       >
//         Dashboard
//       </button>
//       <button
//         onClick={() =>
//           navigate('/pastPollsGraph', { state: { username: `${username}` } })
//         }
//       >
//        Past Polls Graphs
//       </button>
//     </div>
//   );
// };

// export default PastPolls;
