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
POST /api/auth/sync-user
GET /api/users/me
POST /api/questions
GET /api/questions
GET /api/questions/:id
POST /api/questions/:id/answers
GET /api/questions/:id/answers
```

Protected API requests require this header:

```text
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

When a valid Firebase ID token is sent, the server finds the matching MySQL user by `firebase_uid`.
If the user does not exist yet, the server creates the user automatically.

Point rules are handled on the backend:

```text
Create question: +10P
Create answer: +20P
```

Character stages are calculated on the backend:

```text
0P - 99P: egg
100P - 299P: cracked_egg
300P - 499P: hatching_egg
500P+: character_1, character_2, or character_3
```

The final character is randomly assigned only once when the user first reaches 500P.
