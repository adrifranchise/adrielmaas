import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Ramblings from './Ramblings';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ramblings" element={<Ramblings />} />
        {/* Add a route for individual blog posts */}
        <Route path="/ramblings/:id" element={<Ramblings />} />
	{/* Admin route */}
        <Route path="/admin" element={<Admin />} />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

