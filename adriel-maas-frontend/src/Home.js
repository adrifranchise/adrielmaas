// src/Home.js
import React from 'react';
import useSWR from 'swr';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Card from './components/Card';
import SignalBoost from './components/SignalBoost';
import Extras from './components/Extras';
import Footer from './components/Footer';

const fetcher = url => fetch(url).then(r => r.json());

export default function Home({ ramblings = [], reviews = [] }) {
  const { data: signalData } = useSWR(
    `${process.env.REACT_APP_API_BASE_URL}/api/signal?cause=Labor Rights`,
    fetcher,
    { refreshInterval: 3600000 }
  );

  const items = [...ramblings, ...reviews]
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const heroItem = items[0] || {};

  return (
    <div className="bg-night text-non-photo-blue font-['Courier_Prime'] min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Hero item={heroItem} />

        <section className="px-4 py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">latest ramblings</h2>
            <div className="space-y-6">
              {ramblings.slice(0, 2).map(r => (
                <Card key={r.id} item={r} type="rambling" />
              ))}
            </div>
            <a href="/ramblings" className="text-phosphor-green hover:underline mt-4 block">
              All Ramblings →
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">from the reviewDB</h2>
            <div className="space-y-6">
              {reviews.slice(0, 2).map(r => (
                <Card key={r.id} item={r} type="review" />
              ))}
            </div>
            <a href="/reviewDB" className="text-phosphor-green hover:underline mt-4 block">
              View Full reviewDB →
            </a>
          </div>
        </section>

        <section className="px-4 py-10 max-w-6xl mx-auto">
          <SignalBoost initialCause="Labor Rights" data={signalData} />
        </section>

        <section className="px-4 py-10 max-w-6xl mx-auto">
          <Extras />
        </section>
      </main>
      <Footer />
    </div>
  );
}

