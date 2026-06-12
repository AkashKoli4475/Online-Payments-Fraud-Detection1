import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function IOCLookup(){
  const router = useRouter()
  const qParam = router.query.query || ''
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)

  useEffect(()=>{
    if (qParam) setQuery(qParam)
  },[qParam])

  const doSearch = () => {
    const q = (query||'').trim()
    if (!q) return
    // naive simulation
    if (q === '8.8.8.8') return setResult({status:'Safe', details:'Public DNS'})
    if (q.includes('185.220')) return setResult({status:'Malicious', details:'Known C2 IP from feeds'})
    if (q.match(/^[0-9\.]+$/)) return setResult({status:'Unknown', details:'No matches in local DB'})
    if (q.includes('.')) return setResult({status:'Unknown', details:'No matches in local DB'})
    setResult({status:'Unknown', details:'No matches in local DB'})
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">IOC Lookup</h1>
        <div className="p-4 bg-white border rounded">
          <div className="flex gap-2">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="IP, Domain, URL or Hash" className="flex-1 p-3 border rounded-l" />
            <button onClick={doSearch} className="px-4 bg-indigo-600 text-white rounded-r">Search IOC</button>
          </div>
          {result && <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-semibold">Result: {result.status}</div>
            <div className="text-sm text-gray-600 mt-1">{result.details}</div>
          </div>}
        </div>
        <div className="mt-4"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
