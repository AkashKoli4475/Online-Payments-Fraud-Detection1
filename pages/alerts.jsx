import React from 'react'
import Link from 'next/link'

export default function Alerts(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Alerts</h1>
        <p className="mt-2 text-gray-600">Filter by severity and take actions (View / Assign / Resolve).</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border rounded">Critical alerts list (mock)</div>
          <div className="p-4 bg-white border rounded">High/Medium/Low alerts list (mock)</div>
        </div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
