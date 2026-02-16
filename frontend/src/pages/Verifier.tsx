import { useState } from 'react'

const questions = [
  { id: 'over18', label: 'Is this person over 18?', result: 'yes' },
  { id: 'verified_citizen', label: 'Is this person a verified citizen?', result: 'yes' },
  { id: 'visa_valid', label: 'Is this person’s visa valid for this country?', result: 'yes' },
]

export default function Verifier() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [scanned, setScanned] = useState(false)

  const currentQuestion = questions.find((q) => q.id === selectedQuestion)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Verifier</h1>
        <p className="mt-1 text-[var(--text-muted)]">
          You need to check something about a person’s passport (e.g. age, citizenship, visa, etc) without seeing their full document. They scan your QR and their wallet returns only Yes/No.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">What do you need to verify?</h2>
        <div className="space-y-2">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                setSelectedQuestion(q.id)
                setScanned(false)
              }}
              className={`w-full text-left rounded-lg border p-4 transition-colors ${
                selectedQuestion === q.id ? 'border-[var(--accent)] bg-[var(--accent-glow)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'
              }`}
            >
              <span className="font-medium text-[var(--text-primary)]">{q.label}</span>
            </button>
          ))}
        </div>

        {selectedQuestion && (
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Your verification request</h3>
            <p className="text-[var(--text-muted)] text-sm mb-4">
              Show the QR below to the person. They will scan it with their DePassport app and approve. You will only receive a Yes or No—no personal data.
            </p>
            <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] p-6 flex flex-col items-center">
              <div className="w-40 h-40 rounded-lg bg-white flex items-center justify-center text-[var(--bg-primary)] font-mono text-xs" aria-label="Verifier QR">
                QR: {selectedQuestion}
              </div>
              <p className="mt-4 text-sm text-[var(--text-muted)]">Person scans this with their wallet</p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setScanned(true)}
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-medium hover:bg-[var(--accent-dim)] transition-colors"
              >
                Simulate scan (demo)
              </button>
            </div>

            {scanned && currentQuestion && (
              <div className="mt-6 rounded-xl border border-[var(--success)]/50 bg-[var(--success)]/10 p-6">
                <p className="text-sm text-[var(--text-muted)]">Verification result</p>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{currentQuestion.label}</p>
                <p className="mt-2 text-2xl font-bold text-[var(--success)]">
                  {currentQuestion.result === 'yes' ? 'Yes ✓' : 'No'}
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  No name, date of birth, or document number was shared. This was a zero-knowledge proof.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
