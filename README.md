# Tirtha Yatri

A travel & pilgrimage platform for Muktinath and Mustang, Nepal.

## Current status

This build is happening in phases. **Phase 1 (backend + data model) is complete.**
`client/` (public site) and `admin/` (admin dashboard) have not been started yet —
that's the next phase.

```text
tirtha-yatri/
├── server/     ← Express + MongoDB API (done)
├── client/     ← public React site (not started)
└── admin/      ← React admin dashboard (not started)
```

## Running the API

```bash
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI (Atlas), JWT_SECRET, etc.
npm run seed            # loads demo packages, destinations, reviews, gallery, blogs, FAQs
npm run dev              # starts the API on PORT (default 5000)
```

The seed script prints a demo admin login (email/password) to the console —
use it to test admin-only endpoints (`Authorization: Bearer <token>` from
`POST /api/auth/login`).

See `server/README` context in the plan file at
`C:\Users\Priyanka\.claude\plans\mighty-juggling-toucan.md` for the full
architecture writeup, REST surface, and model field list from this phase.

Verified end-to-end against a real MongoDB instance before handoff: all
CRUD, auth/role checks (401/403), public-vs-admin visibility rules, filters,
and error handling behave as designed (29/29 scenario checks passed; see
conversation history for the full list).

## Next steps

- Build `client/` (public site) per the original spec: Home, Packages,
  Package Details, Explore Mustang, Destination Details, Guide pages,
  Gallery, Reviews, Blog, FAQ, Contact, Customize Trip — wired to this API.
- Build `admin/` dashboard: auth, protected routes, CRUD screens for
  packages/destinations/reviews/gallery/blog/enquiries/bookings.
- Swap seed images/content for real, owned content before any public launch.
