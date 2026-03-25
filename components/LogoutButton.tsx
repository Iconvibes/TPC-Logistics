'use client'

import { useState } from 'react'

type LogoutButtonProps = {
  label?: string
  className?: string
}

export default function LogoutButton({ label = 'Sign out', className }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if (loading) return
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      window.location.href = '/'
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Signing out...' : label}
    </button>
  )
}
