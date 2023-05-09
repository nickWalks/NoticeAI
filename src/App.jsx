import React from 'react';
import './App.css';
import Publisher from './Publisher';
import Receiver from './Receiver';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/publish" element={<Publisher />} />
          <Route path="/" element={<Receiver />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
