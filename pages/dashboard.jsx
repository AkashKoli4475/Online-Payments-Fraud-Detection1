import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dashboard(){
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeThreats, setActiveThreats] = useState(12)
  const [openIncidents, setOpenIncidents] = useState(5)
  const [riskScore, setRiskScore] = useState(72)
  const [securityHealth, setSecurityHealth] = useState(88)
  const [feed, setFeed] = useState([
    {id:1, text: 'New IoC: 45.33.12.9 matched', sev: 'high'},
    {id:2, text: 'Suspicious login: user@shopmore from RU', sev: 'medium'},
  ])

  // Simple auth guard: require `ng_user` in localStorage
  useEffect(()=>{
    try{
      const raw = localStorage.getItem('ng_user')
      if (!raw) return router.replace('/login')
      setUser(JSON.parse(raw))
    }catch(e){
      router.replace('/login')
    }
  },[])

  // Simulate live updates
  useEffect(()=>{
    const id = setInterval(()=>{
      setActiveThreats(v=>Math.max(0, v + (Math.random()>0.6?1:-1)))
      setOpenIncidents(v=>Math.max(0, v + (Math.random()>0.7?1:0)))
      setRiskScore(v=>Math.min(100, Math.max(0, Math.round(v + (Math.random()-0.5)*4))))
      setSecurityHealth(v=>Math.min(100, Math.max(0, Math.round(v + (Math.random()-0.5)*3))))
      // push feed
      setFeed(f=>[
        {id:Date.now(), text: ['IOC matched','New exploit chatter','Phishing campaign detected'][Math.floor(Math.random()*3)] + ' • ' + Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255), sev: ['low','medium','high'][Math.floor(Math.random()*3)]},
        ...f.slice(0,6)
      ])
    }, 3000)
    return ()=>clearInterval(id)
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('ng_user')
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Executive Dashboard</h1>
            <div className="text-sm text-gray-600">Welcome back{user?`, ${user.name}`:''}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-indigo-600">Home</Link>
            <button onClick={handleLogout} className="px-3 py-2 bg-white border rounded">Logout</button>
          </div>
        </header>

        {/* Top search + actions */}
        <div className="bg-white border rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <label className="sr-only">Search IOC</label>
              <div className="flex gap-2">
                <input id="dash-search" placeholder="Search IP, Domain, Hash, CVE..." className="flex-1 p-3 border rounded-l-lg" />
                <button onClick={() => {
                  const q = document.getElementById('dash-search').value.trim();
                  if (q) router.push(`/ioc-lookup?query=${encodeURIComponent(q)}`)
                }} className="px-4 bg-indigo-600 text-white rounded-r-lg">Search IOC</button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Link href="/threat-analysis" className="px-4 py-2 bg-indigo-600 text-white rounded">Analyze Threat</Link>
              <Link href="/threat-analysis" className="px-4 py-2 bg-white border rounded">Upload Log</Link>
              <Link href="/reports" className="px-4 py-2 bg-white border rounded">Generate Report</Link>
              <Link href="/threat-hunting" className="px-4 py-2 bg-white border rounded">New Investigation</Link>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-2xl bg-white border">
            <div className="text-sm text-gray-500">Active Threats</div>
            <div className="text-3xl font-bold">{activeThreats}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border">
            <div className="text-sm text-gray-500">Open Incidents</div>
            <div className="text-3xl font-bold">{openIncidents}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border">
            <div className="text-sm text-gray-500">Security Health</div>
            <div className="text-3xl font-bold">{securityHealth}%</div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-4 rounded-2xl bg-white border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500">Risk Score</div>
                <div className="text-2xl font-bold">{riskScore}</div>
              </div>
              <div>
                <Link href="/dashboard/reports" className="text-sm text-indigo-600">View reports</Link>
              </div>
            </div>

            <div className="h-48 bg-gradient-to-r from-indigo-50 to-white rounded p-4 text-sm text-gray-700">Interactive widgets and charts will be here in the full app.
            </div>
          </div>

          <aside className="p-4 rounded-2xl bg-white border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Live Threat Feed</div>
              <div className="text-xs text-gray-500">Real-time</div>
            </div>
            <div className="space-y-3 max-h-48 overflow-auto">
              {feed.map(item=> (
                <div key={item.id} className="p-3 rounded-lg border bg-white/50 flex items-start gap-3">
                  <div className={`w-2 h-8 rounded ${item.sev==='high'?'bg-red-500': item.sev==='medium'? 'bg-yellow-400':'bg-green-400'}`}></div>
                  <div className="text-sm text-gray-700">{item.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm">
              <Link href="/dashboard/threat-feed" className="text-indigo-600">Open full feed</Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
