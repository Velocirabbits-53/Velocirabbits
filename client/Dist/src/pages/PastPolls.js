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
import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
const PastPolls = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const { username } = data;
    const [polls, setPolls] = useState([]);
    //add a error useState
    const [error, setError] = useState(null);
    const getPastPolls = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/user/pastpolls/${username}`);
            //add a error handler if no response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            console.log(data);
            setPolls(data);
            setError(null);
        }
        catch (error) {
            console.error('Error fetching past polls:', error);
            setError('Error fetching past polls');
        }
    });
    useEffect(() => {
        getPastPolls();
    }, [username]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Past Polls:" }), _jsx("button", { onClick: getPastPolls, children: "Past Polls" }), error && _jsx("p", { children: error }), polls.map((poll, index) => (_jsxs("div", { children: [_jsx("h2", { children: poll.pollName }), _jsx("ul", { children: poll.pollTopics.map((topic, topicIndex) => (_jsxs("li", { children: [topic.pollTopic, ": ", topic.votes, " votes"] }, topicIndex))) })] }, index))), _jsx("button", { onClick: () => navigate('/dashboard', { state: { username } }), children: "Dashboard" }), _jsx("button", { onClick: () => navigate('/pastPollsGraph', { state: { username } }), children: "Past Polls Graphs" })] }));
};
export default PastPolls;
