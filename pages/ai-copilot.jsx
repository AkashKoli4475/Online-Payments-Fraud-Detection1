import React from 'react'
import Link from 'next/link'

export default function AICopilot(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">AI Security Copilot</h1>
        <p className="mt-2 text-gray-600">Ask why an alert was generated and receive context, root cause and recommended actions.</p>
        <div className="mt-6 p-4 bg-white border rounded">Chat UI (mock) — try: "Why was this alert generated?"</div>
        <div className="mt-6"><Link href="/dashboard">← Back to dashboard</Link></div>
      </div>
    </div>
  )
}
