# Quick Start Guide

## ✅ Your Website is Ready!

The authentication is working! Here's what you need to know:

## Current Status

✅ Database connected
✅ Authentication working
✅ Signup working
✅ Login working
✅ All pages created

## How to Use

### 1. Create an Account

1. Go to http://localhost:3000/auth/signup
2. Fill in your details
3. Click "Create Account"
4. **Important:** Check your email for confirmation link
5. Click the confirmation link in your email

### 2. Login

1. Go to http://localhost:3000/auth/login
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the home page

### 3. Common Issues & Solutions

#### "User already registered"
- You've already signed up with this email
- Just go to login page instead

#### "Invalid login credentials"
- Check your email and password are correct
- Make sure you confirmed your email
- Password is case-sensitive

#### "Auth session missing"
- This is normal for protected pages
- Just login first

### 4. Email Confirmation

Supabase sends confirmation emails by default. You have two options:

**Option A: Check Your Email**
- Look for email from Supabase
- Click the confirmation link
- Then you can login

**Option B: Disable Email Confirmation (for testing)**
1. Go to Supabase Dashboard
2. Authentication → Providers → Email
3. Turn OFF "Confirm email"
4. Save
5. Now you can login immediately after signup

## Testing the Website

### Test User Flow
1. ✅ Signup → Check email → Confirm → Login
2. ✅ Browse destinations
3. ✅ Read stories
4. ✅ View guides
5. ✅ Check your profile

### Test Guide Flow
1. Login as user
2. Go to /guides/apply
3. Fill application
4. Wait for admin approval (or approve yourself as admin)

### Make Yourself Admin

Run this in Supabase SQL Editor:

```sql
-- Replace with your email
UPDATE profiles 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

Then go to /admin to manage applications.

## All Available Pages

### Public Pages
- `/` - Home
- `/destinations` - Browse destinations
- `/destinations/[slug]` - Destination details
- `/stories` - Browse stories
- `/stories/[slug]` - Story details
- `/guides` - Browse guides
- `/guides/[id]` - Guide profile

### Auth Pages
- `/auth/signup` - Create account
- `/auth/login` - Sign in
- `/auth/confirm` - Email confirmation

### Protected Pages (require login)
- `/profile` - Your profile
- `/bookings` - Your bookings
- `/guides/apply` - Apply to be guide

### Admin Pages (require admin role)
- `/admin` - Admin dashboard

### Utility Pages
- `/test-db` - Test database connection

## Next Steps

1. ✅ Create your account
2. ✅ Confirm your email
3. ✅ Login
4. ✅ Explore the website
5. ✅ Apply to be a guide (optional)
6. ✅ Make yourself admin (optional)

## Tips

- Use a real email for testing (Supabase sends real emails)
- Or disable email confirmation in Supabase settings
- Check browser console for any errors
- All data is stored in your Supabase database

## Support

If something doesn't work:
1. Check browser console (F12)
2. Check Supabase logs
3. Verify database schema is applied
4. Make sure you confirmed your email

---

**Your website is fully functional and ready to use!** 🎉
