
# Chat Manager – Unified Inbox

Unified inbox backend + admin console for consolidating messages from multiple channels (WhatsApp, Telegram, Email, Web chat). Messages are normalized into a single schema, enriched via an AI analysis API, and displayed in an operator-friendly UI with reply tools.

![enter image description here](https://github.com/lmadhuranga/Chat-Manager-Unified-Inbox-Koa-backend/blob/main/inbox.jpg?raw=true)

## Repositories

- Backend: `https://github.com/lmadhuranga/Chat-Manager-Unified-Inbox-Koa-backend`
- Frontend: `https://github.com/lmadhuranga/Chat-Manager-Unified-Inbox-Frontend`
- AI Analysis API: `https://github.com/lmadhuranga/MessageSort-AI-LLM-ChatGPT`

## Purpose

- Normalize multi-channel inbound messages into a single format.
- Enrich messages with AI analysis (intent, sentiment, priority) for triage.
- Provide a lightweight admin console to view conversations and send replies.

## Tech Stack

**Backend**
- Node.js, Koa
- MongoDB + Mongoose
- JWT (httpOnly cookies) for auth

**Frontend**
- React (Vite)
- Tailwind CSS

**AI Analysis API**
- MessageSort-AI-LLM-ChatGPT
- https://github.com/lmadhuranga/MessageSort-AI-LLM-ChatGPT

## Behavior Overview

- Webhooks receive messages from channels and normalize them.
- Inbound messages are enriched by the AI analysis API (if configured).
- Analysis output is stored in message metadata and summarized on the conversation.
- The UI displays conversation list, chat history, and analysis pills (intent/priority).
- Reply box auto-fills with `suggested_replies` (from analysis) until the first operator reply.

## Environment Configuration

### Backend (`backend/.env`)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/treema_unified_inbox


AI_END_URI=http://127.0.0.1:8000
AI_API_KEY=your_api_key_here

JWT_SECRET=change_me
AUTH_EMAIL=
AUTH_PASSWORD=

RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=3600000

CORS_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)

```
VITE_API_BASE=http://localhost:3000
```

## Running Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## Folder Structure

- `backend/` – Koa + MongoDB API, webhooks, auth, analysis enrichment
- `frontend/` – React + Vite admin console

## API Endpoints (Summary)

- `POST /webhooks/whatsapp`
- `POST /webhooks/telegram`
- `POST /webhooks/email`
- `POST /webhooks/webchat`
- `GET /conversations?limit=5&offset=0`
- `GET /conversations/:id/messages?limit=5`
- `POST /reply`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

## Notes

- AI analysis is optional; messages still save if the analysis service is down.
- Rate limiting is in-memory and per-IP. For production, consider Redis-backed rate limiting.
