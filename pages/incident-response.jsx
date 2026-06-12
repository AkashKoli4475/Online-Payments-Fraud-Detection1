import React from 'react'
import Link from 'next/link'

export default function IncidentResponse(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Incident Response</h1>
        <p className="mt-2 text-gray-600">Lifecycle: Detected → Investigating → Contained → Resolved</p>
        <div className="mt-6 p-4 bg-white border rounded">Incident timeline and playbook runner (mock)</div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
