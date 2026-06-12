import React from 'react'
import Link from 'next/link'

export default function Intelligence(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Threat Intelligence Center</h1>
        <p className="mt-2 text-gray-600">IOC Database — search IP, domain, URL, hash or threat actor.</p>
        <div className="mt-6 p-4 bg-white border rounded">
          <input placeholder="Search IP/Domain/Hash" className="w-full p-3 border rounded" />
        </div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
