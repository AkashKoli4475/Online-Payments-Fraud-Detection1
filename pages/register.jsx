import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register(){
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) return setError('Please fill all fields')
    if (password !== confirm) return setError('Passwords do not match')

    // Mock register: save minimal user to localStorage
    const user = { name, email, role: 'analyst', createdAt: Date.now() }
    try {
      localStorage.setItem('ng_user', JSON.stringify(user))
    } catch (err) {
      // ignore
    }

    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 border rounded-lg">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-3 border rounded" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded" />
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm Password" type="password" className="w-full p-3 border rounded" />
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded">Create Account</button>
        </form>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-4 text-sm">Already have an account? <Link href="/login" className="text-indigo-600">Login</Link></div>
      </div>
    </div>
  )
}
