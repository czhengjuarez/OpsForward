# Local Testing Guide

## Quick Start for Local Development

### Prerequisites
1. Complete database setup (see SETUP_INSTRUCTIONS.md Step 1-2)
2. Configure secrets (see SETUP_INSTRUCTIONS.md Step 4)
3. Create `worker/.dev.vars` file with your secrets

---

## Option 1: Local Worker + Preview (Recommended)

This setup uses the remote D1 database and runs both worker and frontend locally.

### Terminal 1: Start Worker (Port 8787)
```bash
cd worker
wrangler dev --remote
```

This will:
- Run worker on `http://localhost:8787`
- Connect to remote D1 database
- Use secrets from `worker/.dev.vars` or Cloudflare

### Terminal 2: Start Frontend Preview (Port 4173)
```bash
npm run preview
```

This will:
- Serve built frontend on `http://localhost:4173`
- Use `.env` configuration (API URL: `http://localhost:8787/api`)

### Access
- **Frontend**: http://localhost:4173
- **API**: http://localhost:8787/api
- **API Health**: http://localhost:8787/api/health

---

## Option 2: Local Worker + Dev Server

Use this for hot-reload during development.

### Terminal 1: Start Worker (Port 8787)
```bash
cd worker
wrangler dev --remote
```

### Terminal 2: Start Frontend Dev Server (Port 5173)
```bash
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **API**: http://localhost:8787/api

---

## Setup worker/.dev.vars

Create `worker/.dev.vars` file with your secrets:

```bash
cd worker
cat > .dev.vars << EOF
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
SESSION_SECRET=$(openssl rand -base64 32)
EOF
```

**Important**: Never commit `.dev.vars` to git!

---

## Testing Checklist

### 1. Test API Connection
```bash
curl http://localhost:8787/api/health
```

Expected response:
```json
{"status":"ok"}
```

### 2. Test Database Connection
```bash
curl http://localhost:8787/api/categories
```

Should return categories array (or empty array if not seeded).

### 3. Test Frontend
1. Open http://localhost:4173
2. Check browser console for errors
3. Try browsing catalog
4. Test Google login

### 4. Test CORS
Open browser console on http://localhost:4173 and check:
- No CORS errors
- API requests succeed
- Cookies are set properly

---

## Common Issues

### "Database not found"
- Ensure database is created: `wrangler d1 list`
- Check `database_id` in `wrangler.toml`
- Run migrations: `wrangler d1 migrations apply ops-forward-db --remote`

### "Unauthorized" on login
- Check `worker/.dev.vars` has correct Google credentials
- Verify redirect URI in Google Console includes `http://localhost:8787/api/auth/google/callback`
- Restart worker after changing `.dev.vars`

### CORS errors
- Verify `http://localhost:4173` is in `allowedOrigins` in `worker/src/index.js`
- Check `.env` has `VITE_API_URL=http://localhost:8787/api`
- Restart both worker and frontend

### Port already in use
```bash
# Kill process on port 8787
lsof -ti:8787 | xargs kill -9

# Kill process on port 4173
lsof -ti:4173 | xargs kill -9
```

---

## Development Workflow

1. **Make frontend changes**:
   - Edit files in `src/`
   - Changes auto-reload in dev server (port 5173)
   - Rebuild for preview: `npm run build`

2. **Make worker changes**:
   - Edit files in `worker/src/`
   - Restart `wrangler dev` to see changes
   - Deploy to test: `wrangler deploy`

3. **Database changes**:
   - Create migration in `worker/migrations/`
   - Apply: `wrangler d1 migrations apply ops-forward-db --remote`
   - Restart worker

---

## Useful Commands

### View Worker Logs
```bash
cd worker
wrangler dev --remote
# Logs appear in terminal
```

### Query Database
```bash
wrangler d1 execute ops-forward-db --remote --command="SELECT * FROM sites LIMIT 5"
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:8787/api/health

# Get categories
curl http://localhost:8787/api/categories

# Get sites
curl http://localhost:8787/api/sites

# Test with authentication (after login)
curl http://localhost:8787/api/auth/me \
  -H "Cookie: session=YOUR_SESSION_TOKEN"
```

---

## Production Testing

Before deploying to production:

1. **Test with production API**:
   ```bash
   # Update .env
   echo "VITE_API_URL=https://ops-forward-api.changying.workers.dev/api" > .env
   
   # Rebuild
   npm run build
   
   # Preview
   npm run preview
   ```

2. **Deploy worker**:
   ```bash
   wrangler deploy
   ```

3. **Test production API**:
   ```bash
   curl https://ops-forward-api.changying.workers.dev/api/health
   ```

4. **Deploy frontend** (Cloudflare Pages):
   ```bash
   wrangler pages deploy dist --project-name=ops-forward
   ```
