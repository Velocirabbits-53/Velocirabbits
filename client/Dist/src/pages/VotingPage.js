var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//* Voting page after user clicked 'Vote Now'
import '../../public/styles/Style.css';
import { useEffect, useState } from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';
function VotingPage() {
    const [polls, setPolls] = useState([]);
    const [votes, setVotes] = useState([]);
    const [votesRemaining, setVotesRemaining] = useState(6);
    const [pollName, setPollName] = useState('');
    const [pollTopics, setPollTopics] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const { username, code } = data;
    // console.log(code);
    const url = `http://localhost:3000/user/voting-page/${code}`;
    useEffect(() => {
        fetch(url)
            .then((response) => {
            if (!response.ok) {
                throw new Error('the response contains an error');
            }
            return response.json();
        })
            .then((data) => {
            setPolls([data]);
            setPollName(data.pollName);
            setPollTopics(data.pollTopics);
            // console.log(data.pollTopics)
            const pollTopicsLength = data.pollTopics;
            // console.log('The value of pollTopics is',pollTopicsLength)
            const tempArr = [];
            for (let i = 0; i < pollTopicsLength.length; i++) {
                tempArr.push(0);
            }
            setVotes(tempArr);
            // console.log('The value of tempArr is',tempArr)
        })
            .catch((error) => {
            console.error('error fetching data', error);
        });
    }, [url]);
    // console.log(polls);
    // console.log('The value of pollname is',pollName)
    const addVote = (topicIndex) => {
        // console.log(topicIndex)
        if (votesRemaining > 0 && votes[topicIndex] < 3) {
            // console.log('Voted Added')
            let updatedVotes = votes.slice();
            updatedVotes[topicIndex] = Number(updatedVotes[topicIndex]) + 1;
            setVotes(updatedVotes);
            // console.log('The value of updatedVotes is',updatedVotes)
            const updatedVotesRemaining = Number(votesRemaining) - 1;
            setVotesRemaining(updatedVotesRemaining);
            // console.log('The value of the remaining votes is', updatedVotesRemaining)
        }
        else {
            console.error('Add Vote failed');
            alert("Couldn't add vote" +
                'Check votes remaining is 0, or if votes for a topic exceeds 3');
        }
    };
    const deleteVote = (topicIndex) => {
        // console.log(topicIndex)
        if (votesRemaining < 6 && votes[topicIndex] > 0) {
            // console.log('Voted Deleted')
            let updatedVotes = votes.slice();
            updatedVotes[topicIndex] = Number(updatedVotes[topicIndex]) - 1;
            setVotes(updatedVotes);
            // console.log('The value of updatedVotes is',updatedVotes)
            const updatedVotesRemaining = Number(votesRemaining) + 1;
            setVotesRemaining(updatedVotesRemaining);
            // console.log('The value of the remaining votes is', updatedVotesRemaining)
        }
        else {
            // console.error('Delete vote failed');
            alert("Couldn't delete vote" +
                'Check votes remaining is 6, or if votes for a topic is 0');
        }
    };
    // console.log('The value of pollTopics is', pollTopics);
    // TODO Create Submit Button and redirect to Results / Graphs
    //
    const submitHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPollTopics = pollTopics.map((poll, index) => {
                return (poll.votes = votes[index]);
            });
            // console.log('The value of poll.votes is', updatedPollTopics);
            const response = yield fetch('http://localhost:3000/user/updated-votes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // pollName : `${pollName}`,
                    // pollTopics: pollTopics,
                    votes: votes,
                    code: code,
                }),
            });
            // console.log('The value of response.body is', response);
            if (response.ok) {
                navigate('/results', {
                    state: { username: `${username}`, code: `${code}` },
                });
            }
            else {
                const error = yield response.json();
                // console.error('Failed to update votes', error);
                alert('Updated votes failed' +
                    (error.message || 'Failed to update vote information.'));
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    return (_jsxs("div", { children: [_jsx("h1", { children: "Casting your Vote" }), _jsxs("p", { children: ["Votes Remaining:", votesRemaining, " "] }), _jsx("div", { className: 'labeladddeletebuttons', children: polls.map((poll, index) => (_jsxs("div", { className: 'buttondiv', children: [_jsx("h2", { children: poll.pollName }), _jsx("ul", { children: poll.pollTopics.map((topic, topicIndex) => (_jsxs("div", { children: [_jsxs("div", { className: 'buttonlables', children: [topic.pollTopic, ": ", votes[topicIndex], " votes"] }), _jsxs("div", { className: 'adddeletebuttons', children: [_jsx("button", { onClick: () => addVote(topicIndex), children: "+" }), _jsx("button", { onClick: () => deleteVote(topicIndex), children: "-" })] })] }, topicIndex))) })] }, index))) }), _jsxs("div", { className: 'submitdashboard', children: [_jsx("button", { onClick: submitHandleButtonClick, children: "Submit!" }), _jsx("button", { onClick: () => navigate('/dashboard', { state: { username: `${username}` } }), children: "Dashboard" })] })] }));
}
// export VotingPage component so that it can be used in other files
export default VotingPage;
