import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const DEFAULT_USERS = [
  { id: 'u1', name: 'Admin User', email: 'admin@neura.com', role: 'admin' },
  { id: 'u2', name: 'Security Analyst', email: 'analyst@neura.com', role: 'analyst' },
  { id: 'u3', name: 'Manager', email: 'manager@neura.com', role: 'manager' },
]

export default function Admin(){
  const [users, setUsers] = useState([])
  const [audit, setAudit] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('analyst')

  useEffect(() => {
    const savedUsers = localStorage.getItem('ng_admin_users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      localStorage.setItem('ng_admin_users', JSON.stringify(DEFAULT_USERS))
      setUsers(DEFAULT_USERS)
    }

    const savedAudit = localStorage.getItem('ng_admin_audit')
    if (savedAudit) {
      setAudit(JSON.parse(savedAudit))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ng_admin_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('ng_admin_audit', JSON.stringify(audit))
  }, [audit])

  const logAction = (message) => {
    const entry = { id: Date.now().toString(), message, createdAt: new Date().toISOString() }
    setAudit((prev) => [entry, ...prev].slice(0, 10))
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role,
    }
    setUsers((prev) => [...prev, newUser])
    logAction(`Added user ${newUser.name} with role ${newUser.role}`)
    setName('')
    setEmail('')
    setRole('analyst')
  }

  const handleDeleteUser = (id) => {
    const deleted = users.find((user) => user.id === id)
    setUsers((prev) => prev.filter((user) => user.id !== id))
    if (deleted) logAction(`Deleted user ${deleted.name}`)
  }

  const handleRoleChange = (id, nextRole) => {
    setUsers((prev) => prev.map((user) => user.id === id ? { ...user, role: nextRole } : user))
    const changed = users.find((user) => user.id === id)
    if (changed) logAction(`Assigned role ${nextRole} to ${changed.name}`)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="mt-2 text-gray-600">User management, roles, audit logs, integrations and system health (stub).</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-6">
            <section className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Add User</h2>
              <form onSubmit={handleAddUser} className="mt-4 space-y-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-3 border rounded" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded">
                  <option value="admin">Admin</option>
                  <option value="analyst">Security Analyst</option>
                  <option value="manager">Manager</option>
                </select>
                <button type="submit" className="w-full px-4 py-3 bg-indigo-600 text-white rounded">Add User</button>
              </form>
            </section>

            <section className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <span className="text-sm text-gray-500">{users.length} users</span>
              </div>
              <div className="space-y-3">
                {users.length === 0 ? (
                  <div className="text-gray-500">No users available.</div>
                ) : users.map((user) => (
                  <div key={user.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4 rounded-xl border bg-slate-50">
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500">Role: {user.role}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => handleDeleteUser(user.id)} className="px-3 py-2 rounded border bg-white text-sm">Delete User</button>
                      <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)} className="px-3 py-2 rounded border bg-white text-sm">
                        <option value="admin">Admin</option>
                        <option value="analyst">Security Analyst</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Audit log</h2>
              <div className="mt-4 space-y-3">
                {audit.length === 0 ? (
                  <div className="text-sm text-gray-500">No audit activity yet.</div>
                ) : audit.map((entry) => (
                  <div key={entry.id} className="rounded-xl border p-3 bg-slate-50 text-sm">
                    <div className="text-gray-800">{entry.message}</div>
                    <div className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold">System actions</h2>
              <div className="mt-4 grid gap-3">
                <button className="w-full px-4 py-3 bg-white border rounded">View integrations</button>
                <button className="w-full px-4 py-3 bg-white border rounded">Audit system health</button>
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-4"><Link href="/">← Back home</Link></div>
      </div>
    </div>
  )
}
