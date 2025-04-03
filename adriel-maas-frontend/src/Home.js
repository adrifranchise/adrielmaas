import React, { useEffect } from 'react';

// --- Placeholder Data ---
// Updated based on your input. Replace descriptions and links.
// In a real app, this would come from your Python backend API.
const featuredContent = [
  {
    id: 1,
    title: 'The Players Almanac',
    description: 'Exploring insights and strategies...',
    link: '#'
  },
  {
    id: 2,
    title: 'The Thought Mosaic',
    description: 'Connecting disparate ideas...',
    link: '#'
  },
  {
    id: 3,
    title: 'Placeholder Project',
    description: 'Another thing I\'m working on...',
    link: '#'
  },
];

// --- Reusable Tile Component ---
// Displays title, description, and a link for featured content
function ContentTile({ title, description, link }) {
  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      <a href={link} className="text-blue-600 hover:underline">Learn More →</a>
    </div>
  );
}

// --- Header Component ---
function Header() {
  return (
    <header className="py-12 text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to my mind</h1>
    </header>
  );
}

// --- Navigation Component ---
function Navigation() {
  const navItems = [
    { name: 'Ramblings', path: '/ramblings' },
    { name: 'Projects', path: '/projects' },
    { name: 'The Man Behind The Site', path: '/about' },
  ];
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-6 justify-center">
        {navItems.map((item) => (
          <li key={item.name}>
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
      <h2 className="text-2xl font-bold mb-6 text-center">What I'm Working On</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <h2 className="text-2xl font-bold mb-4 text-center">About Me Snippet</h2>
      <p className="text-gray-700 max-w-2xl mx-auto text-center mb-6">
        [Placeholder for a quick bio, timeline snippet, or interesting fact about the person behind the site. This section gives visitors a glimpse and encourages them to visit the full 'About' page.]
      </p>
      <div className="text-center">
        <a href="/about" className="text-blue-600 hover:underline">Meet The Man Behind The Site...</a>
      </div>
    </section>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <a href="#" className="text-blue-300 hover:underline mr-4">Bluesky</a>
            <a href="/contact" className="text-blue-300 hover:underline">Contact (Placeholder)</a>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Your Name/Handle</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Home Component ---
export default function Home() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="font-mono bg-amber-50 min-h-screen flex flex-col">
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
