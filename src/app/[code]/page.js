import { redirect } from 'next/navigation'

export default async function Page({ params }) {
  const { code } = await params
  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'
  // Redirect to the backend's redirect endpoint which handles click counting
  redirect(`${BASE}/${code}`)
}
