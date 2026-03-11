## SmartSolutionsMumbai Gallery Troubleshooting

This note explains **why gallery events/photos might not be visible on `smartsolutionsmumbai.com`** and documents the **correct implementation** for fetching them from the Loan Sarathi backend.

It is specifically about:

- Frontend: **Smart Mumbai Solutions** (`smartsolutionsmumbai.com`, project `smartmumbaisolution`)
- Backend: **Loan Sarathi** (`loansarathi.com`, project `my-app` – gallery routes live under `/api/gallery`)

---

## 1. How the gallery fetch is supposed to work

The intended flow is:

```text
Browser on smartsolutionsmumbai.com
  → GET https://smartsolutionsmumbai.com/api/gallery/events     (visible in Network tab)
      → Next.js API route (smartmumbaisolution/app/api/gallery/events/route.ts)
          → GET https://loansarathi.com/api/gallery/events      (server-to-server, NOT visible in browser)
              → Loan Sarathi backend returns SmartSolution events
```

- The **browser never calls `https://loansarathi.com` directly**, so there is **no CORS error**.
- The proxy passes `X-Application-Source: smartmumbaisolutions` so the backend knows to return **Smart Mumbai Solutions** events only.

Relevant SmartSolution files:

- `app/api/gallery/events/route.ts` – proxy to Loan Sarathi backend
- `lib/galleryApi.ts` – client library used by the UI
- `components/GallerySection.tsx` – actual gallery UI on `/gallery`

---

## 2. Correct implementation on SmartSolutionsMumbai

### 2.1 Proxy API route (`/api/gallery/events`)

**File:** `app/api/gallery/events/route.ts`

- **Backend URL:**  
  ```ts
  const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';
  ```
- **What it does:**
  - Reads query params (`featured`, `limit`, `offset`).
  - Calls: `GET ${BACKEND_URL}/gallery/events?...`
  - Sends header: `X-Application-Source: smartmumbaisolutions`.
  - Forwards JSON back to the browser.
  - If backend returns non‑200, it forwards a JSON error with `error` (and `details` when present).

### 2.2 Client API helper

**File:** `lib/galleryApi.ts`

- For the **browser**, `API_BASE_URL` is:
  ```ts
  const API_BASE_URL = '/api/gallery';
  ```
  so the browser always hits its **own** domain.
- `getGalleryEvents()` calls:
  ```ts
  GET /api/gallery/events
  ```
  and:
  - Uses `X-Application-Source: smartmumbaisolutions`.
  - Normalizes image URLs to `https://loansarathi.com/...`.
  - Returns either:
    - `{ success: true, total, events }`, or
    - `{ success: false, error: '...' }` with backend `details` appended when present.

### 2.3 UI component (`GallerySection`)

**File:** `components/GallerySection.tsx`

- On mount, it calls `getGalleryEvents()`.
- On success: renders the list of events with images and metadata.
- On failure: shows a visible error box:
  - Message from backend / proxy (`response.error`), e.g.  
    `"Failed to fetch gallery events — Database not connected"`, or  
    `"Gallery backend unreachable"`.

This means: **if something is wrong on the backend, the SmartSolutions UI now shows a clear error message instead of just “no images”.**

---

## 3. Why it might not be fetching on smartsolutionsmumbai.com

If the SmartSolution UI shows an error and DevTools Network shows `GET /api/gallery/events` → **500**, then **SmartSolution’s implementation is working** and the problem is one of the following.

### 3.1 Loan Sarathi gallery health endpoint is failing

Command:

```bash
curl -s https://loansarathi.com/api/gallery/health
```

Observed result: **500 Internal Server Error**.

Implications:

- The server at `loansarathi.com` is **reachable**.
- The gallery router is running, but **health check logic is throwing an error** (often due to DB or internal code).
- Any calls to `https://loansarathi.com/api/gallery/events` from SmartSolution will also likely fail with 500.

**Fix direction:** inspect backend logs on the Loan Sarathi server (PM2/systemd logs) to see the specific error coming from `/api/gallery/health` or `/api/gallery/events`.

### 3.2 Database / MongoDB issues on the Loan Sarathi backend

The backend route `backend/routes/gallery.js`:

- Uses `getDb()` to obtain a MongoDB connection.
- If `db` is not available it returns:
  ```json
  { "success": false, "error": "Service temporarily unavailable", "details": "Database not connected" }
  ```
- Any other exception is reported as:
  ```json
  { "success": false, "error": "Failed to fetch gallery events", "details": "<error message>" }
  ```

Typical causes:

- `MONGO_URI` is missing or wrong on the **production server**.
- The database is down or unreachable from the backend host.
- The backend process was not restarted after `.env` changes.

### 3.3 Misconfigured environment variables on the Loan Sarathi server

For the gallery API to work in production:

- **Required:**
  - `MONGO_URI` (points to the correct database).
- **Recommended:**
  - `NODE_ENV=production`
  - Optional debugging: `EXPOSE_GALLERY_ERROR=true` (only temporarily, to surface `details` in the response).

If these are missing or incorrect, the gallery routes can return 500.

### 3.4 No SmartSolution events created/published

Even when everything is configured correctly, the API can legitimately return:

```json
{ "success": true, "total": 0, "events": [] }
```

Reasons:

- No events with `source = "smartmumbaisolutions"` exist.
- Events exist but are **not published**.

Check in the Loan Sarathi admin:

- Go to `/admin/gallery`.
- Ensure there is at least one event with:
  - `source = Smart Mumbai Solutions (smartmumbaisolutions)`.
  - `isPublished = true`.

### 3.5 Old or direct client-side calls to loansarathi.com

If any old code or debug pages call:

- `https://loansarathi.com/api/gallery/events` **directly from the browser**, that will:
  - Trigger **CORS errors** (blocked by browser).
  - Bypass the proxy logic and error handling.

The correct pattern is always:

- Browser → `/api/gallery/events`  
  (never directly to `https://loansarathi.com/...`).

The `test-gallery` page has been updated to only use the proxy.

---

## 4. Checklist to get SmartSolutions gallery working

Follow this checklist in order:

1. **On Loan Sarathi (backend server)**
   - [ ] Latest backend code deployed (including `backend/routes/gallery.js` and `backend/utils/sourceDetection.js`).
   - [ ] `MONGO_URI` set correctly and MongoDB is reachable.
   - [ ] Backend process restarted after any `.env` change.
   - [ ] `curl -s https://loansarathi.com/api/gallery/health` returns **200** with `"success": true`.

2. **On SmartSolutionsMumbai (frontend / proxy)**
   - [ ] `BACKEND_API_URL` (if set) points to `https://loansarathi.com/api` or the correct API base.
   - [ ] `app/api/gallery/events/route.ts` sends `X-Application-Source: smartmumbaisolutions`.
   - [ ] `lib/galleryApi.ts` uses `API_BASE_URL = '/api/gallery'` on the client.
   - [ ] `GallerySection` uses `getGalleryEvents()` and shows the error message if `success === false`.

3. **Data**
   - [ ] At least one **published** gallery event exists in Loan Sarathi admin with `source = Smart Mumbai Solutions`.

When all of the above are true:

- `GET https://smartsolutionsmumbai.com/api/gallery/events` should return:
  ```json
  { "success": true, "total": N, "events": [ ... ] }
  ```
- The **Gallery & Events** page on `smartsolutionsmumbai.com` should display events and photos correctly.

