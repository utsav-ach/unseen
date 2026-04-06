-- Run this in Supabase SQL Editor to make yourself an admin
-- Replace 'your@email.com' with your actual email

-- Option 1: Make user admin by email
UPDATE profiles 
SET is_admin = true, 
    role = 'admin',
    is_verified = true
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'your@email.com'
);

-- Option 2: Make ALL users admin (for testing only!)
-- UPDATE profiles 
-- SET is_admin = true, 
--     role = 'admin',
--     is_verified = true;

-- Verify the change
SELECT 
    p.id,
    u.email,
    p.first_name,
    p.last_name,
    p.role,
    p.is_admin,
    p.is_verified
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.is_admin = true;
