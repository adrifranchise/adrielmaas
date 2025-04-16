// src/Home.js (or wherever your file is)
// Make sure necessary React imports are present
import React, { useState, useEffect, useRef } from 'react';
// Make sure necessary CSS is imported (e.g., index.css or App.css for cursor)
// import './index.css';

// --- Color Palette Roles ---
// Night: '#0D0A0B' (base background) -> bg-night
// Non Photo Blue: '#ACDDE7' (soft contrast text, links) -> text-non-photo-blue
// Slate Blue: '#725AC1' (headers, nav, buttons) -> text-slate-blue, bg-slate-blue
// Phosphor Green: '#39FF14' (accents, hover glows) -> text-phosphor-green, hover:text-phosphor-green
// Mountbatten Pink: '#9A7AA0' (subtle backgrounds, card borders) -> bg-mountbatten-pink, border-mountbatten-pink

// --- Placeholder Data ---
const featuredContent = [
  {
    id: 1,
    title: 'The Players Almanac',
    description: 'Connecting gamers for high class reviews',
    link: 'https://www.theplayersalmanac.com'
  },
  {
    id: 2,
    title: 'The Thought Mosaic',
    description: 'what makes a person? their heart or their brain?',
    link: 'https://www.thethoughtmosaic.com'
  },
  {
    id: 3,
    title: 'coming soon...',
    description: 'coming soon',
    link: '#'
  },
];

// --- Reusable Tile Component ---
function ContentTile({ title, description, link }) {
  const absoluteLink = link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('/')
    ? link
    : `https://${link}`;

  return (
    // Use Night for background, Mountbatten Pink for border
    <div className="bg-night p-4 rounded shadow-md hover:shadow-lg transition border border-mountbatten-pink">
      {/* Use Slate Blue for header text */}
      <h3 className="text-lg font-bold mb-2 text-slate-blue">{title}</h3>
      {/* Use Non Photo Blue for description text */}
      <p className="text-non-photo-blue mb-3">{description}</p>
      {/* Use Non Photo Blue for link text, Phosphor Green for hover */}
      <a
        href={absoluteLink}
        className="text-non-photo-blue hover:text-phosphor-green hover:underline"
        target={link.startsWith('/') || link.startsWith('#') ? '_self' : '_blank'}
        rel={link.startsWith('/') || link.startsWith('#') ? '' : 'noopener noreferrer'}
      >
        Learn More →
      </a>
    </div>
  );
}


// --- Header Component (with Typing Animation) ---
function Header() {
  const [text, setText] = useState('');
  const fullText = "welcome to my digital mind";
  const index = useRef(0);
  const typingSpeed = 100;
  const cursorRef = useRef(null);

  useEffect(() => {
    index.current = 0;
    setText('');
    if (cursorRef.current) {
         cursorRef.current.style.display = 'inline-block';
    }

    const timerId = setInterval(() => {
      if (index.current < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(index.current));
        index.current += 1;
      } else {
        clearInterval(timerId);
        if (cursorRef.current) {
          cursorRef.current.style.display = 'none';
        }
      }
    }, typingSpeed);

    return () => {
      clearInterval(timerId);
    };
    // Using v3 syntax requires adding the fullText variable to dependency array
  }, [fullText, typingSpeed]);

  return (
    // Use Mountbatten Pink for subtle background
    <header className="py-12 text-center bg-mountbatten-pink">
      {/* Use Slate Blue for header text */}
      <h1 className="text-4xl font-bold text-slate-blue mb-4 min-h-[3rem]">
        {text}
        {/* Cursor will inherit color, consider styling if needed */}
        <span ref={cursorRef} className="typing-cursor">|</span>
      </h1>
    </header>
  );
}


// --- Navigation Component ---
function Navigation() {
  const navItems = [
    { name: 'ramblings', path: '/ramblings' },
    { name: 'projects', path: '/projects' },
    { name: 'the man behind the site', path: '/about' },
  ];

  return (
    // Use Slate Blue for nav background, Non Photo Blue for text
    <nav className="bg-slate-blue text-non-photo-blue p-4">
      <ul className="flex space-x-6 justify-center">
        {navItems.map((item) => (
          <li key={item.name}>
             {/* Use Phosphor Green for link hover */}
            <a href={item.path} className="hover:text-phosphor-green transition">{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// --- Featured Content Section ---
function FeaturedContent() {
  return (
    <section className="py-10 px-4">
       {/* Use Slate Blue for header text */}
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-blue">works in the kitchen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuredContent.map((item) => (
          <ContentTile
            key={item.id}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}

// --- About Preview Section ---
function AboutPreview() {
  return (
    // Use Mountbatten Pink for subtle background
    <section className="py-10 px-4 bg-mountbatten-pink">
      {/* Use Slate Blue for header text */}
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-blue">quick blurb</h2>
      {/* Use Night for text on this background for contrast */}
      <p className="text-night max-w-2xl mx-auto text-center mb-6">
        i am a gamer, writer, techy, nerd and most importantly an empathetic human being. i believe your voice is the most powerful thing you have so this is my attempt to use it.
      </p>
      <div className="text-center">
        {/* Use Slate Blue for link, Phosphor Green for hover */}
        <a href="/about" className="text-slate-blue hover:text-phosphor-green hover:underline">meet the man behind the site...</a>
      </div>
    </section>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    // Use Slate Blue for background, Non Photo Blue for text
    <footer className="bg-slate-blue text-non-photo-blue py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-4">
             {/* Inherits text color, use Phosphor Green for hover */}
            <a href="https://bsky.app/profile/YOUR_BLUESKY_HANDLE.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-phosphor-green hover:underline">Bluesky</a>
            <a href="/contact" className="hover:text-phosphor-green hover:underline">@adrielmaas</a>
          </div>
          <div className="text-right">
            {/* Inherits text color */}
            <p>© {new Date().getFullYear()} @adrielmaas</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Home Component ---
export default function Home() {
  // Effect for loading the font (keep this)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.querySelector(`link[href="${link.href}"]`);
      if (existingLink) {
          document.head.removeChild(existingLink);
      }
    };
  }, []);

  return (
    // Use Night for base background, Non Photo Blue for default text
    <div className="font-['Courier_Prime',_monospace] bg-night text-non-photo-blue min-h-screen flex flex-col">
      <Navigation />
      <Header />
      <main className="flex-grow">
        <FeaturedContent />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  );
}
