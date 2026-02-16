import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Log in</h1>
        <p className="mt-1 text-[var(--text-muted)]">Demo: any email/password will work. Backend not created yet.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)]">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)]">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-semibold hover:bg-[var(--accent-dim)] transition-colors"
          >
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[var(--accent)] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
