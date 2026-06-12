import React from 'react'
import Link from 'next/link'

export default function Features(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl p-8">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="mt-4">Overview of platform capabilities.</p>
        <div className="mt-6"><Link href="/">← Back home</Link></div>
      </div>
    </div>
  )
}
