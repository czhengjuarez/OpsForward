# OpsForward Setup Instructions

## Prerequisites
- Cloudflare account with Workers enabled
- Google Cloud Console account
- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)

---

## Step 1: Create Cloudflare D1 Database

Run this command to create the database:

```bash
wrangler d1 create ops-forward-db
```

**Output will look like:**
```
✅ Successfully created DB 'ops-forward-db'!

[[d1_databases]]
binding = "DB"
database_name = "ops-forward-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** and update `wrangler.toml` line 12:
```toml
database_id = "YOUR_DATABASE_ID_HERE"
```

---

## Step 2: Run Database Migrations

Apply the schema and migrations:

```bash
# Apply initial schema
wrangler d1 execute ops-forward-db --remote --file=worker/schema.sql

# Apply all migrations
wrangler d1 migrations apply ops-forward-db --remote
```

Verify the database:
```bash
wrangler d1 execute ops-forward-db --remote --command="SELECT name FROM sqlite_master WHERE type='table'"
```

You should see tables: `sites`, `users`, `sessions`, `categories`, `invites`, `user_likes`

---

## Step 3: Setup Google OAuth

### 3.1 Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Enable **Google+ API** (or Google Identity)
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. Application type: **Web application**
7. Add **Authorized redirect URIs**:
   - `https://ops-forward-api.changying.workers.dev/api/auth/google/callback`
   - `http://localhost:8787/api/auth/google/callback` (for local testing)

8. Click **Create** and copy:
   - **Client ID**
   - **Client Secret**

### 3.2 Update wrangler.toml

Update line 36 in `wrangler.toml` with your actual worker URL:
```toml
GOOGLE_REDIRECT_URI = "https://ops-forward-api.YOUR_SUBDOMAIN.workers.dev/api/auth/google/callback"
```

---

## Step 4: Configure Worker Secrets

Set the required secrets (you'll be prompted to enter each value):

```bash
# Google OAuth Client ID
wrangler secret put GOOGLE_CLIENT_ID
# Paste your Client ID when prompted

# Google OAuth Client Secret
wrangler secret put GOOGLE_CLIENT_SECRET
# Paste your Client Secret when prompted

# Session Secret (generate a random string)
wrangler secret put SESSION_SECRET
# Generate with: openssl rand -base64 32
# Or use any random 32+ character string
```

---

## Step 5: Deploy Worker API

Deploy the worker to Cloudflare:

```bash
wrangler deploy
```

**Output will show:**
```
✨ Successfully published your script to
 https://ops-forward-api.YOUR_SUBDOMAIN.workers.dev
```

**Copy this URL** - you'll need it for the frontend configuration.

---

## Step 6: Configure Frontend

Create `.env` file in the project root:

```bash
cat > .env << EOF
VITE_API_URL=https://ops-forward-api.YOUR_SUBDOMAIN.workers.dev/api
EOF
```

Replace `YOUR_SUBDOMAIN` with your actual Cloudflare subdomain.

---

## Step 7: Build Frontend

Build the frontend for production:

```bash
npm run build
```

---

## Step 8: Test Locally

### Option A: Test with Local Preview (Recommended)

```bash
# Terminal 1: Run local worker (connects to remote D1)
cd worker
wrangler dev --remote

# Terminal 2: Run frontend preview
npm run preview
```

Visit: `http://localhost:4173`

### Option B: Test with Dev Server

```bash
# Terminal 1: Run local worker
cd worker
wrangler dev --remote

# Terminal 2: Run frontend dev server
npm run dev
```

Visit: `http://localhost:5173`

---

## Verification Checklist

- [ ] D1 database created and `database_id` added to `wrangler.toml`
- [ ] Database migrations applied successfully
- [ ] Google OAuth credentials created
- [ ] Redirect URI added to Google Console
- [ ] All 3 secrets configured in Cloudflare Worker
- [ ] Worker deployed successfully
- [ ] `.env` file created with correct API URL
- [ ] Frontend builds without errors
- [ ] Local preview works and connects to API
- [ ] Can log in with Google OAuth

---

## Troubleshooting

### "Database not found" error
- Verify `database_id` in `wrangler.toml` matches the created database
- Run migrations again: `wrangler d1 migrations apply ops-forward-db --remote`

### "Unauthorized" on Google login
- Check redirect URI in Google Console matches exactly
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set correctly
- Check `GOOGLE_REDIRECT_URI` in `wrangler.toml` is correct

### CORS errors in browser
- Verify frontend URL is in `allowedOrigins` in `worker/src/index.js`
- Check `.env` has correct API URL
- Redeploy worker after any changes

### "Session not found" errors
- Verify `SESSION_SECRET` is set
- Clear browser cookies and try again
- Check session table exists: `wrangler d1 execute ops-forward-db --remote --command="SELECT * FROM sessions LIMIT 1"`

---

## Production Deployment

### Deploy Frontend to Cloudflare Pages

```bash
# Build frontend
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=ops-forward
```

### Update Production URLs

1. Update `wrangler.toml` `FRONTEND_URL` to your Pages URL
2. Update Google OAuth redirect URI to production worker URL
3. Update `.env` with production API URL
4. Redeploy worker: `wrangler deploy`

---

## Useful Commands

```bash
# View worker logs
wrangler tail

# View D1 database
wrangler d1 execute ops-forward-db --remote --command="SELECT * FROM sites LIMIT 5"

# List secrets
wrangler secret list

# Delete a secret
wrangler secret delete SECRET_NAME

# Test API health
curl https://ops-forward-api.YOUR_SUBDOMAIN.workers.dev/api/health
```
