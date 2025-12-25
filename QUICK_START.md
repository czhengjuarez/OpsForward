# Quick Start - OpsForward

## 🚀 Get Running in 5 Minutes

### Step 1: Create Database (2 min)
```bash
# Create D1 database
wrangler d1 create ops-forward-db

# Copy the database_id from output and update wrangler.toml line 12
```

### Step 2: Run Migrations (1 min)
```bash
# Apply schema
wrangler d1 execute ops-forward-db --remote --file=worker/schema.sql

# Apply migrations
wrangler d1 migrations apply ops-forward-db --remote
```

### Step 3: Setup Google OAuth (2 min)
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add redirect URI: `http://localhost:8787/api/auth/google/callback`
4. Copy Client ID and Secret

### Step 4: Configure Secrets
```bash
cd worker

# Create .dev.vars file
cat > .dev.vars << EOF
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
SESSION_SECRET=$(openssl rand -base64 32)
EOF
```

### Step 5: Start Development
```bash
# Terminal 1: Start worker
cd worker
wrangler dev --remote

# Terminal 2: Start frontend
npm run preview
```

### Step 6: Test
Open http://localhost:4173

---

## 📋 What You Need

- [x] Cloudflare account
- [x] Google Cloud Console account
- [x] Node.js 18+
- [x] Wrangler CLI (`npm install -g wrangler`)

---

## 🎯 Next Steps

1. **Test locally**: Follow LOCAL_TESTING.md
2. **Deploy to production**: Follow SETUP_INSTRUCTIONS.md
3. **Customize**: Edit colors, content, features

---

## ⚡ Commands Reference

```bash
# Development
npm run dev              # Frontend dev server (port 5173)
npm run preview          # Frontend preview (port 4173)
cd worker && wrangler dev --remote  # Worker dev (port 8787)

# Build & Deploy
npm run build            # Build frontend
wrangler deploy          # Deploy worker

# Database
wrangler d1 list         # List databases
wrangler d1 execute ops-forward-db --remote --command="SELECT * FROM sites"

# Logs
wrangler tail            # View worker logs
```

---

## 🆘 Need Help?

- **Setup issues**: See SETUP_INSTRUCTIONS.md
- **Local testing**: See LOCAL_TESTING.md
- **API errors**: Check worker logs with `wrangler tail`
- **Database issues**: Verify migrations with `wrangler d1 list`
