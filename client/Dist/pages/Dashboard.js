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
//* Dashboard / Homepage
import { useState } from 'react';
// need in order to direct user to another page (Create a New Poll page or Voting page)
import { useNavigate, useLocation } from 'react-router-dom';
function Dashboard() {
    // Using useState to store the user’s response
    const [codeName, setCodeName] = useState(''); // codeName stores code typed (stores id)
    // function that redirects user to Create a New Poll page or Voting page
    const navigate = useNavigate();
    // getting data from login
    const location = useLocation();
    const data = location.state;
    // deconstructed data
    const { username } = data;
    console.log('username:', data.username);
    // load user's name from login
    // useEffect(() => {
    //   const storedName = localStorage.getItem('userName');
    //   if (storedName) {
    //     setUserName(storedName); // Set the user's name
    //   }
    // }, []); // Runs once when the component loads
    // TODO Create New Poll Button
    const newPollHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // redirect user to createPoll.jsx
        navigate('/create-poll', {
            state: { username: `${username}` },
        });
    });
    // TODO Create Vote Now Button
    const voteNowHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // redirect user to VotingPage.jsx
        try {
            const response = yield fetch(`http://localhost:3000/user/results/${codeName}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);
            if (response.ok) {
                navigate('/voting-page', {
                    state: {
                        username: `${username}`,
                        code: `${codeName}`,
                    },
                });
            }
            else {
                alert('Please input a valid poll code');
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    // TODO Create View Past Polls Button
    const viewPastPollsHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // redirect user to past polls page
        navigate('/pastpolls', { state: { username: `${username}` } });
    });
    // everything in here gets rendered to the browser
    return (_jsxs("div", { children: [_jsx("h1", { children: " DASHBOARD" }), _jsxs("h2", { children: ["Hello, ", username] }), _jsx("button", { onClick: newPollHandleButtonClick, children: "Create a New Poll" }), _jsx("p", { children: " Vote on a Poll" }), _jsxs("div", { children: [_jsx("input", { type: 'text', value: codeName, onChange: (e) => setCodeName(e.target.value), placeholder: 'Enter Code', className: 'text-input' }), _jsx("button", { onClick: voteNowHandleButtonClick, children: "Vote Now!" })] }), _jsx("div", { children: _jsx("button", { onClick: viewPastPollsHandleButtonClick, children: "View Past Polls" }) })] }));
}
// export Dashboard component so that it can be used in other files
export default Dashboard;
