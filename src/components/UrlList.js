'use client'
import React, { useEffect, useState } from 'react'
import { fetchShortUrls, deleteShortUrl } from '@/lib/api'

export default function UrlList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchShortUrls()
      // backend returns rows array directly
      const list = Array.isArray(res) ? res : (res?.data || [])
      // Map target_url -> targetUrl for consistency
      const normalized = list.map(i => ({
        code: i.code,
        targetUrl: i.target_url || i.targetUrl,
        shortUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/${i.code}`,
        clicks: i.clicks,
        createdAt: i.created_at || i.createdAt,
        lastClicked: i.last_clicked || i.lastClicked
      }))
      setItems(normalized)
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  async function remove(code) {
    if (!code) return alert('Missing code')
    if (!confirm('🗑️ Delete this short link?')) return
    try {
      await deleteShortUrl(code)
      setItems(s => s.filter(it => it.code !== code))
    } catch (err) {
      alert('❌ Delete failed: ' + (err.message || 'error'))
    }
  }

  if (loading) {
    return (
      <div className="card-modern text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600">Loading your links...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-modern border-2 border-red-200 bg-red-50">
        <p className="text-red-700 font-medium">❌ {error}</p>
      </div>
    )
  }

  return (
    <div className="card-modern">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Your Short Links</h2>

      {items.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
          <p className="text-gray-500 text-lg">🔗 No links yet. Create your first one above!</p>
        </div>
      )}

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div
            key={it.code}
            className="bg-gradient-to-br from-white to-indigo-50/30 p-5 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover-lift"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <a
                  href={it.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-bold text-indigo-600 hover:text-indigo-700 truncate block mb-1 hover:underline"
                >
                  🔗 {it.shortUrl}
                </a>
                <div className="text-sm text-gray-600 truncate mb-3">
                  ➜ {it.targetUrl}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-xs font-semibold">
                    👁️ {it.clicks ?? 0} visits
                  </span>
                  {it.createdAt && (
                    <span className="text-xs text-gray-500">
                      📅 {new Date(it.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(it.shortUrl)
                    alert('✅ Copied to clipboard!')
                  }}
                  className="px-4 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all font-medium text-sm whitespace-nowrap hover:scale-105"
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => remove(it.code)}
                  className="px-4 py-2 bg-white border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium text-sm whitespace-nowrap hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
