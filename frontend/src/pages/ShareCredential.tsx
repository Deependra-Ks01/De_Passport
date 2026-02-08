import { useState, useMemo } from 'react'
import { mockCredentials } from '../data/mockCredentials'
import CredentialCard from '../components/CredentialCard'
import type { Credential } from '../types/credentials'

const verificationOptions: { id: string; label: string; claimKey?: string; description: string }[] = [
  { id: 'over18', label: 'Is over 18?', claimKey: 'over18', description: 'Prove age without revealing birth date' },
  { id: 'verified_citizen', label: 'Is a verified citizen?', description: 'Prove nationality without document number' },
  { id: 'visa_valid', label: 'Is visa valid for this country?', description: 'Prove travel eligibility without revealing full passport details' },
]

export default function ShareCredential() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<string>(verificationOptions[0].id)

  const payload = useMemo(() => {
    if (!selectedCredential) return null
    const opt = verificationOptions.find((o) => o.id === selectedQuestion)
    return {
      credentialId: selectedCredential.id,
      question: opt?.label ?? selectedQuestion,
      claimKey: opt?.claimKey,
      timestamp: Date.now(),
    }
  }, [selectedCredential, selectedQuestion])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Share a proof</h1>
        <p className="mt-1 text-[var(--text-muted)]">
          Choose your passport and what to prove. The verifier gets a &quot;Yes&quot; or &quot;No&quot;—not your name, DOB, or passport number (zero-knowledge).
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">1. Select passport</h2>
          <div className="space-y-3">
            {mockCredentials.map((cred) => (
              <CredentialCard
                key={cred.id}
                credential={cred}
                onSelect={setSelectedCredential}
                selected={selectedCredential?.id === cred.id}
              />
            ))}
          </div>

          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-8 mb-3">2. What should we prove?</h2>
          <div className="space-y-2">
            {verificationOptions.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                  selectedQuestion === opt.id ? 'border-[var(--accent)] bg-[var(--accent-glow)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                }`}
              >
                <input
                  type="radio"
                  name="question"
                  value={opt.id}
                  checked={selectedQuestion === opt.id}
                  onChange={() => setSelectedQuestion(opt.id)}
                  className="mt-1 text-[var(--accent)]"
                />
                <div>
                  <span className="font-medium text-[var(--text-primary)]">{opt.label}</span>
                  <p className="text-sm text-[var(--text-muted)]">{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">3. Show this QR to the verifier</h2>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col items-center justify-center min-h-[280px]">
            {selectedCredential && payload ? (
              <>
                <div
                  className="w-48 h-48 rounded-xl bg-white flex items-center justify-center text-[var(--bg-primary)] font-mono text-xs overflow-hidden"
                  aria-label="QR code placeholder"
                >
                  <div className="text-center p-2 break-all">
                    {JSON.stringify(payload).slice(0, 80)}…
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--text-muted)] text-center">
                  Verifier will see: &quot;{verificationOptions.find((o) => o.id === selectedQuestion)?.label}&quot; → <strong className="text-[var(--success)]">Yes</strong>
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">They will not see your name, DOB, or document number.</p>
              </>
            ) : (
              <p className="text-[var(--text-muted)]">Select your passport above to generate the QR.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
