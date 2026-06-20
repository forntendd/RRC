# RRC Deployment Guide

This project has three deployed parts:

```text
Vercel frontend -> Render/Railway backend -> Cloud MySQL
Firebase Authentication is used for login.
```

## 1. Create a cloud MySQL database

Use Railway, Aiven, PlanetScale, or another MySQL provider.

After the database is created, run:

```text
database/schema.sql
```

Save these database values:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

## 2. Deploy the backend

Recommended beginner option: Render Web Service.

Use these settings:

```text
Repository: forntendd/RRC
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add these environment variables on Render:

```env
NODE_ENV=production
CLIENT_ORIGIN=https://YOUR_VERCEL_FRONTEND_URL

DB_HOST=YOUR_CLOUD_DB_HOST
DB_PORT=3306
DB_USER=YOUR_CLOUD_DB_USER
DB_PASSWORD=YOUR_CLOUD_DB_PASSWORD
DB_NAME=YOUR_CLOUD_DB_NAME

FIREBASE_PROJECT_ID=rrcp-ab1d7
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY"
```

After deploy, check:

```text
https://YOUR_BACKEND_URL/api/health
https://YOUR_BACKEND_URL/api/health/db
```

## 3. Deploy the frontend

Use Vercel.

Use these settings:

```text
Repository: forntendd/RRC
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Add these environment variables on Vercel:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_URL/api
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

## 4. Update backend CORS

After Vercel gives a real frontend URL, update the backend environment variable:

```env
CLIENT_ORIGIN=https://YOUR_VERCEL_FRONTEND_URL
```

Then redeploy or restart the backend.

## 5. Firebase checklist

In Firebase Authentication:

```text
Email/Password: Enabled
```

Add the Vercel domain if Firebase asks for authorized domains:

```text
YOUR_PROJECT.vercel.app
```

## 6. Final test

Open the Vercel frontend URL.

Test this flow:

```text
Register -> Home -> Board -> Create question -> Question detail -> Create answer
```

Expected behavior:

```text
Question: +10P
Answer: +20P
Character stage changes by points
```
