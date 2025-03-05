import './App.css';
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/pastpolls' element={<PastPolls />} />
        <Route path='/create-poll' element={<CreatePoll />} />
        <Route path='/confirmation' element={<Confirmation />} />
        <Route path='/voting-page' element={<VotingPage />} />
        <Route path='/results' element ={<Results />} />
        <Route path ='/pastPollsGraph' element = {<PastPollsGraph/>} />
        <Route path ='/resultsGraph' element = {<ResultsGraph/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
