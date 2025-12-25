# Super Admin Setup

## ✅ Google OAuth Credentials Status

**Confirmed**: Google OAuth credentials are stored in the `ops-forward-api` worker:
- ✅ `GOOGLE_CLIENT_ID` - Configured
- ✅ `GOOGLE_CLIENT_SECRET` - Configured
- ⏳ `SESSION_SECRET` - Needs to be added

---

## 🔐 Step 1: Add SESSION_SECRET

Run this command and paste the generated secret:

```bash
wrangler secret put SESSION_SECRET
```

**Generated secret for you** (paste this when prompted):
```
rSjYR+jJjiSSkoGAXIQSWHmBxk7ztwBqW+PQN2yMOjM=
```

---

## 👤 Step 2: Make czheng.juarez@gmail.com Super Admin

### **Option A: After First Login (Recommended)**

1. **First, log in to the site with Google**:
   - Visit: https://ops-forward.coscient.workers.dev
   - Click "Log in" and authenticate with `czheng.juarez@gmail.com`
   - This creates your user account in the database

2. **Then, upgrade to super admin**:
   ```bash
   wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"
   ```

3. **Verify**:
   ```bash
   wrangler d1 execute ops-forward-db --remote --command="SELECT email, role FROM users WHERE email = 'czheng.juarez@gmail.com'"
   ```

### **Option B: Pre-create Super Admin (Alternative)**

If you want to set up the super admin before first login, you'll need to know your Google ID. After first login, you can check:

```bash
# Check your Google ID after first login
wrangler d1 execute ops-forward-db --remote --command="SELECT google_id, email, role FROM users WHERE email = 'czheng.juarez@gmail.com'"
```

---

## 🧪 Testing

### **1. Add SESSION_SECRET**
```bash
wrangler secret put SESSION_SECRET
# Paste: rSjYR+jJjiSSkoGAXIQSWHmBxk7ztwBqW+PQN2yMOjM=
```

### **2. Verify all secrets are set**
```bash
wrangler secret list
```

Should show:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- SESSION_SECRET

### **3. Test login**
1. Visit: https://ops-forward.coscient.workers.dev
2. Click "Log in"
3. Authenticate with Google using `czheng.juarez@gmail.com`
4. Should successfully log in and redirect back

### **4. Upgrade to super admin**
```bash
wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"
```

### **5. Verify super admin status**
```bash
wrangler d1 execute ops-forward-db --remote --command="SELECT email, role, is_active FROM users WHERE email = 'czheng.juarez@gmail.com'"
```

Expected output:
```
email: czheng.juarez@gmail.com
role: super_admin
is_active: 1
```

### **6. Test admin features**
1. Log in to the site
2. Visit: https://ops-forward.coscient.workers.dev/admin
3. Should see admin panel with:
   - Pending sites
   - All sites management
   - User management
   - Invite system

---

## 📋 Quick Command Reference

```bash
# Add SESSION_SECRET
wrangler secret put SESSION_SECRET

# After first login, make super admin
wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"

# Verify user
wrangler d1 execute ops-forward-db --remote --command="SELECT * FROM users WHERE email = 'czheng.juarez@gmail.com'"

# List all users
wrangler d1 execute ops-forward-db --remote --command="SELECT email, role FROM users"

# Check secrets
wrangler secret list
```

---

## 🎯 Summary

**Action 1: Google Credentials** ✅
- Confirmed stored in `ops-forward-api` worker
- GOOGLE_CLIENT_ID: ✅ Set
- GOOGLE_CLIENT_SECRET: ✅ Set
- SESSION_SECRET: ⏳ Need to add (secret generated above)

**Action 2: Super Admin Setup** 📝
1. Add SESSION_SECRET (command above)
2. Log in once with `czheng.juarez@gmail.com`
3. Run SQL command to upgrade to super_admin
4. Verify and test admin features

---

## 🔑 Your Session Secret

**Copy this for SESSION_SECRET**:
```
rSjYR+jJjiSSkoGAXIQSWHmBxk7ztwBqW+PQN2yMOjM=
```

Run:
```bash
wrangler secret put SESSION_SECRET
```
Then paste the secret above when prompted.
