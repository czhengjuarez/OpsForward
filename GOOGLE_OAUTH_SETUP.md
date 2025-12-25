# Google OAuth Setup - Redirect URIs

## 🔐 Redirect URIs to Add in Google Console

Go to: https://console.cloud.google.com/apis/credentials

When creating or editing your OAuth 2.0 Client ID, add these **Authorized redirect URIs**:

---

## ✅ Required Redirect URIs

### **1. Live Site (Production)**
```
https://ops-forward-api.coscient.workers.dev/api/auth/google/callback
```

### **2. Local Testing**
```
http://localhost:8787/api/auth/google/callback
```

---

## 📋 Step-by-Step Instructions

### **1. Go to Google Cloud Console**
https://console.cloud.google.com/apis/credentials

### **2. Create or Select OAuth 2.0 Client ID**
- If creating new: Click **Create Credentials** → **OAuth 2.0 Client ID**
- If editing: Click on your existing OAuth 2.0 Client ID

### **3. Configure OAuth Consent Screen** (if prompted)
- User Type: **External**
- App name: **OpsForward** (or your preferred name)
- User support email: Your email
- Developer contact: Your email

### **4. Add Authorized Redirect URIs**

**For Live Site:**
```
https://ops-forward-api.coscient.workers.dev/api/auth/google/callback
```

**For Local Testing:**
```
http://localhost:8787/api/auth/google/callback
```

### **5. Save and Copy Credentials**
- Copy **Client ID**
- Copy **Client Secret**

---

## 🔧 Configure Worker Secrets

After getting your credentials, run:

```bash
# Set Google Client ID
wrangler secret put GOOGLE_CLIENT_ID
# Paste your Client ID when prompted

# Set Google Client Secret
wrangler secret put GOOGLE_CLIENT_SECRET
# Paste your Client Secret when prompted

# Set Session Secret (generate random string)
wrangler secret put SESSION_SECRET
# Generate with: openssl rand -base64 32
```

---

## 🧪 Testing

### **Test Live Site**
1. Visit: https://ops-forward.coscient.workers.dev
2. Click "Log in" or "Submit Your Site"
3. Should redirect to Google login
4. After login, should redirect back to your site

### **Test Local**
1. Start local worker:
   ```bash
   cd worker
   wrangler dev --remote
   ```

2. Start frontend:
   ```bash
   npm run preview
   ```

3. Visit: http://localhost:4173
4. Click login - should work with localhost callback

---

## 📝 Summary

**Add these 2 URLs to Google Console:**

| Environment | Redirect URI |
|-------------|--------------|
| **Live** | `https://ops-forward-api.coscient.workers.dev/api/auth/google/callback` |
| **Local** | `http://localhost:8787/api/auth/google/callback` |

**Important Notes:**
- The redirect URI must match **exactly** (including https/http, port, path)
- Live site uses **https** and port **443** (default)
- Local testing uses **http** and port **8787**
- The callback path is always `/api/auth/google/callback`

---

## 🔍 Troubleshooting

### **"redirect_uri_mismatch" error**
- Check the URL in the error message
- Ensure it's added **exactly** in Google Console
- No trailing slashes
- Correct protocol (https vs http)

### **"Unauthorized" after login**
- Verify secrets are set: `wrangler secret list`
- Check worker logs: `wrangler tail`
- Ensure `GOOGLE_REDIRECT_URI` in `wrangler.toml` matches

### **Local testing not working**
- Ensure worker is running on port 8787: `wrangler dev --remote`
- Check `worker/.dev.vars` has correct credentials
- Restart worker after changing `.dev.vars`

---

## 🌐 Your Current Configuration

**Live Site:**
- Frontend: https://ops-forward.coscient.workers.dev
- Backend: https://ops-forward-api.coscient.workers.dev
- Callback: https://ops-forward-api.coscient.workers.dev/api/auth/google/callback

**Local Testing:**
- Frontend: http://localhost:4173
- Backend: http://localhost:8787
- Callback: http://localhost:8787/api/auth/google/callback
