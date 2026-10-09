# GrowthCapital

A modern investment platform built with Next.js and SQLite.

## Features
- Landing page with premium dark/gold visual identity
- User registration, login, dashboard, deposits, withdrawals, packages, profile, affiliates, history
- Admin dashboard and management routes
- SQLite-backed data model with financial transactions
- Environment-based admin credentials

## Run locally

1. Copy `.env.example` to `.env.local` and set values
2. Install dependencies:
   npm install
3. Start the app:
   npm run dev
4. Open http://localhost:3000

## Admin login
Set the following values in `.env.local` before starting the app:

ADMIN_PHONE=938970887
ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
JWT_SECRET=replace-with-strong-secret

The app will use these values for the secure admin authentication flow.
