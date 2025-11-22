import { fetchLinkByCode } from '@/lib/api'
import StatsCard from '@/components/StatsCard'

export default async function Page({ params }) {
  const { code } = await params
  try {
    const res = await fetchLinkByCode(code)
    // normalize
    const data = {
      code: res.code,
      targetUrl: res.target_url || res.targetUrl,
      clicks: res.clicks,
      createdAt: res.created_at,
      lastClicked: res.last_clicked
    }
    return <div className="space-y-4"><StatsCard data={data} /></div>
  } catch (e) {
    return <div className="p-4 text-red-600">Not found</div>
  }
}
