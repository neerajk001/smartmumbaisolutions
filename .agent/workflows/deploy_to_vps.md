---
description: Comprehensive guide to deploying the Next.js application on a VPS (Ubuntu/Debian)
---

# Deploy Next.js App to VPS

This guide outlines the step-by-step process to deploy your Next.js application to a Virtual Private Server (VPS) running Ubuntu.

## Prerequisites
- A VPS with root access (e.g., DigitalOcean, AWS EC2, Linode, Vultr).
- A domain name (e.g., `loansarathi.com`) pointed to your VPS IP address.

## Step 1: Connect to your VPS
SSH into your server via terminal:
```bash
ssh root@your_server_ip
```

## Step 2: Update and Upgrade System
Ensure your server is up to date.
```bash
sudo apt update && sudo apt upgrade -y
```

## Step 3: Install Node.js (via NVM)
Install NVM (Node Version Manager) and the latest LTS version of Node.js.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
node -v # Verify installation
npm -v  # Verify installation
```

## Step 4: Install PM2 (Process Manager)
PM2 keeps your app running in the background and restarts it on crashes/reboots.
```bash
npm install -g pm2
```

## Step 5: Install Nginx (Web Server)
Nginx will act as a reverse proxy to forward requests to your Next.js app.
```bash
sudo apt install nginx -y
```

## Step 6: Clone Your Repository / Upload Code
**Option A: Git Clone**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**Option B: Upload via SCP/FileZilla**
If your code isn't on a public git repo, upload your project folder to `/var/www/your-app`.

## Step 7: Install Dependencies and Build
Navigate to your project directory and set up the app.
```bash
cd /path/to/your/app
npm install
npm run build
```

## Step 8: Start the Application with PM2
Start the Next.js app on a specific port (default 3000).
```bash
pm2 start npm --name "smart-solutions" -- start
pm2 save
pm2 startup
```
*Run the command outputted by `pm2 startup` to freeze the process list on reboot.*

## Step 9: Configure Nginx Reverse Proxy
Remove default config and create a new one.
```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-available/smart-solutions
```

Paste the following configuration (Replace `your_domain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/smart-solutions /etc/nginx/sites-enabled/
sudo nginx -t # Test configuration
sudo systemctl restart nginx
```

## Step 10: Setup SSL with Certbot (HTTPS)
Secure your site with a free Let's Encrypt certificate.
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```
Follow the prompts (enter email, agree to terms). Certbot will automatically update your Nginx config.

## Step 11: Final Verification
Visit `https://your_domain.com` in your browser. Your app should be live and secure!

## Maintenance
- **Update App:**
  ```bash
  cd /path/to/app
  git pull
  npm install
  npm run build
  pm2 restart smart-solutions
  ```
- **Check Logs:** `pm2 logs smart-solutions`
