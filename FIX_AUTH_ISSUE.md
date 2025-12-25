# 🔧 Fix Authentication Issue

## ❌ Problem Found

Your `GOOGLE_CLIENT_ID` secret has a **newline character** at the end, which breaks Google OAuth.

**Evidence from API response**:
```         
client_id=71030625936-h7ghnikmdni5aghrcf1rijps16oroi76.apps.googleusercontent.com%0A
                                                                                    ^^^^
                                                                            This is a newline!
```

This happens when you accidentally press Enter after pasting the Client ID.

---

## ✅ Solution

Reset the `GOOGLE_CLIENT_ID` secret **without** the newline:

```bash
wrangler secret put GOOGLE_CLIENT_ID
```

**When prompted**:
1. Paste your Client ID: `71030625936-h7ghnikmdni5aghrcf1rijps16oroi76.apps.googleusercontent.com`
2. **DO NOT press Enter after pasting**
3. Press Ctrl+D (or Cmd+D on Mac) to submit

---

## 🧪 Test After Fixing

### 1. Reset the secret
```bash
wrangler secret put GOOGLE_CLIENT_ID
# Paste: 71030625936-h7ghnikmdni5aghrcf1rijps16oroi76.apps.googleusercontent.com
# Press Ctrl+D (not Enter!)
```

### 2. Verify the auth URL
```bash
curl "https://ops-forward-api.coscient.workers.dev/api/auth/google"
```

Should return a clean URL without `%0A`:
```json
{"url":"https://accounts.google.com/o/oauth2/v2/auth?client_id=71030625936-h7ghnikmdni5aghrcf1rijps16oroi76.apps.googleusercontent.com&redirect_uri=..."}
```

### 3. Test login
1. Visit: https://ops-forward.coscient.workers.dev
2. Click "Log in"
3. Should redirect to Google login successfully

---

## 📋 Your Current Secrets

```bash
wrangler secret list
```

Should show:
- ✅ GOOGLE_CLIENT_ID (needs to be reset)
- ✅ GOOGLE_CLIENT_SECRET
- ✅ SESSION_SECRET

---

## 🎯 Quick Fix Command

```bash
# Reset GOOGLE_CLIENT_ID (paste without newline)
wrangler secret put GOOGLE_CLIENT_ID
```

**Your Client ID** (copy this exactly):
```
71030625936-h7ghnikmdni5aghrcf1rijps16oroi76.apps.googleusercontent.com
```

After pasting, press **Ctrl+D** (not Enter) to submit.

---

## 🔍 Why This Happened

When you run `wrangler secret put`, it reads until you press Ctrl+D. If you press Enter after pasting, it includes that newline in the secret value, which breaks the OAuth URL.

**Wrong way**:
```bash
$ wrangler secret put GOOGLE_CLIENT_ID
✔ Enter a secret value: … 71030625936-...com
                                           ↑ pressed Enter (adds newline!)
```

**Right way**:
```bash
$ wrangler secret put GOOGLE_CLIENT_ID
✔ Enter a secret value: … 71030625936-...com↑ pressed Ctrl+D (no newline!)
```

---

## ✅ After Fixing

Once you reset the `GOOGLE_CLIENT_ID` secret:
1. Authentication will work
2. You can log in with `czheng.juarez@gmail.com`
3. Then run the super admin command:
   ```bash
   wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"
   ```
