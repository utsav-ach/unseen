# Backend Implementation Guide

## Overview
This document outlines the complete backend implementation for the Nepal Travel Guide platform, including database schema, services, and integration points.

## Database Schema

### Tables Implemented
1. **profiles** - User profiles extending Supabase auth
2. **guide_applications** - Applications to become a guide
3. **guides** - Guide listings with bio, rates, availability
4. **guide_service_areas** - Geographic service areas using PostGIS
5. **bookings** - Tourist-Guide bookings with dates and payments
6. **reviews** - Reviews for completed bookings
7. **stories** - User-generated travel stories
8. **story_likes** - Story likes tracking
9. **story_comments** - Comments on stories
10. **featured_destinations** - Curated destinations with nearby guides

### Key Features
- Row Level Security (RLS) on all tables
- PostGIS for geographic queries
- Automated triggers for ratings and counts
- Secure storage buckets for profile pics and documents

## Backend Services

### 1. AuthService (`backend/backend/services/authService.ts`)
Handles authentication and user lifecycle.

**Methods:**
- `signUp(email, password, metadata)` - Create new account
- `loginWithEmail(email, password)` - Email/password login
- `loginWithPhone(phone)` - Phone OTP login
- `verifyOTP(phone, token)` - Verify OTP
- `loginWithOAuth(provider)` - OAuth login (Google, Facebook, Apple)
- `logout()` - Sign out
- `fetchProfile(userId)` - Get complete user profile
- `checkUsernameAvailability(username)` - Check if username is taken
- `uploadAvatar(userId, file)` - Upload profile picture
- `onboarding(userId, profileData)` - Complete onboarding
- `getCurrentUser()` - Get current session

### 2. ProfileService (`backend/backend/services/profileService.ts`)
Manages user profiles.

**Methods:**
- `getByRole(role)` - Get users by role
- `getVerifiedProfiles()` - Get verified users
- `getMyPrivateData(userId)` - Get complete private profile data

### 3. GuideService (`backend/backend/services/guideService.ts`)
Handles guide operations.

**Methods:**
- `getFullGuideData(guideId)` - Get complete guide profile
- `searchByProximity(lat, lon)` - Find guides near location
- `updateGuide(id, updates)` - Update guide info
- `setAvailability(id, isAvailable)` - Toggle availability
- `updateRate(id, rate)` - Update hourly rate
- `getTopRated(limit)` - Get top-rated guides

### 4. BookingService (`backend/backend/services/bookingService.ts`)
Manages bookings between tourists and guides.

**Methods:**
- `createBooking(payload)` - Create new booking
- `getDetailedBooking(bookingId)` - Get booking with profiles
- `getUserBookings(userId, role)` - Get user's bookings
- `updateStatus(id, status)` - Update booking status
- `markAsPaid(id)` - Mark payment received

### 5. ReviewService (`backend/backend/services/reviewService.ts`)
Handles reviews for completed bookings.

**Methods:**
- `submitReview(review)` - Submit new review
- `getForGuide(guideId)` - Get guide's reviews
- `getByTourist(touristId)` - Get tourist's reviews
- `getByBookingId(bookingId)` - Get review for booking

### 6. StoryService (`backend/backend/services/storyService.ts`)
Manages user stories.

**Methods:**
- `getPublishedStories()` - Get all published stories
- `getFullStoryData(storyId)` - Get story with comments/likes
- `createStory(payload)` - Create new story
- `updateStory(id, payload)` - Update story
- `deleteStory(id)` - Delete story
- `likeStory(storyId, userId)` - Like a story
- `unlikeStory(storyId, userId)` - Unlike a story
- `addComment(storyId, userId, content)` - Add comment
- `hasUserLiked(storyId, userId)` - Check if user liked
- `getMyStories(userId, limit, offset)` - Get user's stories

### 7. GuideApplicationService (`backend/backend/services/guideApplicationService.ts`)
Manages guide applications.

**Methods:**
- `submitApplication(payload, idPhotoFile)` - Submit application
- `getByStatus(status)` - Get applications by status
- `getByUserId(userId)` - Get user's applications
- `updateStatus(id, status, feedback)` - Update application status
- `getProofSignedUrl(path)` - Get signed URL for ID document

### 8. FeaturedDestinationService (`backend/backend/services/featuredDestinationService.ts`)
Manages featured destinations.

**Methods:**
- `getFeaturedDestinations()` - Get all destinations
- `getDestinationDetails(destId)` - Get destination with nearby guides
- `getByTag(tag)` - Get destinations by tag

## Zustand Stores

All services have corresponding Zustand stores in `backend/backend/stores/`:
- `useAuthStore` - Authentication state
- `useProfileStore` - Profile management
- `useGuideStore` - Guide data
- `useBookingStore` - Booking management
- `useReviewStore` - Reviews
- `useStoryStore` - Stories
- `useGuideApplicationStore` - Applications
- `useFeaturedDestinationStore` - Destinations

## Integration Steps

### 1. Setup Supabase
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize project
supabase init

# Run migrations
supabase db push
```

### 2. Apply Database Schema
```sql
-- Run full-schema.sql in Supabase SQL Editor
-- This creates all tables, policies, triggers, and functions
```

### 3. Configure Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Use Services in Components
```typescript
import { authService } from '@/backend/backend/services';

// In your component
const handleLogin = async () => {
  const result = await authService.loginWithEmail(email, password);
  if (result.success) {
    // Handle success
  }
};
```

### 5. Use Stores for State Management
```typescript
import { useAuthStore } from '@/backend/backend/stores';

// In your component
const { user, login, logout } = useAuthStore();
```

## API Endpoints (RPC Functions)

### User & Profile
- `get_complete_user_profile(user_id)` - Complete user profile
- `get_my_private_profile_data(target_user_id)` - Private profile data

### Guides
- `get_full_guide_data(target_guide_id)` - Complete guide profile
- `find_guides_for_destination(dest_lat, dest_lon)` - Find nearby guides

### Stories
- `get_full_story_data(target_story_id)` - Complete story data

### Bookings
- `get_detailed_booking(target_booking_id)` - Detailed booking
- `get_user_bookings(target_user_id, user_role)` - User's bookings

### Destinations
- `get_feature_destination_data(dest_id)` - Destination with guides

## Security

### Row Level Security (RLS)
All tables have RLS enabled with policies for:
- Public read access where appropriate
- User-specific write access
- Admin-only operations
- Sensitive field protection

### Storage Buckets
- `profile_pics` - Public read, user-specific write
- `vault` - Private, owner and admin access only

## Testing

### Test User Flows
1. **Tourist Flow**
   - Sign up → Onboarding → Browse destinations → Book guide → Leave review

2. **Guide Flow**
   - Sign up → Apply to be guide → Admin approval → Set availability → Receive bookings

3. **Admin Flow**
   - Review applications → Approve/reject → Manage users

## Next Steps

1. Connect frontend pages to backend services
2. Implement real-time subscriptions for bookings
3. Add payment integration
4. Implement email notifications
5. Add analytics and monitoring
