// src/Home.jsx
import React from 'react'
import useSWR from 'swr'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Card from './components/Card'
import SignalBoost from './components/SignalBoost'
import Extras from './components/Extras'
import Footer from './components/Footer'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home({ ramblings = [], reviews = [] }) {
  // fetch signal once per hour
  const { data: signalData } = useSWR(
    `${process.env.REACT_APP_API_BASE_URL}/api/signal?cause=Labor Rights`,
    fetcher,
    { refreshInterval: 3600000 }
  )

  // pick the most recent item
  const items = [...ramblings, ...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const heroItem = items[0] || {}

  return (
    <div className="flex flex-col min-h-screen bg-night text-non-photo-blue font-['Courier_Prime']">
      <Nav />

      {/* HERO */}
      <Hero item={heroItem} />

      {/* MAIN CONTENT */}
      <main className="flex-grow space-y-16 px-4 md:px-0 max-w-6xl mx-auto py-10">
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">latest ramblings</h2>
            <div className="space-y-6">
              {ramblings.slice(0, 2).map(r => (
                <Card key={r.id} item={r} type="rambling" />
              ))}
            </div>
            <a href="/ramblings" className="block mt-4 text-phosphor-green hover:underline">
              All Ramblings →
            </a>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">🎮 from the reviewDB</h2>
            <div className="space-y-6">
              {reviews.slice(0, 2).map(r => (
                <Card key={r.id} item={r} type="review" />
              ))}
            </div>
            <a href="/reviewDB" className="block mt-4 text-phosphor-green hover:underline">
              View Full reviewDB →
            </a>
          </div>
        </section>

        <section>
          <SignalBoost initialCause="Labor Rights" data={signalData} />
        </section>

        <section>
          <Extras />
        </section>
      </main>

      <Footer />
    </div>
  )
}

