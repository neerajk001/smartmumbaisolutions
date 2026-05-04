# Smart Mumbai Solutions

- **Frontend** (Next.js) lives in the `frontend/` folder.
- **Gallery API** is a Node backend in `gallery-backend/`.

## Run

Frontend and backend have their own scripts. Run each from its folder (or install from root once).

**Install (from repo root installs both):**
```bash
pnpm install
```

**Frontend:**
```bash
cd frontend
pnpm dev    # development (port 3000)
pnpm build
pnpm start  # production
```

**Gallery backend:**
```bash
cd gallery-backend
pnpm dev    # development with nodemon (port 7001)
pnpm start  # production
```

This project uses [Next.js](https://nextjs.org) in `frontend/` and a small Express gallery API in `gallery-backend/`.

## Configuration (env + nginx)

This repo now has a **separate gallery backend** (Express) that the frontend calls.

- Frontend env template: `frontend/.env.local.example` → copy to `frontend/.env.local`
- Gallery backend env template: `gallery-backend/.env.example` → copy to `gallery-backend/.env`

Key variables:

- `NEXT_PUBLIC_GALLERY_API_BASE`
	- Dev: `http://localhost:7001/api/gallery`
	- Prod (same domain via nginx): `https://yourdomain.com/api/gallery`
- `MONGODB_URI` (required for `gallery-backend`)
- `NEXTAUTH_SECRET` (frontend) must match `GALLERY_JWT_SECRET` (backend) so admin auth works.

For production, proxy the gallery backend under `/api/*` (see `nginx.conf` for an example: `/api/` → `127.0.0.1:7001`, `/` → Next.js).

### Admin panel

- **Login:** `/admin/login` (email/password from gallery-backend `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`, or Google if configured).
- **Allowed emails:** Only emails in the backend “allowed admin emails” list can sign in (Google or credentials). The list is seeded with `ADMIN_EMAIL` (or `neerajkushwaha0401@gmail.com`) on first run. Manage it from **Admin Panel → Allowed admin emails** (add/remove) when signed in with email/password.
- **Create events:** In the admin panel, use “Create event & upload photos” to add events; they appear on the public **Gallery** tab. Requires Cloudinary env in `gallery-backend/.env`.
- **Google sign-in check:** For “Continue with Google”, the frontend checks the allowed list via the backend. Set `NEXTAUTH_SECRET` in `gallery-backend/.env` to the same value as in `frontend/.env` so this check works.
