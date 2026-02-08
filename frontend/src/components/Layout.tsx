import { Outlet } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
            <span className="font-mono text-[var(--accent)]">DePassport</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <Link to="/verifier" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Verify</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Dashboard</Link>
                <Link to="/credentials" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Passport</Link>
                <Link to="/share" className="text-sm text-[var(--accent)] hover:underline">Share</Link>
                <span className="text-sm text-[var(--text-muted)] hidden sm:inline">{user?.name}</span>
                <button type="button" onClick={handleLogout} className="text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Log in</Link>
                <Link to="/register" className="text-sm px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-medium hover:bg-[var(--accent-dim)] transition-colors">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--border)] bg-[var(--bg-card)] py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} DePassport. Your identity, your data.</span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-[var(--accent)] transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-[var(--accent)] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
