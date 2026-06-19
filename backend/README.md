# RRC Backend

Node.js, Express, MySQL, Firebase Admin SDK backend server.

## Setup

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env`.

3. Fill in MySQL and Firebase Admin values in `.env`.

4. Start the development server:

```bash
npm run dev
```

## API

```text
GET /api/health
GET /api/health/db
GET /api/auth/me
```

`GET /api/auth/me` requires this header:

```text
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

When a valid Firebase ID token is sent, the server finds the matching MySQL user by `firebase_uid`.
If the user does not exist yet, the server creates the user automatically.
