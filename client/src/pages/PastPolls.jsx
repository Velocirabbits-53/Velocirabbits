import { useRef, useState } from 'react';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PastPolls = () => {
  const [polls, setPolls] = useState([]);

  const getPastPolls = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/pastpolls');
      const data = await response.json();
      console.log(data);
      setPolls(data);
    } catch (error) {
      console.error('Error fetching past polls:', error);
    }
  };

  return (
    <div>
      <h1>Past Polls:</h1>
      <button onClick={() => getPastPolls()}>Past Polls</button>
      {polls.map((poll, index) => (
        <div key={index}>
          <h4>{JSON.stringify(poll.pollTopics)}</h4>
        </div>
      ))}
    </div>
  );
};

export default PastPolls;
