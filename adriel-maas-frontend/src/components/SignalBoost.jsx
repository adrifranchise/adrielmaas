// src/components/SignalBoost.jsx
import React, { useState } from 'react';

export default function SignalBoost({ initialCause, data }) {
  const [cause, setCause] = useState(initialCause);
  const { news = [], bluesky = [] } = data || {};

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📡 Signal Boost</h2>
      <select
        className="mb-6 p-2 bg-night border border-mountbatten-pink rounded"
        value={cause}
        onChange={e => setCause(e.target.value)}
      >
        {['Labor Rights','Mental Health','Tech Ethics'].map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div className="flex flex-col md:flex-row gap-8">
        {/* news pane */}
        <div className="flex-1 space-y-4">
          {news.map((n,i) => (
            <div key={i} className="p-4 bg-slate-blue rounded">
              <a href={n.url} className="font-semibold hover:underline">{n.title}</a>
              <div className="text-sm opacity-70">{n.source} · {new Date(n.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        {/* bluesky pane */}
        <div className="flex-1 space-y-4">
          {bluesky.map((b,i) => (
            <div key={i} className="p-4 bg-slate-blue rounded">
              <div className="text-sm opacity-70">@{b.handle}</div>
              <p className="mt-1">{b.text}</p>
              <a href={b.url} className="text-phosphor-green hover:underline text-sm">open post →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
);
}

