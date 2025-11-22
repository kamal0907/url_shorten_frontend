'use client'
import React from 'react'

export default function StatsCard({ data }) {
  if (!data) return null
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">Stats for {data.code}</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <div>Target: <a className="text-indigo-600" href={data.targetUrl} target="_blank" rel="noreferrer">{data.targetUrl}</a></div>
        <div>Clicks: {data.clicks ?? 0}</div>
        <div>Created: {data.createdAt ? new Date(data.createdAt).toLocaleString() : '—'}</div>
        <div>Last clicked: {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : '—'}</div>
      </div>
    </div>
  )
}
