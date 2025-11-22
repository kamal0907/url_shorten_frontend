const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

async function request(path, init) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`
  const res = await fetch(url, init)
  if (!res.ok) {
    const ct = res.headers.get('content-type') || ''
    const body = ct.includes('application/json') ? await res.json().catch(() => null) : await res.text().catch(() => null)
    const msg = (body && body.error) || (typeof body === 'string' ? body : JSON.stringify(body)) || `HTTP ${res.status}`
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  // For 204 No Content return null
  if (res.status === 204) return null
  return res.json().catch(() => null)
}

export function createShortUrl(payload) {
  return request('/links/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function fetchShortUrls() {
  return request('/links/', { method: 'GET' })
}

export function fetchLinkByCode(code) {
  return request(`/links/${encodeURIComponent(code)}`, { method: 'GET' })
}

export function deleteShortUrl(code) {
  return request(`/links/${encodeURIComponent(code)}`, { method: 'DELETE' })
}

export async function health() {
  try {
    const res = await fetch(`${BASE.replace('/api', '')}/healthz`)
    if (!res.ok) return { ok: false }
    return res.json()
  } catch (e) {
    return { ok: false }
  }
}
