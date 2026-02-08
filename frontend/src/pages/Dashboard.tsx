import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockCredentials } from '../data/mockCredentials'
import CredentialCard from '../components/CredentialCard'

export default function Dashboard() {
  const { user } = useAuth()
  const credentials = mockCredentials

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-1 text-[var(--text-muted)]">
          Your passport wallet. Your passport is stored locally for this demo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/credentials"
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--accent)]/50 transition-colors"
        >
          <h2 className="font-semibold text-[var(--text-primary)]">My passport</h2>
          <p className="mt-1 text-2xl font-mono text-[var(--accent)]">{credentials.length}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">View and manage your digital passport</p>
        </Link>
        <Link
          to="/share"
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--accent)]/50 transition-colors"
        >
          <h2 className="font-semibold text-[var(--text-primary)]">Share a proof</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Generate a QR for a verifier</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">e.g. &quot;Prove you’re over 18&quot; without revealing DOB</p>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Your passport</h2>
          <Link to="/credentials" className="text-sm text-[var(--accent)] hover:underline">View</Link>
        </div>
        <div className="space-y-3">
          {credentials.slice(0, 2).map((cred) => (
            <CredentialCard key={cred.id} credential={cred} />
          ))}
        </div>
      </div>
    </div>
  )
}
