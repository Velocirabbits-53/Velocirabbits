import React, { useEffect, useState } from 'react';
import '../../public/styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { Poll, LocationState } from '../types';

const PastPollsGraph: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as LocationState;
  const { username } = data;

  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  useEffect(() => {
    const getPastPolls = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/pastpolls/${username}`
        );
        if (!response.ok) throw new Error('Error fetching past polls');
        const data: Poll[] = await response.json();
        console.log('The value of data is', data);
        setPolls(data);
      } catch (error) {
        console.error('Error fetching past polls:', error);
      }
    };
    getPastPolls();
  }, [username]);

  return (
    <div>
      <h1>Past Polls:</h1>
      {polls.length > 0 && (
        <div>
          <h2>Select a Poll to View:</h2>
          <select
            onChange={(e) => setSelectedPoll(polls[parseInt(e.target.value)])}
          >
            <option value=''>Select a Poll</option>
            {polls.map((poll, index) => (
              <option key={index} value={index}>
                {poll.pollName}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedPoll && (
        <div>
          <h2>{selectedPoll.pollName}</h2>
          <Plot
            data={[
              {
                x: selectedPoll.pollTopics.map((poll) => poll.pollTopic),
                y: selectedPoll.pollTopics.map((poll) => poll.votes),
                type: 'bar',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: `Poll Results: ${selectedPoll.pollName}`,
              xaxis: { title: 'Poll Topics' },
              yaxis: { title: 'Votes' },
            }}
          />
        </div>
      )}

      <button
        onClick={() =>
          navigate('/dashboard', { state: { username: `${username}` } })
        }
      >
        Dashboard
      </button>
    </div>
  );
};

export default PastPollsGraph;
