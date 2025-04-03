import React, { useEffect } from 'react';

// --- Placeholder Data ---
// Updated based on your input. Replace descriptions and links.
// In a real app, this would come from your Python backend API.
const featuredContent = [
  {
    id: 1,
    title: 'The Players Almanac',
    description: 'Connecting gamers for high class reviews',
    link: 'www.theplayersalmanac.com'
  },
  {
    id: 2,
    title: 'The Thought Mosaic',
    description: 'what makes a person? their heart or their brain?',
    link: 'www.thethoughtmosaic.com'
  },
  {
    id: 3,
    title: 'coming soon...',
    description: 'coming soon',
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
      <h1 className="text-4xl font-bold text-gray-800 mb-4">welcome to my digital mind</h1>
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
      <h2 className="text-2xl font-bold mb-4 text-center">quick blurb</h2>
      <p className="text-gray-700 max-w-2xl mx-auto text-center mb-6">
        i am a gamer, writer, techy, nerd and most importantly a person. i believe your voice is the most powerful thing you have so this is my attempt to use it.
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
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <a href="#" className="text-blue-300 hover:underline mr-4">Bluesky</a>
            <a href="/contact" className="text-blue-300 hover:underline">contact (not yet)</a>
          </div>
          <div>
            <p>© {new Date().getFullYear()} @adrielmaas</p>
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
