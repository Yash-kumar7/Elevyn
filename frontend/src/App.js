import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Donate from './components/Donate';
import Home from './components/Home'; 
import ContentOffers from './components/ContentOffers';
import VideoAccess from './components/VideoAccess';
import CrowdfundingOffers from './components/CrowdfundingOffers';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={token ? <Donate token={token} /> : <Login setToken={setToken} />} />
          <Route path="/content-offers" element={<ContentOffers />} />
          <Route path="/crowdfunding" element={<CrowdfundingOffers />} />
          <Route path="/video-access" element={<VideoAccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
