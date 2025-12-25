# 🔧 Fix Chrome Storage Error

## ❌ Error

```
IO error: .../011377.ldb: Unable to create writable file (ChromeMethodBFE: 9::NewWritableFile::8)
```

This is a **Chrome browser storage issue**, not a problem with your app. It happens when Chrome's IndexedDB or local storage is corrupted or has permission issues.

---

## ✅ Quick Fixes (Try in Order)

### **Fix 1: Clear Site Data (Fastest)**

1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. In left sidebar, click **Storage**
4. Click **Clear site data** button
5. Refresh the page

### **Fix 2: Clear Browser Cache**

1. Chrome Settings → Privacy and Security → Clear browsing data
2. Select:
   - ✅ Cookies and other site data
   - ✅ Cached images and files
3. Time range: **Last 24 hours**
4. Click **Clear data**
5. Restart Chrome

### **Fix 3: Incognito Mode (Test)**

Open your site in Incognito/Private mode:
```
https://ops-forward.coscient.workers.dev
```

If it works in Incognito, the issue is definitely browser storage.

### **Fix 4: Reset Chrome Profile (Last Resort)**

If nothing else works:
1. Chrome Settings → Reset settings
2. Restore settings to their original defaults
3. Or create a new Chrome profile

---

## 🎯 Recommended Solution

**Clear site data for your domain**:

1. Visit: https://ops-forward.coscient.workers.dev
2. Press **F12** (open DevTools)
3. Go to **Application** tab
4. Left sidebar → **Storage**
5. Click **Clear site data**
6. Refresh page (Cmd+R or Ctrl+R)

This removes all local storage, cookies, and IndexedDB for your site without affecting other sites.

---

## 🔍 What This Error Means

- **Not a server error** - Your worker is fine
- **Not an auth error** - OAuth is working
- **Browser storage issue** - Chrome can't write to local storage

Common causes:
- Disk full (unlikely)
- Corrupted IndexedDB
- Browser extension conflict
- Chrome profile corruption

---

## ✅ After Fixing

Once you clear site data:
1. Visit: https://ops-forward.coscient.workers.dev
2. Click "Log in"
3. Should work normally

---

## 🆘 Still Not Working?

Try these:
1. **Different browser** - Test in Firefox or Safari
2. **Disable extensions** - Some extensions block storage
3. **Check disk space** - Ensure you have free space
4. **Update Chrome** - Make sure you're on latest version

---

## 📝 Note About Auth

You still need to fix the `GOOGLE_CLIENT_ID` newline issue from the previous error. Do both:

1. **Fix Chrome storage** (this error)
2. **Fix GOOGLE_CLIENT_ID** (previous error)

Then authentication will work properly.
