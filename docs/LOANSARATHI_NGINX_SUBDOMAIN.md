# Option B: Backend on subdomain (api.loansarathi.com)

Using a subdomain is simpler: no path rewriting. The backend receives requests as-is.

---

## Two NGINX configs

| Config | File | Domain | Proxies to | Purpose |
|--------|------|--------|------------|--------|
| **1. Frontend** | e.g. `sites-available/loansarathi.com` | loansarathi.com, www.loansarathi.com | `http://localhost:5002` | Next.js / Loan Sarathi website |
| **2. Backend** | e.g. `sites-available/api.loansarathi.com` | api.loansarathi.com | `http://localhost:6000` | Node/Express API (gallery, etc.) |

So yes: **one config for the frontend, one for the backend.** No `/api/backend` path or rewrite on the main site; API traffic goes only to the subdomain.

---

## 1. DNS

Add an **A record** (or CNAME) for **api.loansarathi.com** pointing to the same server as loansarathi.com.

## 2. SSL (Let's Encrypt)

```bash
sudo certbot certonly --nginx -d api.loansarathi.com
```

## 3. NGINX config for api.loansarathi.com

Create or edit a config (e.g. `/etc/nginx/sites-available/api.loansarathi.com`):

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name api.loansarathi.com;
    return 301 https://$host$request_uri;
}

# Backend API
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name api.loansarathi.com;

    ssl_certificate     /etc/letsencrypt/live/api.loansarathi.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.loansarathi.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    location / {
        proxy_pass http://localhost:6000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
sudo ln -sf /etc/nginx/sites-available/api.loansarathi.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. Smart Mumbai Solutions

Set the backend base URL to the subdomain (include `/api` because your Express app serves under `/api/gallery`):

- **BACKEND_API_URL** = `https://api.loansarathi.com/api`

Then gallery calls become:
- `https://api.loansarathi.com/api/gallery/events`
- `https://api.loansarathi.com/api/gallery/health`
- etc.

No path rewriting; the backend gets `/api/gallery/events` as usual.

## 5. Optional: remove /api/backend from main site

If you switch fully to the subdomain, you can **remove** the `location /api/backend` block from the **frontend** config (`loansarathi.com`). Then:

- **Frontend config** (`loansarathi.com`): only `location /` → `localhost:5002` (no API block).
- **Backend config** (`api.loansarathi.com`): `location /` → `localhost:6000`.

All API traffic goes to api.loansarathi.com; the main site only serves the web app.
