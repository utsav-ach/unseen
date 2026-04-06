# Setup Instructions

## Critical: Database Setup Required

Before the website can work, you MUST set up the database schema in Supabase.

## Step 1: Apply Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gwhfdibumtvrritxpoxp
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the ENTIRE content of `full-schema.sql` file
5. Paste it into the SQL Editor
6. Click "Run" or press Ctrl+Enter
7. Wait for it to complete (should take 10-30 seconds)

## Step 2: Verify Tables Created

1. Go to "Table Editor" in the left sidebar
2. You should see these tables:
   - profiles
   - guides
   - guide_applications
   - guide_service_areas
   - bookings
   - reviews
   - stories
   - story_likes
   - story_comments
   - featured_destinations

## Step 3: Create Storage Buckets

Run this in SQL Editor:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('profile_pics', 'profile_pics', true),
  ('vault', 'vault', false)
ON CONFLICT (id) DO NOTHING;
```

## Step 4: Configure Email Settings (Important!)

By default, Supabase requires email confirmation. You have two options:

### Option A: Disable Email Confirmation (For Development)
1. Go to Authentication > Settings in Supabase Dashboard
2. Scroll to "Email Auth"
3. Toggle OFF "Enable email confirmations"
4. Save changes

### Option B: Use Email Confirmation (Recommended for Production)
1. Keep email confirmation enabled
2. After signup, check your email inbox
3. Click the confirmation link
4. Then you can login

## Step 5: Test the Application

1. Start the dev server: `npm run dev`
2. Go to http://localhost:3000
3. Try to sign up: http://localhost:3000/auth/signup
4. If email confirmation is enabled, check your email
5. Login: http://localhost:3000/auth/login
6. Check your profile: http://localhost:3000/profile

## Common Issues

### "Auth session missing" Error
- This is normal for pages that require authentication
- Just sign up or log in first

### "Table does not exist" Error
- You haven't run the database schema yet
- Go back to Step 1

### "RLS policy violation" Error
- The database schema wasn't applied correctly
- Re-run the full-schema.sql file

### Can't sign up
- Check that your Supabase project is active
- Verify environment variables in .env.local
- Check Supabase logs for errors

## Next Steps After Setup

1. Create your first account
2. Test the profile page
3. Browse destinations and stories
4. Apply to become a guide (optional)

## Admin Access

To make yourself an admin:

```sql
-- Replace with your email
UPDATE profiles 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

## Testing Guide Features

To test guide features:

1. Sign up as a regular user
2. Go to /guides/apply
3. Fill out the application
4. As admin, approve the application in /admin
5. Your account will be upgraded to guide

## Environment Variables

Make sure `.env.local` has:

```
NEXT_PUBLIC_SUPABASE_URL=https://gwhfdibumtvrritxpoxp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aGZkaWJ1bXR2cnJpdHhwb3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDA3NTYsImV4cCI6MjA5MDExNjc1Nn0.hZ6aTbRKI3yOO3KsKTabvCCbav4Qh3CLQND0gMaLkeo
NEXT_PUBLIC_BACKEND_URL=https://gwhfdibumtvrritxpoxp.supabase.co
NEXT_PUBLIC_BACKEND_PASSWORD=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aGZkaWJ1bXR2cnJpdHhwb3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDA3NTYsImV4cCI6MjA5MDExNjc1Nn0.hZ6aTbRKI3yOO3KsKTabvCCbav4Qh3CLQND0gMaLkeo
```

## Support

If you encounter issues:
1. Check Supabase logs
2. Check browser console for errors
3. Verify database schema is applied
4. Check that all npm packages are installed
