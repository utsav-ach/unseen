-- Run this in Supabase SQL Editor to fix login immediately

-- 1. Disable email confirmation requirement
UPDATE auth.config 
SET value = 'false' 
WHERE parameter = 'enable_signup';

-- 2. If you have an existing account, confirm it manually
-- Replace 'your-email@example.com' with your actual email
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    confirmed_at = NOW()
WHERE email = 'your-email@example.com';

-- 3. Check your users
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- 4. If you want to delete old test accounts and start fresh
-- DELETE FROM auth.users WHERE email LIKE '%test%';
