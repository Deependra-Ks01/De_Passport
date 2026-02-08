import type { Credential } from '../types/credentials'

const typeLabel = 'Passport'
const typeClass = 'bg-amber-500/20 text-amber-400'

interface CredentialCardProps {
  credential: Credential
  onSelect?: (credential: Credential) => void
  selected?: boolean
}

export default function CredentialCard({ credential, onSelect, selected }: CredentialCardProps) {
  return (
    <div
      role={onSelect ? 'button' : undefined}
      onClick={onSelect ? () => onSelect(credential) : undefined}
      className={`rounded-xl border bg-[var(--bg-card)] p-5 transition-all ${
        onSelect ? 'cursor-pointer hover:border-[var(--accent)]/50' : ''
      } ${selected ? 'border-[var(--accent)] ring-2 ring-[var(--accent-glow)]' : 'border-[var(--border)]'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${typeClass}`}>
            {typeLabel}
          </span>
          <h3 className="mt-2 font-semibold text-[var(--text-primary)]">{credential.title}</h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Issued by {credential.issuer}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)] font-mono">
            Issued {credential.issuedAt}
            {credential.expiresAt && ` · Expires ${credential.expiresAt}`}
          </p>
        </div>
        {credential.verified && (
          <span className="shrink-0 text-[var(--success)]" title="Verified">
            ✓
          </span>
        )}
      </div>
    </div>
  )
}
