import { health } from '@/lib/api'

export default async function Page() {
  const data = await health()
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">Health</h2>
      <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
