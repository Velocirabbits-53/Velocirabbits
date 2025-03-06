import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [polls, setPolls] = useState([]);
    // only passing in one poll
    const [poll, setPoll] = useState({
        pollName: '',
        pollTopics: [],
        code: '',
        createdBy: '',
    }); // TS Require this to be a poll type
    const [pollName, setPollName] = useState('');
    const [pollTopics, setPollTopics] = useState([]); // TS Require this to be a pollTopic type
    // const [votes, setVotes] = useState([]);
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
    return (_jsxs("div", { children: [_jsx("h1", { children: "Results" }), _jsx("div", { children: _jsxs("div", { children: [_jsx("h2", { children: pollName }), _jsx("ul", { children: pollTopics.map((topic, topicIndex) => {
                                let rank;
                                if (topicIndex === 0) {
                                    rank = '1st Place';
                                }
                                else if (topicIndex === 1) {
                                    rank = '2nd Place';
                                }
                                else if (topicIndex === 2) {
                                    rank = '3rd Place';
                                }
                                else {
                                    rank = `${topicIndex + 1}th Place`;
                                }
                                {
                                    /* inside our list, each poll topic will be rendered as a list item */
                                }
                                return (_jsxs("li", { children: [rank, ": ", topic.pollTopic, " - ", topic.votes, " votes"] }, topicIndex));
                            }) })] }) }), _jsx("button", { onClick: () => navigate('/dashboard', { state: { username: `${username}` } }), children: "Dashboard" }), _jsx("button", { onClick: () => navigate('/resultsGraph', {
                    state: { username: `${username}`, code: `${code}` },
                }), children: "View Results Graph!" })] }));
};
export default Results;
