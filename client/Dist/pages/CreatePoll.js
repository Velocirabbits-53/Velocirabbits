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
//* Create Poll page after user clicked Create a new Poll
import { useState } from 'react';
// allows for user to be redirect to another page (back to Dashboard)
import { useNavigate, useLocation } from 'react-router-dom';
// TODO consider a delete button for extra topics created but no longer want ?
function CreatePoll() {
    const [pollName, setPollName] = useState('');
    // setting useState's initial val to be an arr of 3 objs
    const [pollTopics, setPollTopics] = useState([
        { pollTopic: '', votes: 0 },
        { pollTopic: '', votes: 0 },
        { pollTopic: '', votes: 0 },
    ]);
    // console.log('the value of pollName is ', pollName)
    // console.log('the value of pollTopics is', pollTopics)
    const navigate = useNavigate();
    // bringing data from: dashboard?
    const location = useLocation();
    const data = location.state;
    // deconstructed data
    const { username } = data;
    // TODO create add topics button
    const addTopicsHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        //
        setPollTopics([...pollTopics, { pollTopic: '', votes: 0 }]);
    });
    // TODO create post req to this route/controller
    // pollController.createPol
    // TODO Create Poll Button
    // function sends the user's response to the server when they click the button (Create Poll)
    // create a new poll record in mongoose w/ fetch post req
    const createPollHandleButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // failing tests to prevent empty poll names from being submitted
        if (!pollName.trim()) {
            console.error('Poll name cannot be empty');
            alert('Please enter a poll name before submitting.');
            return;
        }
        // this thing is also failing tests when i have no topics, so this fixes that
        const hasValidTopic = pollTopics.some((topic) => topic.pollTopic.trim() !== '');
        if (!hasValidTopic) {
            console.error('At least one topic must have a name');
            alert('Please enter at least one topic before submitting.');
            return;
        }
        try {
            const response = yield fetch('http://localhost:3000/user/create-poll', {
                // how client sends req to server
                // fetch(arg1: server url, arg2: object (req options))
                // fetch sends req to the server at the route (route) = arg1 | req to create a new poll
                // arg2: specifying that its a get req
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pollName: pollName, // poll name user is voting on (this should have been passed down from Dashboard)
                    // TODO set up for multiple topics
                    pollTopics: pollTopics, // name of topics user selected
                    createdBy: username,
                }),
            });
            // TODO user is to be redirected to Confirmation page for poll created
            // if request is successful, redirect user to Confirmation.jsx
            if (response.ok) {
                const code = yield response.text();
                // navigate('/confirmation' ,{ state: { username: `${username}`, code: `${code}`}});
                navigate('/confirmation', { state: { username, code } });
            }
            else {
                // otherwise log error
                console.error('Failed to Create Poll');
            }
        }
        catch (error) {
            // if something goes wrong in try block, error is logged
            console.error('Error:', error);
        }
    });
    // onChange handler for editing topics when being typed in
    // we must do this bc we have an arr of topics (objs) as our state, & we need to know which el in the arr they are editing
    // index is the input that's being edited, newVal is the val getting changed to
    const handlePollTopicChange = (index, newValue) => {
        // we're calling setPollTopics w/ prevPollTopics (func) to see the current state & use it to determine what the next state will be
        // normally we'd pass data that would be the next state, here we are passing a func to look at the current state, which wll help us make the dec on what the next state will be (the return val of this func is the next state)
        setPollTopics((prevPollTopics) => {
            // iterate over prev state using map to return an updated arr
            // what we want is to return an array with prior objs for inputs we are NOT editing, AND an updated obj with the input that we ARE editing
            return prevPollTopics.map((pollTopic, i) => {
                // checking if index (input we are editing) is = i (the index of the state we want to edit)
                if (index === i) {
                    // if yes, return an updated obj w/ the new input val
                    // (EX: if typing in 2nd box, index = 1, current iteration is on the 2nd el : i=1, so we update, & return the pollTopic obj w/ a new val)
                    return Object.assign(Object.assign({}, pollTopic), { pollTopic: newValue });
                }
                else {
                    // otherwise, the state's index does NOT match, and we return the current el unedited
                    // (EX: if typing in 2nd box, index = 1, current iteration is on the 1st el : i=0, so we don't update, instead we return the ce unchanged)
                    return pollTopic;
                }
            });
        });
    };
    return (_jsxs("div", { children: [_jsx("h1", { style: { display: 'inline' }, children: "Name Your Poll: " }), _jsx("input", { type: 'text', value: pollName, onChange: (e) => setPollName(e.target.value), placeholder: 'Type poll name', className: 'text-input' }), _jsxs("div", { children: [_jsx("p", { style: { display: 'inline' }, children: "Name of Topics: " }), _jsx("button", { onClick: addTopicsHandleButtonClick, children: "+" })] }), pollTopics.map((topic, index) => {
                return (
                // Adding the index to the div map, and not the inputs, since each input belongs to a different div.
                _jsx("div", { children: _jsx("input", { 
                        // key={index}
                        type: 'text', value: topic.pollTopic, onChange: (e) => handlePollTopicChange(index, e.target.value), placeholder: 'Type poll topic', className: 'text-input' }) }, index));
            }), _jsx("button", { onClick: createPollHandleButtonClick, children: "Create Poll" }), _jsxs("button", { onClick: () => navigate('/dashboard', { state: { username: `${username}` } }), children: [' ', "Dashboard", ' '] })] }));
}
// export CreatePoll component so that it can be used in other files
export default CreatePoll;
