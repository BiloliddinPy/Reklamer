Reklamer — Open Advertising Marketplace
======================================

This repository contains the source code for **Reklamer**, an open advertising marketplace for Uzbekistan that connects advertisers with Telegram, Instagram, YouTube, and TikTok influencers.

### Project structure

- `backend/` — FastAPI backend API
- `web/` — Next.js frontend

### Quick start (development)

1. Copy `.env.example` to `.env` and adjust values.
2. Start core services with Docker:

```bash
docker compose up --build
```

3. Backend will be available at `http://localhost:8000`.

> Note: At this stage only the backend foundation and project skeleton are implemented.
