import { fetchLinkByCode } from '@/lib/api'
import Link from 'next/link'

export default async function Page({ params }) {
  const { code } = await params
  try {
    const res = await fetchLinkByCode(code)
    const data = { code: res.code, targetUrl: res.target_url || res.targetUrl }
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-2">Preview for {code}</h2>
        <div>Target: <a href={data.targetUrl} className="text-indigo-600">{data.targetUrl}</a></div>
        <div className="mt-3"><Link href={data.targetUrl ?? '/'} className="px-3 py-2 bg-indigo-600 text-white rounded">Open</Link></div>
      </div>
    )
  } catch (e) {
    return <div className="p-4 text-red-600">Not found</div>
  }
}
