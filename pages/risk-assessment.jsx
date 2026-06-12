import React from 'react'
import Link from 'next/link'

export default function RiskAssessment(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Risk Assessment</h1>
        <p className="mt-2 text-gray-600">Organization risk score, vulnerabilities, exposure and recommendations.</p>
        <div className="mt-6 p-4 bg-white border rounded">Risk dashboard (mock)</div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
