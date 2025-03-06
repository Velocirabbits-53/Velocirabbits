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
import { useEffect, useState } from 'react';
import '../../public/styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
const PastPollsGraph = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const { username } = data;
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    useEffect(() => {
        const getPastPolls = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:3000/user/pastpolls/${username}`);
                if (!response.ok)
                    throw new Error('Error fetching past polls');
                const data = yield response.json();
                console.log('The value of data is', data);
                setPolls(data);
            }
            catch (error) {
                console.error('Error fetching past polls:', error);
            }
        });
        getPastPolls();
    }, [username]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Past Polls:" }), polls.length > 0 && (_jsxs("div", { children: [_jsx("h2", { children: "Select a Poll to View:" }), _jsxs("select", { onChange: (e) => setSelectedPoll(polls[parseInt(e.target.value)]), children: [_jsx("option", { value: '', children: "Select a Poll" }), polls.map((poll, index) => (_jsx("option", { value: index, children: poll.pollName }, index)))] })] })), selectedPoll && (_jsxs("div", { children: [_jsx("h2", { children: selectedPoll.pollName }), _jsx(Plot, { data: [
                            {
                                x: selectedPoll.pollTopics.map((poll) => poll.pollTopic),
                                y: selectedPoll.pollTopics.map((poll) => poll.votes),
                                type: 'bar',
                                marker: { color: 'red' },
                            },
                        ], layout: {
                            title: `Poll Results: ${selectedPoll.pollName}`,
                            xaxis: { title: 'Poll Topics' },
                            yaxis: { title: 'Votes' },
                        } })] })), _jsx("button", { onClick: () => navigate('/dashboard', { state: { username: `${username}` } }), children: "Dashboard" })] }));
};
export default PastPollsGraph;
