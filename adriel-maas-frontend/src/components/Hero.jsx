// src/components/Hero.jsx
import React from 'react'

export default function Hero({ item }) {
  const isReview = Boolean(item.platform)
  const base = 'relative h-64 md:h-96 bg-cover bg-center flex items-end'
  const colorBg = isReview
    ? 'bg-[var(--accent-switch)]'
    : !item.image
      ? 'bg-mountbatten-pink'
      : ''

  // runtime image styling
  const style = !isReview && item.image
    ? { backgroundImage: `url(${item.image})` }
    : {}

  return (
    <section className={`${base} ${colorBg}`} style={style}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-6 md:p-12 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          {item.title || item.gameTitle || 'welcome to my digital mind'}
        </h1>
        {item.excerpt && (
          <p className="line-clamp-2 mb-4 text-lg">{item.excerpt}</p>
        )}
        <a
          href={isReview ? `/reviewDB/${item.id}` : `/ramblings/${item.id}`}
          className="inline-block bg-phosphor-green text-night px-4 py-2 rounded-full hover:scale-105 transition"
        >
          read more →
        </a>
      </div>
    </section>
  )
}

