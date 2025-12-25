# 🔍 Debug Login Issue

## ✅ Progress So Far

- ✅ Google login prompt appeared
- ✅ `GOOGLE_CLIENT_ID` is fixed (no more newline)
- ❌ Login not completing after Google authentication

---

## 🔍 What to Check

### **1. Check Browser Console**

After clicking "Log in with Google" and authenticating:

1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for errors related to:
   - `callback`
   - `auth`
   - `CORS`
   - `session`
   - `cookie`

### **2. Check Network Tab**

1. Open DevTools (F12)
2. Go to **Network** tab
3. Click "Log in with Google"
4. After authenticating, look for:
   - Request to `/api/auth/google/callback`
   - Status code (should be 302 or 200)
   - Any failed requests (red)

### **3. Check Worker Logs**

I've started tailing the worker logs. Now:

1. Try logging in again
2. Watch for errors in the terminal

---

## 🎯 Common Issues After Google Prompt

### **Issue 1: Callback URL Mismatch**

**Symptom**: Redirects to error page or "redirect_uri_mismatch"

**Fix**: Verify Google Console has:
```
https://ops-forward-api.coscient.workers.dev/api/auth/google/callback
```

### **Issue 2: GOOGLE_CLIENT_SECRET Wrong**

**Symptom**: "invalid_client" or "unauthorized_client"

**Fix**: Reset the secret:
```bash
wrangler secret put GOOGLE_CLIENT_SECRET
# Paste secret, then Ctrl+D (not Enter!)
```

### **Issue 3: Cookie Not Being Set**

**Symptom**: Redirects back but not logged in

**Possible causes**:
- CORS issue
- Cookie SameSite settings
- Browser blocking third-party cookies

### **Issue 4: Database Error**

**Symptom**: Error creating user in database

**Check**: Database tables exist:
```bash
wrangler d1 execute ops-forward-db --remote --command="SELECT name FROM sqlite_master WHERE type='table'"
```

---

## 🧪 Test Steps

### **Step 1: Try Login Again**

1. Clear site data (F12 → Application → Storage → Clear site data)
2. Visit: https://ops-forward.coscient.workers.dev
3. Click "Log in"
4. Authenticate with Google
5. Watch what happens after authentication

### **Step 2: Check What URL You're Redirected To**

After Google authentication, you should be redirected to:
```
https://ops-forward-api.coscient.workers.dev/api/auth/google/callback?code=...
```

Then redirected back to:
```
https://ops-forward.coscient.workers.dev
```

If you see an error page, note the URL and error message.

### **Step 3: Check Cookies**

After login attempt:
1. F12 → Application → Cookies
2. Look for `session` cookie under `ops-forward.coscient.workers.dev`
3. If no cookie, there's a cookie-setting issue

---

## 📋 Information Needed

To debug further, I need to know:

1. **What happens after Google authentication?**
   - Redirects back to homepage?
   - Shows error page?
   - Stays on Google page?

2. **Any error messages?**
   - In browser console?
   - On the page?

3. **What's in Network tab?**
   - Status code of `/api/auth/google/callback` request?
   - Any failed requests?

4. **What's in worker logs?**
   - Check the terminal where `wrangler tail` is running
   - Any errors logged?

---

## 🔧 Quick Checks

```bash
# 1. Verify all secrets are set
wrangler secret list

# 2. Check database tables
wrangler d1 execute ops-forward-db --remote --command="SELECT name FROM sqlite_master WHERE type='table'"

# 3. Test API health
curl https://ops-forward-api.coscient.workers.dev/api/health

# 4. Check auth endpoint
curl "https://ops-forward-api.coscient.workers.dev/api/auth/google"
```

---

## 🎯 Next Steps

1. Try logging in again while watching:
   - Browser console (F12)
   - Network tab
   - Worker logs (terminal)

2. Report back:
   - What error you see (if any)
   - What URL you end up on
   - Any console errors

3. I'll help debug based on what you find!
