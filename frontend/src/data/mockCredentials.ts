import type { Credential } from '../types/credentials'

export const mockCredentials: Credential[] = [
  {
    id: 'cred-1',
    type: 'passport',
    title: 'National Passport',
    issuer: 'Government of Example',
    issuedAt: '2023-01-15',
    expiresAt: '2033-01-14',
    claims: { fullName: 'Jane Doe', dateOfBirth: '1995-06-20', nationality: 'Example', documentNumber: '***456', over18: true },
    verified: true,
  },
]
