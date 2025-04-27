// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bg-slate-blue text-non-photo-blue p-4 sticky top-0 z-10 backdrop-blur-sm">
      <ul className="flex justify-center space-x-6">
        <li><Link to="/" className="hover:text-phosphor-green transition">home</Link></li>
        <li><Link to="/ramblings" className="hover:text-phosphor-green transition">ramblings</Link></li>
        <li><Link to="/reviewDB" className="hover:text-phosphor-green transition">reviewDB</Link></li>
        <li><Link to="/about" className="hover:text-phosphor-green transition">behind the site</Link></li>
      </ul>
    </nav>
);
}

