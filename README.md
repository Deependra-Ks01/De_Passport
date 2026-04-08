# Blockchain-Based Digital Passport System

Prototype digital passport system built with Flask, MongoDB, Ganache, Solidity, and Web3.py. The application simulates three actors:

- Admin (passport authority) issues and revokes passports
- User (citizen) views passport details and generates a QR code
- Verifier (airport or hotel) verifies a passport using MongoDB and the blockchain

## Features

- Flask backend with modular route blueprints
- MongoDB storage for full passport details
- Ethereum smart contract stores only passport hash and validity status
- SHA256 hashing for passport integrity
- QR code generation containing `user_address` and `hash`
- Verification against:
  - MongoDB record
  - recomputed document hash
  - on-chain validity
  - revocation state
  - expiry date
- Simple admin login using environment variables
- Bootstrap + Jinja UI

## Project Structure

```text
De_Passport/
├── app.py
├── contract/
│   ├── Passport.sol
│   └── abi.json
├── database/
│   └── db.py
├── routes/
│   ├── admin.py
│   ├── user.py
│   └── verifier.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── qr_codes/
├── templates/
│   ├── admin.html
│   ├── base.html
│   ├── index.html
│   ├── user.html
│   └── verify.html
├── utils/
│   ├── blockchain.py
│   ├── hash.py
│   └── qr.py
├── .env.example
├── requirements.txt
└── README.md
```

## MongoDB Schema

Collection: `passports`

Fields:

- `user_address`
- `name`
- `dob`
- `passport_no`
- `nationality`
- `issue_date`
- `expiry_date`
- `hash`
- `status` (`valid` or `revoked`)

## Smart Contract

The smart contract stores only:

- passport data hash
- validity status

Functions:

- `issuePassport(address user, string hash)`
- `verifyPassport(address user, string hash)`
- `revokePassport(address user)`

## Local Setup

### 1. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Copy the example file and update it with your local values:

```bash
cp .env.example .env
```

Set:

- `MONGO_URI` to your local MongoDB connection string
- `GANACHE_ACCOUNT_ADDRESS` to the first Ganache account
- `GANACHE_PRIVATE_KEY` to that account's private key
- `CONTRACT_ADDRESS` to the deployed smart contract address

### 4. Start MongoDB

If MongoDB Compass is running and your local server is already active, you can keep using:

```text
mongodb://127.0.0.1:27017/
```

### 5. Deploy the Solidity contract to Ganache

Use Remix with the local Ganache RPC or Truffle/Hardhat if you prefer. Connect to:

```text
http://127.0.0.1:7545
```

Deploy [`contract/Passport.sol`](/Users/pineapple/Desktop/De_Passport/contract/Passport.sol) and copy the deployed contract address into `.env`.

The included [`contract/abi.json`](/Users/pineapple/Desktop/De_Passport/contract/abi.json) already matches the Solidity contract for Web3.py integration.

### 6. Run the Flask app

```bash
python app.py
```

Open:

- `http://127.0.0.1:5000/` for admin login
- `http://127.0.0.1:5000/user` for citizen portal
- `http://127.0.0.1:5000/verify` for verifier portal

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

Change them in `.env` for a safer local demo.

## Functional Flow

### Passport Issuance

1. Admin logs in
2. Admin fills passport form
3. App generates SHA256 hash from passport data
4. Full passport record is saved in MongoDB
5. Hash is stored on Ethereum using `issuePassport`

### QR Generation

1. Citizen opens `/user`
2. Citizen enters Ethereum address
3. App loads passport from MongoDB
4. App generates a QR image containing JSON:

```json
{
  "user_address": "0x...",
  "hash": "sha256..."
}
```

### Passport Verification

1. Verifier opens `/verify`
2. Verifier pastes QR payload
3. App fetches MongoDB passport record
4. App recomputes the passport hash
5. App calls `verifyPassport` on-chain
6. App checks revocation and expiry
7. App shows `Valid Passport` or `Invalid Passport`

### Revocation

1. Admin clicks revoke in dashboard
2. App updates blockchain using `revokePassport`
3. App updates MongoDB status to `revoked`

## Important Notes

- This is a learning prototype for local demonstration only
- Full passport data is intentionally not stored on-chain
- The verifier page uses pasted QR payload text for simplicity
- If you want camera-based scanning, a JS QR scanner can be added later

## Suggested Demo Data

- Use a Ganache account as the citizen wallet address
- Issue a passport with a future expiry date
- Copy the generated QR payload format into the verifier page
- Revoke the passport and verify again to see the status change

## Troubleshooting

- If blockchain writes fail, verify:
  - Ganache is running at `http://127.0.0.1:7545`
  - `GANACHE_ACCOUNT_ADDRESS`, `GANACHE_PRIVATE_KEY`, and `CONTRACT_ADDRESS` are correct
  - `CHAIN_ID` matches your Ganache network
- If MongoDB lookup fails, verify the `MONGO_URI`
- If QR image generation fails, ensure `Pillow` is installed

## Next Improvements

- Add camera-based QR scanning in the browser
- Add role-based authentication with hashed passwords
- Add passport update history
- Add file upload for citizen photo and supporting documents
