import React from 'react'
import Link from 'next/link'

export default function Integrations(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Integrations Marketplace</h1>
        <p className="mt-2 text-gray-600">Connect SIEM, EDR, Firewalls, Cloud platforms, Email security, IAM.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded">SIEM connectors</div>
          <div className="p-4 bg-white border rounded">EDR connectors</div>
          <div className="p-4 bg-white border rounded">Cloud connectors</div>
        </div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
