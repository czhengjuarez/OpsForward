# 🔧 Fix GOOGLE_CLIENT_SECRET

## ❌ Problem

You're getting `auth_failed` after Google login. This is almost certainly because `GOOGLE_CLIENT_SECRET` has the same newline issue as `GOOGLE_CLIENT_ID` did.

The callback handler catches the error when trying to exchange the OAuth code for tokens, which fails if the client secret is malformed.

---

## ✅ Solution

Reset `GOOGLE_CLIENT_SECRET` **without** a newline:

```bash
wrangler secret put GOOGLE_CLIENT_SECRET
```

**When prompted**:
1. Paste your Client Secret
2. **Press Ctrl+D** (or Cmd+D on Mac) - **DO NOT press Enter!**

---

## 🧪 Test After Fixing

### **Step 1: Reset the secret**
```bash
wrangler secret put GOOGLE_CLIENT_SECRET
# Paste your secret, then Ctrl+D (not Enter!)
```

### **Step 2: Clear browser data**
1. F12 → Application → Storage → Clear site data
2. Refresh page

### **Step 3: Try login again**
1. Visit: https://ops-forward.coscient.workers.dev
2. Click "Log in"
3. Authenticate with Google
4. Should successfully log in this time

---

## 🔍 Why This Happens

When you set secrets with `wrangler secret put`:
- It reads input until you press **Ctrl+D**
- If you press **Enter** after pasting, it includes the newline
- Google OAuth rejects secrets with newlines

**Both secrets need to be set correctly**:
- ✅ `GOOGLE_CLIENT_ID` - You already fixed this
- ⏳ `GOOGLE_CLIENT_SECRET` - Fix this now

---

## 📋 After Fixing

Once you reset `GOOGLE_CLIENT_SECRET`:

1. **Login will work**
2. **Make yourself super admin**:
   ```bash
   wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"
   ```

3. **Verify**:
   ```bash
   wrangler d1 execute ops-forward-db --remote --command="SELECT email, role FROM users WHERE email = 'czheng.juarez@gmail.com'"
   ```

---

## 🎯 Summary

**The Issue**: `GOOGLE_CLIENT_SECRET` has a newline character

**The Fix**: 
```bash
wrangler secret put GOOGLE_CLIENT_SECRET
# Paste secret, then Ctrl+D (NOT Enter!)
```

**Then**: Login will work, and you can make yourself super admin.
