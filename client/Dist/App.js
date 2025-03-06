import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../public/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreatePoll from './pages/CreatePoll';
import VotingPage from './pages/VotingPage';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login-Page';
import Register from './pages/Register';
import PastPolls from './pages/PastPolls';
import Results from './pages/Results';
import PastPollsGraph from './pages/PastPolls-Graph';
import ResultsGraph from './pages/Results-Graph';
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Login, {}) }), _jsx(Route, { path: '/register', element: _jsx(Register, {}) }), _jsx(Route, { path: '/dashboard', element: _jsx(Dashboard, {}) }), _jsx(Route, { path: '/pastpolls', element: _jsx(PastPolls, {}) }), _jsx(Route, { path: '/create-poll', element: _jsx(CreatePoll, {}) }), _jsx(Route, { path: '/confirmation', element: _jsx(Confirmation, {}) }), _jsx(Route, { path: '/voting-page', element: _jsx(VotingPage, {}) }), _jsx(Route, { path: '/results', element: _jsx(Results, {}) }), _jsx(Route, { path: '/pastPollsGraph', element: _jsx(PastPollsGraph, {}) }), _jsx(Route, { path: '/resultsGraph', element: _jsx(ResultsGraph, {}) })] }) }));
}
export default App;
