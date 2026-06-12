import React from 'react'
import Link from 'next/link'

export default function About(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl p-8">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="mt-4">About NeuraGuard.</p>
        <div className="mt-6"><Link href="/">← Back home</Link></div>
      </div>
    </div>
  )
}
