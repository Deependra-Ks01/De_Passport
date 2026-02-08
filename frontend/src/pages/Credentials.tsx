import { mockCredentials } from '../data/mockCredentials'
import CredentialCard from '../components/CredentialCard'

export default function Credentials() {
  const credentials = mockCredentials

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">My passport</h1>
        <p className="mt-1 text-[var(--text-muted)]">
          Your digital passport in your wallet. In production it would be issued by the government and stored securely.
        </p>
      </div>

      {credentials.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <p className="text-[var(--text-muted)]">No passport yet.</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">When the government issues your digital passport, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {credentials.map((cred) => (
            <CredentialCard key={cred.id} credential={cred} />
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-[var(--text-muted)]">
        This page shows mock data. Smart contracts and backend will power real issuance and verification later.
      </p>
    </div>
  )
}
