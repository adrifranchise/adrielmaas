import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const navItems = [
    { name: 'Ramblings', path: '/ramblings' },
    { name: 'Projects', path: '/projects' },
    { name: 'The Man Behind The Site', path: '/about' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-300 transition">
          Home
        </Link>
        
        <ul className="flex space-x-6 justify-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="hover:text-blue-300 transition">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
