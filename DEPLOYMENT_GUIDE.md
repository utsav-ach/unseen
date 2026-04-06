# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel account (or preferred hosting)
- Git repository

## Step 1: Setup Supabase

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready

### 1.2 Run Database Migrations
1. Go to SQL Editor in Supabase Dashboard
2. Copy entire content of `full-schema.sql`
3. Paste and run
4. Verify all tables are created

### 1.3 Setup Storage Buckets
```sql
-- Run in SQL Editor
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('profile_pics', 'profile_pics', true),
  ('vault', 'vault', false);
```

### 1.4 Get API Keys
1. Go to Project Settings > API
2. Copy:
   - Project URL
   - Anon/Public key

## Step 2: Configure Environment

### 2.1 Create Environment File
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2.2 Update Supabase Client
Verify `backend/supabase/client.ts` uses environment variables:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## Step 3: Test Locally

### 3.1 Install Dependencies
```bash
npm install
```

### 3.2 Run Development Server
```bash
npm run dev
```

### 3.3 Test Key Flows
- [ ] User signup
- [ ] User login
- [ ] Profile viewing
- [ ] Guide browsing
- [ ] Story viewing
- [ ] Booking creation (if integrated)

## Step 4: Deploy to Vercel

### 4.1 Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository

### 4.2 Configure Build Settings
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 4.3 Add Environment Variables
In Vercel project settings, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4.4 Deploy
Click "Deploy" and wait for build to complete

## Step 5: Configure Authentication

### 5.1 Update Supabase Auth Settings
1. Go to Authentication > URL Configuration
2. Add your Vercel domain to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`

### 5.2 Configure OAuth Providers (Optional)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret
5. Add to Supabase > Authentication > Providers > Google

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create app and get App ID and Secret
3. Add to Supabase > Authentication > Providers > Facebook

### 5.3 Configure Email Templates
1. Go to Authentication > Email Templates
2. Customize:
   - Confirmation email
   - Password reset email
   - Magic link email

## Step 6: Setup Custom Domain (Optional)

### 6.1 Add Domain in Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 6.2 Update Supabase URLs
Update redirect URLs in Supabase to use custom domain

## Step 7: Monitoring & Analytics

### 7.1 Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 7.2 Supabase Monitoring
1. Go to Database > Logs
2. Monitor:
   - Query performance
   - Error logs
   - API usage

## Step 8: Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] Environment variables not committed to Git
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS configured in Supabase
- [ ] Rate limiting configured
- [ ] Sensitive data encrypted
- [ ] Regular backups enabled

## Step 9: Performance Optimization

### 9.1 Enable Caching
```typescript
// next.config.mjs
export default {
  images: {
    domains: ['your-project.supabase.co'],
  },
  // Enable static generation where possible
  experimental: {
    optimizeCss: true,
  },
};
```

### 9.2 Database Indexes
Verify indexes are created (already in schema):
```sql
-- Check indexes
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

### 9.3 Image Optimization
Use Next.js Image component everywhere:
```typescript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
/>
```

## Step 10: Post-Deployment

### 10.1 Create Admin User
```sql
-- Run in Supabase SQL Editor
UPDATE profiles 
SET role = 'admin', is_admin = true 
WHERE email = 'your-admin-email@example.com';
```

### 10.2 Add Sample Data (Optional)
```sql
-- Add featured destinations
INSERT INTO featured_destinations (name, coordinates, description, tags, feature_images)
VALUES (
  'Everest Base Camp',
  ST_SetSRID(ST_MakePoint(86.8523, 27.9881), 4326),
  'Trek to the base of the world''s highest mountain',
  ARRAY['trekking', 'adventure', 'mountain'],
  ARRAY['https://example.com/image1.jpg']
);
```

### 10.3 Test Production
- [ ] Test all authentication flows
- [ ] Verify RLS policies work
- [ ] Test file uploads
- [ ] Check email delivery
- [ ] Test payment flow (if integrated)
- [ ] Verify mobile responsiveness

## Troubleshooting

### Issue: "Invalid JWT"
**Solution:** Check that environment variables are set correctly in Vercel

### Issue: "RLS Policy Violation"
**Solution:** Verify user is authenticated and has correct permissions

### Issue: "CORS Error"
**Solution:** Add your domain to Supabase > Settings > API > CORS

### Issue: "Storage Upload Failed"
**Solution:** Check storage bucket policies and file size limits

### Issue: "Build Failed"
**Solution:** Check build logs in Vercel, ensure all dependencies are installed

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Review database performance monthly
- [ ] Update dependencies monthly
- [ ] Backup database weekly
- [ ] Review security settings quarterly

### Scaling Considerations
- Enable Supabase Pro for production
- Consider CDN for static assets
- Implement Redis for caching
- Add database read replicas
- Monitor and optimize slow queries

## Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Rollback Plan

If deployment fails:
1. Revert to previous Vercel deployment
2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

## Success Metrics

Track these metrics post-deployment:
- User signups per day
- Active users
- Booking conversion rate
- Average session duration
- Page load times
- Error rates
- API response times

## Next Steps After Deployment

1. Set up monitoring alerts
2. Configure backup schedule
3. Implement A/B testing
4. Add analytics tracking
5. Set up error tracking (Sentry)
6. Create user documentation
7. Plan feature roadmap
8. Gather user feedback

---

**Congratulations!** Your Nepal Travel Guide platform is now live! 🎉
