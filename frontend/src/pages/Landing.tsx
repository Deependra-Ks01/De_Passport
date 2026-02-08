import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-glow)]/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              You own your identity.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[var(--text-muted)]">
              Store your digital passport in your wallet. Prove what’s needed—like &quot;I am over 18&quot; or &quot;verified citizen&quot;—without sharing your birth date, name, or passport number. Zero-knowledge, decentralized.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-primary)] font-semibold hover:bg-[var(--accent-dim)] transition-colors shadow-lg shadow-[var(--accent-glow)]"
              >
                Get your DePassport
              </Link>
              <Link
                to="/verifier"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                I need to verify someone
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems / Solutions */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            Why a decentralized passport?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                problem: 'The honeypot risk',
                desc: 'One central database holds millions of passport copies. One breach, everyone exposed.',
                solution: 'Data lives in your wallet, encrypted. The chain only stores public keys—no central DB to hack.',
              },
              {
                problem: 'Identity theft',
                desc: 'Fake IDs and stolen documents are easy to create or use.',
                solution: 'Your passport is signed by the government. You can’t forge it without the issuer’s key.',
              },
              {
                problem: 'Privacy invasion',
                desc: 'Renting a room often means handing over a full passport copy.',
                solution: 'Share only what’s needed: e.g. “Verified citizen” without address or ID number.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--accent)]/50 transition-colors"
              >
                <h3 className="font-semibold text-[var(--accent)]">{item.problem}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.desc}</p>
                <p className="mt-4 text-sm text-[var(--text-primary)] border-l-2 border-[var(--accent)] pl-3">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)] bg-[var(--bg-card)]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono font-bold mx-auto">1</div>
              <h3 className="mt-4 font-semibold text-[var(--text-primary)]">Get your digital passport</h3>
              <p className="mt-2 text-[var(--text-muted)]">The government issues and signs your passport into your wallet. You hold it; no central database stores a copy.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono font-bold mx-auto">2</div>
              <h3 className="mt-4 font-semibold text-[var(--text-primary)]">Show a QR when asked</h3>
              <p className="mt-2 text-[var(--text-muted)]">At a club or airport, scan a QR. The verifier asks: “Is this person over 18?” or “Is visa valid?”</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono font-bold mx-auto">3</div>
              <h3 className="mt-4 font-semibold text-[var(--text-primary)]">Answer with a proof, not data</h3>
              <p className="mt-2 text-[var(--text-muted)]">Your wallet answers “Yes” with a cryptographic proof. They never see your DOB or name—just the fact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            Use your passport
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Border & travel', target: 'Airports, border control', pitch: 'Prove identity and visa status at the gate. Walk through when the system confirms your passport is valid—no handing over the document.' },
              { title: 'Hotel & rentals', target: 'Check-in without copies', pitch: 'Prove you’re a verified citizen or over 18 without leaving a full passport copy at the front desk.' },
              { title: 'Age verification', target: 'Bars, clubs, restricted services', pitch: 'Answer “Is this person over 18?” with a cryptographically signed Yes. No DOB or name shared.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-sm text-[var(--accent)] mt-1">{item.target}</p>
                <p className="mt-3 text-[var(--text-muted)]">{item.pitch}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Ready to own your identity?</h2>
          <p className="mt-2 text-[var(--text-muted)]">Create your wallet and add credentials. No backend required for this demo.</p>
          <Link
            to="/register"
            className="inline-flex mt-6 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-primary)] font-semibold hover:bg-[var(--accent-dim)] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </section>
    </div>
  )
}
