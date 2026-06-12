import React from 'react'
import Link from 'next/link'

export default function How(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">How it works</h1>
        <p className="mt-4 text-gray-600">Step-by-step flow from data collection to response.</p>
        <ol className="mt-6 list-decimal ml-6 space-y-3">
          <li><strong>Collect Data:</strong> Ingest logs, feeds and sensors.</li>
          <li><strong>AI Analysis:</strong> Enrich, correlate and score signals.</li>
          <li><strong>Threat Detection:</strong> Identify anomalies and IOCs.</li>
          <li><strong>Risk Assessment:</strong> Prioritize based on impact and confidence.</li>
          <li><strong>Alert & Response:</strong> Trigger playbooks and notify teams.</li>
        </ol>
        <div className="mt-6"><Link href="/">← Back home</Link></div>
      </div>
    </div>
  )
}
