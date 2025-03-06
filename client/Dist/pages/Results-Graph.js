import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import '../../public/styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
const ResultsGraph = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //   const [polls, setPolls] = useState([]);
    // only passing in one poll
    const [poll, setPoll] = useState({
        pollName: '',
        pollTopics: [],
        code: '',
        createdBy: '',
    });
    const [pollName, setPollName] = useState('');
    const [pollTopics, setPollTopics] = useState([]);
    //   const [votes, setVotes] = useState([]);
    const data = location.state || {};
    const { username, code } = data;
    const url = `http://localhost:3000/user/results/${code}`;
    useEffect(() => {
        fetch(url)
            .then((response) => {
            if (!response.ok) {
                throw new Error('the response contains an error');
            }
            return response.json();
        })
            .then((data) => {
            // console.log('data 💙:', data.pollName);
            console.log('The value of data is ', data);
            setPoll(data);
            setPollName(data.pollName);
            // sorting our poll topics (high to low)
            // arr is the poll topics fetched from the backend, using an arr so that we don't edit our original one but instead make a copy
            const sortedTopics = [...data.pollTopics].sort((a, b) => b.votes - a.votes);
            // we are setting our poll topic state to the sorted topics ()
            setPollTopics(sortedTopics);
        })
            .catch((error) => {
            console.error('error fetching data', error);
        });
    }, [url]);
    // we must return a loading div until data comes back from our fetch req
    if (poll === undefined) {
        return _jsx("div", { children: "Loading" });
    }
    return (_jsxs("div", { children: [_jsx("h1", { children: "Results:" }), poll && (_jsxs("div", { children: [_jsx("h2", { children: poll.pollName }), _jsx(Plot, { data: [
                            {
                                x: poll.pollTopics.map((poll) => poll.pollTopic),
                                y: poll.pollTopics.map((poll) => poll.votes),
                                type: 'bar',
                                marker: { color: 'red' },
                            },
                        ], layout: {
                            title: `Poll Results: ${poll.pollName}`,
                            xaxis: { title: 'Poll Topics' },
                            yaxis: { title: 'Votes' },
                        } })] }))] }));
};
export default ResultsGraph;
