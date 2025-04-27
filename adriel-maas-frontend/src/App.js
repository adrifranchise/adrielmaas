// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Projects from './Projects';
import Ramblings from './Ramblings';
import Admin from './Admin';

function App() {
  // state for API data
  const [ramblings, setRamblings] = useState([]);
  const [reviews, setReviews] = useState([]);

  // fetch when component mounts
  useEffect(() => {
    const base = process.env.REACT_APP_API_BASE_URL;
    Promise.all([
      fetch(`${base}/api/ramblings`).then(r => r.json()),
      fetch(`${base}/api/reviews`).then(r => r.json()),
    ])
    .then(([rams, revs]) => {
      setRamblings(rams);
      setReviews(revs);
    })
    .catch(err => console.error('fetch error', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
            path="/" 
                element={<Home ramblings={ramblings} reviews={reviews} />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ramblings" element={<Ramblings />} />
        <Route path="/ramblings/:id" element={<Ramblings />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={<Home ramblings={ramblings} reviews={reviews} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

