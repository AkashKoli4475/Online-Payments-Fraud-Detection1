import React from 'react'
import Link from 'next/link'

export default function Reports(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="mt-2 text-gray-600">Generate Daily / Weekly / Monthly / Executive reports. Export PDF / Excel.</p>
        <div className="mt-6 p-4 bg-white border rounded">Reports list and generator (mock)</div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
