import React from 'react'
import Link from 'next/link'

export default function ThreatFeed(){
  const sample = [
    {id:1, name:'Ransomware Campaign', severity:'Critical', source:'DarkWeb', time:'5m ago', status:'Active'},
    {id:2, name:'Phishing Domain', severity:'High', source:'OSINT', time:'12m ago', status:'Investigating'},
  ]
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Threat Feed</h1>
        <div className="mt-6 space-y-4">
          {sample.map(s=> (
            <div key={s.id} className="p-4 bg-white border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-500">{s.source} • {s.time}</div>
              </div>
              <div className="text-right">
                <div className="text-sm">Severity: <strong>{s.severity}</strong></div>
                <div className="text-sm">Status: {s.status}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
