# Today's Outfit

A full-stack wardrobe and outfit planning app built with Next.js, React, TypeScript, PostgreSQL, Prisma, NextAuth, and Cloudinary.

It helps users digitize clothing items, build outfits, and schedule looks on a calendar.

## Overview

Today's Outfit is a personal styling workspace:

- save clothing pieces into a digital wardrobe
- build reusable outfits from wardrobe items
- add one-off items for special looks
- assign outfits to dates in a monthly calendar
- keep account-based data isolated per user

The app currently includes static placeholders for Community and Explore AI pages, while core wardrobe/outfit/calendar flows are fully wired with backend APIs and database models.

## Core Features

- authentication with email/password via NextAuth Credentials provider
- user-scoped wardrobe management (create, list, filter, edit, delete)
- image upload to Cloudinary for clothing item photos
- outfit builder with wardrobe items plus one-off custom items
- outfit management (create, browse, view details, delete)
- monthly outfit calendar assignment (one outfit per day per user)

## Environment Variables

Create `.env.local` in the project root and set:

```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-random-secret"

CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Apply database migrations

```bash
npx prisma migrate dev
```

3. Start development server

```bash
npm run dev
```

4. Open the app

```text
http://localhost:3000
```

## Current Status

Implemented end-to-end:

- auth (register/login/logout)
- wardrobe CRUD
- outfit CRUD
- calendar assignment and retrieval
- Cloudinary uploads

In progress:

- Community feed backend
- Explore AI suggestion pipeline

## Roadmap Ideas

- weather-aware outfit recommendations
- AI-generated outfit suggestions from wardrobe inventory
- social interactions in community feed (real posts, likes, comments)
- drag-and-drop outfit calendar planning
- wardrobe analytics (most worn, least worn, seasonal usage)