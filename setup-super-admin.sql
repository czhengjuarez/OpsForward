-- Setup super admin user for czheng.juarez@gmail.com
-- This will be executed after first Google login

-- First, we need to wait for the user to log in via Google OAuth
-- Then we can update their role to super_admin

-- To manually set super admin after first login, run:
-- wrangler d1 execute ops-forward-db --remote --command="UPDATE users SET role = 'super_admin' WHERE email = 'czheng.juarez@gmail.com'"

-- Or insert directly if you know the Google ID:
-- INSERT INTO users (id, google_id, email, name, role, is_active, created_at, last_login, updated_at)
-- VALUES ('user_' || hex(randomblob(16)), 'GOOGLE_ID_HERE', 'czheng.juarez@gmail.com', 'Changying Zheng', 'super_admin', 1, unixepoch() * 1000, unixepoch() * 1000, unixepoch() * 1000)
-- ON CONFLICT(email) DO UPDATE SET role = 'super_admin';

-- For now, we'll create a query that will work after first login:
UPDATE users 
SET role = 'super_admin' 
WHERE email = 'czheng.juarez@gmail.com';
