# RRC Frontend

React, Firebase Authentication, and React Router frontend.

## Setup

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env`.

3. Fill in Firebase web app values in `.env`.

4. Start the development server:

```bash
npm run dev
```

## Routes

```text
/login
/home
/board
/questions/:id
```

The frontend sends the Firebase ID token to the backend with this header:

```text
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```
