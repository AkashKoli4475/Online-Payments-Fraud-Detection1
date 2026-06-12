import React, { useState } from 'react'
import Link from 'next/link'

export default function ThreatAnalysis(){
  const [netFileContent, setNetFileContent] = useState('')
  const [securityFileContent, setSecurityFileContent] = useState('')
  const [emailText, setEmailText] = useState('')
  const [emailResult, setEmailResult] = useState(null)
  const [netResult, setNetResult] = useState(null)

  const readFile = (file, setter) => {
    if (!file || !(file instanceof Blob)) {
      return
    }
    const r = new FileReader()
    r.onload = (e) => setter(e.target.result)
    r.readAsText(file)
  }

  const analyzeEmail = () => {
    const t = emailText.toLowerCase()
    let score = 0
    if (t.includes('click') || t.includes('claim') || t.includes('reward')) score += 0.6
    if (t.includes('http') || t.includes('https')) score += 0.2
    if (t.includes('urgent') || t.includes('verify')) score += 0.15
    const prob = Math.min(0.99, score)
    setEmailResult({prob: Math.round(prob*100), risk: prob>0.7? 'High' : prob>0.4? 'Medium':'Low'})
  }

  const analyzeNetwork = () => {
    const text = netFileContent || securityFileContent
    if (!text) return setNetResult({error:'No file content'})
    // naive IOC count: count occurrences of '185.220' as suspicious
    const matches = (text.match(/185\.220/g)||[]).length
    const suspicious = matches > 0
    setNetResult({suspicious, matches, summary: `Found ${matches} suspicious IP references`})
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Threat Analysis</h1>
        <div className="p-4 bg-white border rounded">
          <h3 className="font-semibold">Upload Network Log</h3>
          <p className="text-sm text-gray-500">Supported: CSV, JSON, TXT</p>
          <input className="mt-3" type="file" accept=".csv,.json,.txt" onChange={e=>readFile(e.target.files[0], setNetFileContent)} />
          <div className="mt-3 text-sm text-gray-700">{netFileContent? 'Loaded file content.' : 'No file loaded'}</div>
          <button onClick={analyzeNetwork} className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">Analyze Network Log</button>
          {netResult && <div className="mt-3 p-3 bg-gray-50 rounded">{netResult.error? netResult.error : netResult.summary}</div>}
        </div>

        <div className="p-4 bg-white border rounded">
          <h3 className="font-semibold">Upload Security Logs</h3>
          <p className="text-sm text-gray-500">Windows Event Logs, Linux Logs, Firewall Logs</p>
          <input className="mt-3" type="file" accept=".log,.txt,.json" onChange={e=>readFile(e.target.files[0], setSecurityFileContent)} />
          <div className="mt-3 text-sm text-gray-700">{securityFileContent? 'Loaded file content.' : 'No file loaded'}</div>
          <button onClick={analyzeNetwork} className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">Analyze Security Logs</button>
        </div>

        <div className="p-4 bg-white border rounded">
          <h3 className="font-semibold">Analyze Email for Phishing</h3>
          <p className="text-sm text-gray-500">Paste email content below</p>
          <textarea value={emailText} onChange={e=>setEmailText(e.target.value)} className="w-full p-3 border rounded mt-3 h-36" placeholder="Dear User, Click here to claim reward..." />
          <div className="flex gap-2 mt-3">
            <button onClick={analyzeEmail} className="px-4 py-2 bg-indigo-600 text-white rounded">Analyze Email</button>
            <Link href="/dashboard" className="px-4 py-2 bg-white border rounded">Back to Dashboard</Link>
          </div>
          {emailResult && <div className="mt-3 p-3 bg-gray-50 rounded">Phishing Probability: <strong>{emailResult.prob}%</strong> — Risk: <strong>{emailResult.risk}</strong></div>}
        </div>

      </div>
    </div>
  )
}
