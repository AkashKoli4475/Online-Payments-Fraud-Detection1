import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please enter email and password')

    try {
      const raw = localStorage.getItem('ng_user')
      if (!raw) {
        if (email === 'admin@neura.com' && password === 'admin123') {
          const adminUser = { name: 'Admin', email, role: 'admin', createdAt: Date.now() }
          localStorage.setItem('ng_user', JSON.stringify(adminUser))
          return router.push('/admin')
        }
        return setError('No account found. Please register.')
      }

      const user = JSON.parse(raw)
      if (user.email !== email) return setError('Invalid credentials')

      // success -> redirect
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Unexpected error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 border rounded-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded" />
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded">Sign in</button>
        </form>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-4 text-sm">No account? <Link href="/register" className="text-indigo-600">Register</Link></div>
      </div>
    </div>
  )
}
