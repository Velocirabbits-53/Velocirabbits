import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';
function Confirmation() {
    //can this be deleted?
    // const [userName, setUserName] = useState('username');
    const navigate = useNavigate();
    // bringing data from: dashboard?
    const location = useLocation();
    const data = location.state;
    // deconstructed data
    const { username, code } = data;
    // TODO Create where users click Vote Now
    // function sends the user's response to the server when they click the button (Create Poll)
    // create a new poll record in mongoose w/ fetch post req
    const voteNowHandleButtonClick = () => {
        navigate('/voting-page', {
            state: { username: `${username}`, code: `${code}` },
        });
    };
    return (_jsxs("div", { children: [_jsxs("h1", { children: ["Congrats, ", username] }), _jsx("p", { children: "Your poll code is ready to be shared! " }), _jsxs("p", { children: [" ", code, " "] }), _jsx("button", { onClick: () => voteNowHandleButtonClick(), children: "Vote Now!" }), _jsx("button", { onClick: () => navigate('/dashboard', {
                    state: { username: `${username}`, code: `${code}` },
                }), children: "Dashboard" })] }));
}
// export VotingPage component so that it can be used in other files
export default Confirmation;
