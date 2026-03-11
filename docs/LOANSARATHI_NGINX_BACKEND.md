# Loan Sarathi NGINX: Expose backend so Smart Mumbai Solutions can call the gallery API
# Path: /etc/nginx/sites-available/loansarathi.com (or your config file)
#
# Your backend runs on localhost:6000 and serves routes like /api/gallery/events.
# NGINX currently has: location /api/backend → proxy_pass http://localhost:6000;
# That sends full path /api/backend/gallery/events to the backend, but the backend expects /api/gallery/events.
#
# Fix: use a trailing slash in location and rewrite the path when proxying.
# Replace your existing "location /api/backend" block with this:

    # Backend API (path rewrite: /api/backend/ → /api/ so backend receives /api/gallery/...)
    location /api/backend/ {
        proxy_pass http://localhost:6000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

# Then:
# 1. Test config: sudo nginx -t
# 2. Reload:    sudo systemctl reload nginx
#
# After this, requests to https://loansarathi.com/api/backend/gallery/events
# will be proxied to http://localhost:6000/api/gallery/events (correct path for your Express app).
