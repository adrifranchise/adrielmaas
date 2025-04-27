// src/components/Card.jsx
import React from 'react';

export default function Card({ item, type }) {
  return (
    <article className="bg-night p-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border border-mountbatten-pink">
      <h3 className="text-xl font-semibold text-slate-blue mb-1">
        {type === 'review' ? item.gameTitle : item.title}
      </h3>
      <div className="text-sm opacity-70 mb-2">
        {type === 'review'
          ? `${item.platform} · ${item.hoursPlayed}h`
          : new Date(item.date).toLocaleDateString()}
      </div>
      <p className="text-non-photo-blue line-clamp-3 mb-3">{item.excerpt}</p>
      <a
        href={type === 'review' ? `/reviewDB/${item.id}` : `/ramblings/${item.id}`}
        className="underline text-phosphor-green hover:text-white transition"
      >
        read →
      </a>
    </article>
  );
}

