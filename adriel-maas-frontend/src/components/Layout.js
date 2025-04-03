import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="font-mono bg-amber-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
