# OpsForward - Living Catalog

A modern site showcase platform built with Cloudflare Workers, React, and Tailwind CSS. Users can submit, browse, and discover beautiful websites with an admin approval workflow. A sandbox for the Ops team and beyond, bridging the gap between design and code.

## 🚀 Live Demo

- **Frontend**: https://ops-forward.coscient.workers.dev
- **API**: https://ops-forward-api.coscient.workers.dev

## ✅ What's Working

### Core Features (Phases 1-4, 7)

#### 1. **User Interface**
- ✅ Modern, responsive design with light/dark theme
- ✅ Beautiful UI using Cloudflare Kumo components
- ✅ Home page with featured sites
- ✅ Browse page with filtering by category
- ✅ Site detail pages
- ✅ Search page (UI only, backend pending)

#### 2. **Authentication**
- ✅ Google OAuth integration
- ✅ Session management with secure cookies
- ✅ Protected routes for authenticated users
- ✅ User profile menu

#### 3. **Site Submission**
- ✅ Submit site form with validation
- ✅ Site metadata (name, URL, description, category, tags)
- ✅ **Rich Text Editor** - WYSIWYG editor for formatted descriptions (bold, italic, headings, lists, links)
- ✅ Sites saved to Cloudflare D1 database
- ✅ Pending approval workflow

#### 4. **Site Management**
- ✅ User dashboard to view submitted sites
- ✅ Edit site details
- ✅ Delete sites
- ✅ View submission status (pending/approved/rejected)

#### 5. **Admin Panel** (Phase 7)
- ✅ Admin page at `/admin`
- ✅ View all pending submissions
- ✅ Approve sites (publishes to Browse page)
- ✅ Reject sites (hides from public view)
- ✅ Visit button to preview sites
- ✅ Authentication-protected admin routes
- ✅ **Category Management** - Create and delete categories
- ✅ **User Management** - View users, upgrade to admin
- ✅ **Invite System** - Create invite codes for new users
- ✅ **Super Admin Role** - Full access to all admin features

#### 6. **Browse & Discovery**
- ✅ Browse all approved sites
- ✅ Filter by category (SaaS, Portfolio, E-commerce, etc.)
- ✅ Sort by newest/oldest
- ✅ Pagination
- ✅ Placeholder gradients for sites without screenshots

## 🎨 Tailwind CSS v4 - Important Notes

This project uses **Tailwind CSS v4**, which has significant breaking changes from v3. Understanding these differences is critical for styling to work correctly.

### Key Differences from v3

#### ❌ What Doesn't Work Anymore
1. **`tailwind.config.js` for theme colors** - Config file is ignored for custom colors
2. **`extend.colors` in config** - Theme extensions must be in CSS
3. **Traditional `@tailwind` directives** - Use `@import 'tailwindcss'` instead

#### ✅ What You Must Do Instead

**1. Define Custom Colors in CSS using `@theme`**

In `src/index.css`:
```css
@import 'tailwindcss';

@theme {
  --color-primary-50: #fdf2f7;
  --color-primary-100: #fce7f0;
  --color-primary-200: #fad1e3;
  --color-primary-300: #f5a8ca;
  --color-primary-400: #ee74a7;
  --color-primary-500: #e34584;
  --color-primary-600: #c92d6a;
  --color-primary-700: #8F1F57;  /* Main brand color */
  --color-primary-800: #751a48;
  --color-primary-900: #5f173c;
  --color-primary-950: #3a0d23;
  --color-primary: #8F1F57;
}
```

**2. Use Vite Plugin**

In `vite.config.js`:
```js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()]
})
```

**3. Dark Mode Variant**

Define dark mode in CSS:
```css
@variant dark (&:where(.dark, .dark *));
```

### Common Issues & Solutions

#### Issue: Custom colors not applying
**Cause**: Colors defined in `tailwind.config.js` instead of CSS  
**Solution**: Move all color definitions to `@theme` block in CSS

#### Issue: `bg-primary-700` shows as gray/default
**Cause**: CSS variables not defined with correct naming convention  
**Solution**: Use `--color-{name}-{shade}` format (note the `color-` prefix)

#### Issue: Build works but colors don't show in browser
**Cause**: Browser cache or old build artifacts  
**Solution**: Hard refresh (Cmd+Shift+R) and clear site data

### Migration Checklist

If migrating from v3 to v4:
- [ ] Remove color definitions from `tailwind.config.js`
- [ ] Add `@theme` block to main CSS file
- [ ] Define colors as `--color-{name}-{shade}`
- [ ] Change `@tailwind` to `@import 'tailwindcss'`
- [ ] Add `@tailwindcss/vite` plugin
- [ ] Test all custom colors in browser
- [ ] Clear browser cache after deployment

### Resources
- [Tailwind v4 Beta Docs](https://tailwindcss.com/docs/v4-beta)
- [v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

---

## ⚠️ What's Missing (Known Issues)

### Phase 5: AI Semantic Search
**Status**: Backend implemented but not working

- ❌ **AI Embeddings**: Backend code ready, but Workers AI times out
  - `generateSiteEmbedding()` function starts but doesn't complete
  - No embeddings saved to Vectorize index
  - Issue: Workers AI API appears to timeout silently
  
- ❌ **Semantic Search**: Cannot search by meaning/description
  - Search UI exists but returns no results
  - Vectorize index is empty (no embeddings)

**Root Cause**: Cloudflare Workers AI API starts execution but times out after 60+ seconds without logging errors. May require account-level API access verification or paid plan.

### Phase 6: Automatic Screenshots
**Status**: Backend implemented but not working

- ❌ **Screenshot Capture**: Browser Rendering API times out
  - `@cloudflare/puppeteer` installed and configured
  - Browser launches but screenshot capture doesn't complete
  - No screenshots saved to R2 bucket
  - Issue: Browser Rendering API times out even for simple sites like google.com

- ❌ **Thumbnail Generation**: Depends on screenshot capture

**Root Cause**: Cloudflare Browser Rendering API launches browser but times out during page load/screenshot capture. Tested with simple sites (google.com, example.com) - all timeout. May require additional API enablement or account verification.

**Current Workaround**: Sites display with beautiful gradient placeholders instead of screenshots.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Cloudflare Kumo** - Component library and design system
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Phosphor Icons** - Icon library
- **React Quill** - WYSIWYG rich text editor
- **DOMPurify** - HTML sanitization for safe rendering

### Backend
- **Cloudflare Workers** - Serverless compute
- **Cloudflare D1** - SQLite database
- **Cloudflare R2** - Object storage (for screenshots)
- **Cloudflare Vectorize** - Vector database (for AI embeddings)
- **Cloudflare Workers AI** - AI/ML inference (not working)
- **Cloudflare Browser Rendering** - Headless browser (not working)

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm
- Cloudflare account with Workers enabled
- Wrangler CLI (`npm install -g wrangler`)
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd px-tester
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` file:
```
VITE_API_URL=https://ops-forward-api.coscient.workers.dev/api
```

4. **Set up Cloudflare Workers secrets**

**IMPORTANT**: When setting secrets, paste the value and press **Ctrl+D** (not Enter) to avoid adding newline characters.

```bash
wrangler secret put GOOGLE_CLIENT_ID
# Paste value, then Ctrl+D (NOT Enter!)

wrangler secret put GOOGLE_CLIENT_SECRET
# Paste value, then Ctrl+D (NOT Enter!)

wrangler secret put SESSION_SECRET
# Generate with: openssl rand -base64 32
# Paste value, then Ctrl+D (NOT Enter!)
```

### Development

**Frontend**:
```bash
npm run dev
```
Opens at `http://localhost:5173`

**Backend** (local):
```bash
wrangler dev
```

### Deployment

**Deploy Backend**:
```bash
wrangler deploy
```

**Deploy Frontend**:
```bash
npm run build
wrangler deploy --config wrangler-frontend.toml
```

## 📁 Project Structure

```
px-tester/
├── src/                      # Frontend React app
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Shared components
│   │   └── layout/         # Layout components (Header, Footer)
│   ├── contexts/           # React contexts (AuthContext)
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── SiteDetail.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SubmitSite.jsx
│   │   └── Admin.jsx       # Admin approval panel
│   ├── services/           # API services
│   └── App.jsx
├── worker/src/              # Backend Cloudflare Worker
│   ├── index.js            # Main worker entry point
│   ├── routes.js           # API route handlers
│   ├── admin-routes.js     # Admin route handlers
│   ├── auth.js             # Authentication logic
│   ├── ai.js               # AI embeddings (not working)
│   └── screenshots.js      # Screenshot capture (not working)
├── wrangler.toml           # Backend worker config
├── wrangler-frontend.toml  # Frontend worker config
└── package.json
```

## 🗄️ Database Schema

**D1 Tables**:
- `users` - User accounts from Google OAuth
- `sessions` - User sessions
- `sites` - Submitted sites with metadata

**Vectorize Index**:
- `px-tester-embeddings` - AI embeddings (empty, not working)

**R2 Bucket**:
- `px-tester-screenshots` - Site screenshots (empty, not working)

## 🔧 Configuration Files

- `wrangler.toml` - Backend worker configuration with D1, R2, Vectorize, AI, and Browser bindings
- `wrangler-frontend.toml` - Frontend static site configuration
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - TailwindCSS configuration

## 🚦 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Sites
- `GET /api/sites` - List approved sites (with filters)
- `GET /api/sites/:id` - Get site details
- `POST /api/sites` - Submit new site (authenticated)
- `PUT /api/sites/:id` - Update site (authenticated)
- `DELETE /api/sites/:id` - Delete site (authenticated)
- `GET /api/sites/my` - Get user's sites (authenticated)

### Admin
- `GET /api/admin/pending` - List pending sites (authenticated)
- `POST /api/admin/sites/:id/approve` - Approve site (authenticated)
- `POST /api/admin/sites/:id/reject` - Reject site (authenticated)
- `GET /api/admin/users` - List all users (super admin)
- `POST /api/admin/users/:id/upgrade` - Upgrade user to admin (super admin)
- `DELETE /api/admin/users/:id` - Delete user (super admin)
- `POST /api/admin/invites` - Create invite code (super admin)
- `GET /api/admin/invites` - List all invites (super admin)
- `DELETE /api/admin/invites/:code` - Revoke invite (super admin)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (super admin)
- `DELETE /api/categories/:id` - Delete category (super admin)

## 🐛 Known Issues & Troubleshooting

### AI Embeddings Not Generating
**Symptoms**: Sites submitted but `embedding_id` remains null in database

**Attempted Fixes**:
- ✅ Workers AI binding configured
- ✅ `@cf/baai/bge-base-en-v1.5` model specified
- ✅ `ctx.waitUntil()` used to keep worker alive
- ❌ Still times out after 60+ seconds

**Possible Solutions**:
1. Contact Cloudflare Support about Workers AI access
2. Verify account has Workers AI enabled
3. Try different AI model
4. Use external AI service (OpenAI, Cohere)

### Screenshots Not Capturing
**Symptoms**: Browser launches but screenshot remains null

**Attempted Fixes**:
- ✅ `@cloudflare/puppeteer` installed
- ✅ `nodejs_compat` flag enabled
- ✅ Browser Rendering API binding configured
- ✅ Reduced timeouts to 15 seconds
- ❌ Still times out even for simple sites

**Possible Solutions**:
1. Contact Cloudflare Support about Browser Rendering API access
2. Verify account has Browser Rendering enabled
3. Use external screenshot service (ScreenshotAPI, Urlbox)
4. Disable feature and use placeholders (current workaround)

## 📈 Project Status

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | UI/UX Foundation | ✅ Complete |
| 2 | Backend & Database | ✅ Complete |
| 3 | Authentication | ✅ Complete (Google OAuth) |
| 4 | Site Submission | ✅ Complete |
| 5 | AI Semantic Search | ⚠️ Backend ready, API not working |
| 6 | Screenshot Capture | ⚠️ Backend ready, API not working |
| 7 | Admin Panel | ✅ Complete |
| 8 | User Management | ✅ Complete (roles, invites, category mgmt) |
| 9 | Tailwind v4 Migration | ✅ Complete |

## 🎯 Next Steps

1. **Resolve Cloudflare API Issues**:
   - Contact support about Workers AI and Browser Rendering API access
   - Verify account tier and API limits

2. **Alternative Implementations**:
   - Integrate external screenshot service
   - Integrate external AI/embedding service

3. **Phase 8 Features**:
   - User roles (admin, super admin)
   - User management interface
   - Ban/unban functionality
   - Admin activity logs

## 📝 Notes

- The app is **fully functional** for core features (submission, browsing, admin approval, user management)
- AI and screenshot features are **optional enhancements** that don't block core functionality
- Gradient placeholders provide a beautiful fallback for missing screenshots
- The codebase is **production-ready** for the working features
- **Tailwind v4** requires CSS-based theme configuration - see Tailwind v4 section above
- Brand color: `#8F1F57` (burgundy/wine red)
- Google OAuth is fully working for authentication
- Invite system allows controlled user registration

## License

MIT
