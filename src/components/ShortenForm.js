'use client'
import React, { useState } from 'react'
import { createShortUrl } from '@/lib/api'
import { isValidUrl, isValidCode } from '@/lib/validators'

export default function ShortenForm({ onCreated }) {
  const [target, setTarget] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!isValidUrl(target)) return setError('Enter a valid http(s) URL')
    if (code && !isValidCode(code)) return setError('Custom code must be 6–8 alphanumeric chars')

    setLoading(true)
    try {
      const res = await createShortUrl({ targetUrl: target, code: code || undefined })
      // your backend returns { message, data: { code, target_url... } }
      const data = res?.data || res
      const short = data?.target_url ? `${window.location.origin}/${data.code}` : (data?.shortUrl || null)
      setSuccess(short || `${window.location.origin}/${data.code}`)
      setTarget('')
      setCode('')
      if (typeof onCreated === 'function') onCreated()
    } catch (err) {
      setError(err.message || 'Create failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card-modern hover-lift">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Create Short Link</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔗 Paste your long URL
          </label>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="https://example.com/very/long/url..."
            className="input-modern"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ✏️ Custom code (optional)
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="mycustomcode (6-8 characters)"
            className="input-modern"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              '✨ Create Short Link'
            )}
          </button>
          <button
            type="button"
            onClick={() => { setTarget(''); setCode(''); setError(null); setSuccess(null) }}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
          <p className="text-sm font-medium text-red-700">❌ {error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl animate-fade-in">
          <p className="text-sm font-semibold text-green-800 mb-2">✅ Short URL Created!</p>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
            <a
              className="flex-1 text-indigo-600 font-medium hover:text-indigo-700 truncate"
              href={success}
              target="_blank"
              rel="noreferrer"
            >
              {success}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(success)
                alert('✅ Copied to clipboard!')
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 font-medium text-sm"
            >
              📋 Copy
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
