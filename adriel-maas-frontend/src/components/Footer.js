import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <a href="https://bluesky.app" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline mr-4">
              Bluesky
            </a>
            <Link to="/contact" className="text-blue-300 hover:underline">
              Contact
            </Link>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Your Name/Handle</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
