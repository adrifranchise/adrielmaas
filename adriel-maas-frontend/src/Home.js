import React, { useState, useEffect, useRef } from 'react';
// Make sure to create and import a CSS file if using the CSS cursor method
// import './Home.css'; // <-- UNCOMMENT if using separate CSS file

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
  // Ensure link has protocol for external links
  const absoluteLink = link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('/')
    ? link
    : `https://${link}`;

  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      {/* Use target="_blank" for external links */}
      <a
        href={absoluteLink}
        className="text-blue-600 hover:underline"
        target={link.startsWith('/') || link.startsWith('#') ? '_self' : '_blank'}
        rel={link.startsWith('/') || link.startsWith('#') ? '' : 'noopener noreferrer'}
      >
        Learn More →
      </a>
    </div>
  );
}


function Header() {
  const [text, setText] = useState('');
  const fullText = "weelcome to my digital mind";
  const index = useRef(0);
  const typingSpeed = 100; // Adjust speed as needed (milliseconds)
  const cursorRef = useRef(null); // Ref for the cursor span

  useEffect(() => {
    index.current = 0;
    setText('');
    if (cursorRef.current) {
         cursorRef.current.style.display = 'inline-block'; // Ensure cursor is visible initially
    }

    const timerId = setInterval(() => {
      if (index.current < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(index.current));
        index.current += 1;
      } else {
        clearInterval(timerId); // Stop typing
        // Optional: Hide cursor when done typing
        if (cursorRef.current) {
          cursorRef.current.style.display = 'none';
        }
      }
    }, typingSpeed);

    return () => {
      clearInterval(timerId);
    };
  }, [fullText, typingSpeed]); // Dependencies

  return (
    <header className="py-12 text-center bg-gray-100">
       {/* Added min-h-[3rem] or similar based on text-4xl line height to prevent layout shift */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4 min-h-[3rem]">
        {text}
        {/* Add ref to cursor span */}
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
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-6 justify-center">
        {navItems.map((item) => (
          <li key={item.name}>
            {/* Ideally use Link from react-router-dom if using routing */}
            <a href={item.path} className="hover:text-blue-300 transition">{item.name}</a>
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
      <h2 className="text-2xl font-bold mb-6 text-center">works in the kitchen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"> {/* Added max-width and centering */}
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
    <section className="py-10 px-4 bg-amber-50">
      <h2 className="text-2xl font-bold mb-4 text-center">quick blurb</h2>
      <p className="text-gray-700 max-w-2xl mx-auto text-center mb-6">
        i am a gamer, writer, techy, nerd and most importantly an empathetic human being. i believe your voice is the most powerful thing you have so this is my attempt to use it.
      </p>
      <div className="text-center">
        <a href="/about" className="text-blue-600 hover:underline">meet the man behind the site...</a>
      </div>
    </section>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4"> {/* Added gap for wrapping */}
          <div className="flex gap-4"> {/* Grouped links */}
             { }
            <a href="https://bsky.app/profile/adrielmaas.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Bluesky</a>
            {/* Link to contact page or email/social */}
            <a href="/contact" className="text-blue-300 hover:underline">@adrielmaas</a>
          </div>
          <div className="text-right"> {/* Align copyright */}
            <p>© {new Date().getFullYear()} adrielmaas.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Home Component ---
export default function Home() {
  // Effect for loading the font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Cleanup function to remove the link when the component unmounts
    return () => {
      // Check if the link is still in the head before trying to remove it
      const existingLink = document.querySelector(`link[href="${link.href}"]`);
      if (existingLink) {
          document.head.removeChild(existingLink);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Using Courier Prime from the loaded font
    <div className="font-['Courier_Prime',_monospace] bg-amber-50 min-h-screen flex flex-col">
      <Navigation />
      <Header /> {/* Header now contains the animation logic */}
      <main className="flex-grow">
        <FeaturedContent />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  );
}

