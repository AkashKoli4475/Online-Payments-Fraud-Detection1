import React, { useState } from 'react'
import Link from 'next/link'

export default function ThreatHunting(){
  const [from, setFrom] = useState('2026-06-10')
  const [to, setTo] = useState('2026-06-12')
  const [severity, setSeverity] = useState('any')
  const [results, setResults] = useState([])

  const runHunt = () => {
    // simulate results
    const sample = [
      {id:1, time:'2026-06-12T08:30:00Z', type:'Suspicious Login', severity:'High', asset:'Server-01'},
      {id:2, time:'2026-06-12T07:10:00Z', type:'IOC Match', severity:'Medium', asset:'Workstation-12'},
    ]
    setResults(sample.filter(r=> severity==='any' || r.severity.toLowerCase()===severity))
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Threat Hunting</h1>
        <div className="p-4 bg-white border rounded grid md:grid-cols-4 gap-3">
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 border rounded" />
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 border rounded" />
          <select value={severity} onChange={e=>setSeverity(e.target.value)} className="p-2 border rounded">
            <option value="any">Any Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="flex gap-2">
            <button onClick={runHunt} className="px-4 py-2 bg-indigo-600 text-white rounded">Run Hunt</button>
            <button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(results))}} className="px-4 py-2 bg-white border rounded">Export Results</button>
          </div>
        </div>

        <div className="p-4 bg-white border rounded">
          <h3 className="font-semibold">Results</h3>
          <div className="mt-3 space-y-2">
            {results.length===0 && <div className="text-sm text-gray-500">No results. Run a hunt to populate.</div>}
            {results.map(r=> (
              <div key={r.id} className="p-3 border rounded flex justify-between">
                <div>
                  <div className="font-semibold">{r.type}</div>
                  <div className="text-sm text-gray-500">{r.asset} • {r.time}</div>
                </div>
                <div className="text-sm">{r.severity}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
