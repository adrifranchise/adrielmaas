// src/components/Extras.jsx
import React from 'react';

export default function Extras() {
  const items = [
    { label: 'The Unlearning Series Overview', path: '/unlearning' },
    { label: 'Game Discovery Tools (In Progress)', path: '/tools' },
    { label: 'Recent Quote / Link', path: '#quote' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🧭 Extras / Anchors</h2>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.label}>
            <a href={i.path} className="hover:text-phosphor-green transition">
              • {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

