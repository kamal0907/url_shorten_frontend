'use client'
import React from 'react'
import ShortenForm from '@/components/ShortenForm'
import UrlList from '@/components/UrlList'

export default function Page() {
  const [refreshKey, setRefreshKey] = React.useState(0)
  return (
    <div className="space-y-8">
      <section className="text-center py-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
          Shorten Your Links
        </h2>
        <p className="text-lg text-white/90 drop-shadow">Fast, simple, and beautiful URL shortening</p>
      </section>

      <section className="animate-slide-in">
        <ShortenForm onCreated={() => setRefreshKey(k => k + 1)} />
      </section>

      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <UrlList key={String(refreshKey)} />
      </section>
    </div>
  )
}
