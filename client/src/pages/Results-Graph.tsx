import React, { useEffect, useState } from 'react';
import '../../public/styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { Poll, PollTopic, LocationState } from '../types';



const ResultsGraph = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   const [polls, setPolls] = useState([]);
  // only passing in one poll
  const [poll, setPoll] = useState<Poll>({
    pollName: '',
    pollTopics: [],
    code: '',
    createdBy: '',
  });
  const [pollName, setPollName] = useState<string>('');
  const [pollTopics, setPollTopics] = useState<PollTopic[]>([]);
  //   const [votes, setVotes] = useState([]);
  const data: LocationState = location.state || {};
  const { username, code } = data;

  const url: string = `http://localhost:3000/user/results/${code}`;
  useEffect(() => {
    fetch(url)
      .then((response): Promise<Poll> => {
        if (!response.ok) {
          throw new Error('the response contains an error');
        }
        return response.json();
      })
      .then((data) => {
        // console.log('data 💙:', data.pollName);
        console.log('The value of data is ',data)
        setPoll(data);
        setPollName(data.pollName);
        // sorting our poll topics (high to low)
        // arr is the poll topics fetched from the backend, using an arr so that we don't edit our original one but instead make a copy
        const sortedTopics: PollTopic[] = [...data.pollTopics].sort(
          (a, b) => b.votes - a.votes
        );
        // we are setting our poll topic state to the sorted topics ()
        setPollTopics(sortedTopics);
      })
      .catch((error: Error) => {
        console.error('error fetching data', error);
      });
  }, [url]);

  // we must return a loading div until data comes back from our fetch req
  if (poll === undefined) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Results:</h1>
{poll && (
        <div>
          <h2>{poll.pollName}</h2>
          <Plot
            data={[
              {
                x: poll.pollTopics.map((poll) => poll.pollTopic),
                y: poll.pollTopics.map((poll) => poll.votes),
                type: 'bar',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: `Poll Results: ${poll.pollName}`,
              xaxis: { title: 'Poll Topics' },
              yaxis: { title: 'Votes' },
            }}
          />
        </div>
      )}

    </div>
  );
};
export default ResultsGraph;
