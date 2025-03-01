import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreatePoll from './pages/CreatePoll';
import VoteNow from './pages/VotingPage';
import LoginPage from './pages/Login-Page';

// import PastPolls from './pages/PastPolls';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create-poll' element={<CreatePoll />} />
        <Route path='/vote-now' element={<VoteNow />} />
        <Route path='/login' element={<LoginPage />} />

        {/* <Route path='/past-polls' element={<PastPolls />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
