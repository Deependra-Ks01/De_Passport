export type CredentialType = 'passport'

export interface Credential {
  id: string
  type: CredentialType
  title: string
  issuer: string
  issuedAt: string
  expiresAt?: string
  claims: Record<string, unknown>
  verified: boolean
}

export interface VerificationRequest {
  requestId: string
  question: string
  claimKey?: string
  example: string
}
