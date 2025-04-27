// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-blue text-non-photo-blue py-6 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-4">
          <a href="mailto:you@adrielmaas.com" className="hover:text-phosphor-green">contact</a>
          <a href="https://github.com/adrifranchise" target="_blank" rel="noopener noreferrer" className="hover:text-phosphor-green">GitHub</a>
          <a href="https://bsky.app/profile/adriel.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-phosphor-green">Bluesky</a>
          <span className="hover:text-phosphor-green cursor-default">Now Playing</span>
        </div>
        <div>
          © {new Date().getFullYear()} adrielmaas
        </div>
      </div>
    </footer>
  );
}

