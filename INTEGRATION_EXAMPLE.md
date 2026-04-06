# Integration Examples

This guide shows how to connect your frontend pages to the backend services.

## 1. Authentication Flow

### Login Page Integration

```typescript
// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/backend/backend/services";
import { useAuthStore } from "@/backend/backend/stores";

export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await authService.loginWithEmail(email, password);
        
        if (result.success && result.data) {
            // Fetch complete profile
            const profileResult = await authService.fetchProfile(result.data.user.id);
            if (profileResult.success) {
                setUser(profileResult.data);
                router.push("/");
            }
        } else {
            setError(result.error || "Login failed");
        }
        
        setLoading(false);
    };

    return (
        // ... your JSX with error display
    );
}
```

### Signup Page Integration

```typescript
// app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/backend/backend/services";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await authService.signUp(
            formData.email,
            formData.password,
            {
                first_name: formData.firstName,
                last_name: formData.lastName
            }
        );

        if (result.success) {
            router.push("/auth/verify-email");
        }
    };

    return (
        // ... your JSX
    );
}
```

## 2. Protected Routes

### Middleware Setup

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    // Protected routes
    const protectedPaths = ['/profile', '/bookings', '/guides/apply'];
    const isProtectedPath = protectedPaths.some(path => 
        req.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath && !session) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session?.user.id)
            .single();

        if (profile?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return res;
}
```

## 3. Guides Page Integration

```typescript
// app/guides/page.tsx
"use client";

import { useEffect, useState } from "react";
import { guideService } from "@/backend/backend/services";
import { Guide } from "@/backend/backend/schemas";

export default function GuidesPage() {
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGuides();
    }, []);

    const loadGuides = async () => {
        const result = await guideService.getTopRated(20);
        if (result.success && result.data) {
            setGuides(result.data);
        }
        setLoading(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {guides.map(guide => (
                <GuideCard key={guide.id} guide={guide} />
            ))}
        </div>
    );
}
```

## 4. Guide Profile Integration

```typescript
// app/guides/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { guideService } from "@/backend/backend/services";
import { CompleteGuideData } from "@/backend/backend/schemas";

export default function GuideProfilePage() {
    const params = useParams();
    const [guide, setGuide] = useState<CompleteGuideData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGuide();
    }, [params.id]);

    const loadGuide = async () => {
        const result = await guideService.getFullGuideData(params.id as string);
        if (result.success && result.data) {
            setGuide(result.data);
        }
        setLoading(false);
    };

    if (loading) return <div>Loading...</div>;
    if (!guide) return <div>Guide not found</div>;

    return (
        <div>
            <h1>{guide.full_name}</h1>
            <p>{guide.bio}</p>
            <p>Rating: {guide.avg_rating}</p>
            <p>Rate: ${guide.hourly_rate}/hour</p>
            
            <h2>Reviews</h2>
            {guide.reviews.map(review => (
                <div key={review.id}>
                    <p>{review.rating} stars</p>
                    <p>{review.comment}</p>
                    <p>By: {review.reviewer.name}</p>
                </div>
            ))}
        </div>
    );
}
```

## 5. Booking Creation

```typescript
// components/BookingForm.tsx
"use client";

import { useState } from "react";
import { bookingService } from "@/backend/backend/services";
import { useAuthStore } from "@/backend/backend/stores";

export default function BookingForm({ guideId, hourlyRate }: { guideId: string, hourlyRate: number }) {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        message: "",
        destinationName: ""
    });

    const calculateTotal = () => {
        if (!formData.startDate || !formData.endDate) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return days * hourlyRate * 8; // 8 hours per day
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await bookingService.createBooking({
            tourist_id: user!.id,
            guide_id: guideId,
            start_date: formData.startDate,
            end_date: formData.endDate,
            total_amount: calculateTotal(),
            message: formData.message,
            destination_name: formData.destinationName
        });

        if (result.success) {
            alert("Booking created successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
            />
            <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Destination"
                value={formData.destinationName}
                onChange={(e) => setFormData({ ...formData, destinationName: e.target.value })}
            />
            <textarea
                placeholder="Message to guide"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <p>Total: ${calculateTotal()}</p>
            <button type="submit">Book Now</button>
        </form>
    );
}
```

## 6. Stories Integration

```typescript
// app/stories/page.tsx
"use client";

import { useEffect, useState } from "react";
import { storyService } from "@/backend/backend/services";
import { useAuthStore } from "@/backend/backend/stores";

export default function StoriesPage() {
    const { user } = useAuthStore();
    const [stories, setStories] = useState<any[]>([]);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        const result = await storyService.getPublishedStories();
        if (result.success && result.data) {
            setStories(result.data);
        }
    };

    const handleLike = async (storyId: string) => {
        if (!user) return;
        
        const result = await storyService.likeStory(storyId, user.id);
        if (result.success) {
            // Refresh stories or update state
            loadStories();
        }
    };

    return (
        <div>
            {stories.map(story => (
                <div key={story.id}>
                    <h2>{story.title}</h2>
                    <p>{story.description}</p>
                    <button onClick={() => handleLike(story.id)}>
                        Like ({story.likes_count})
                    </button>
                </div>
            ))}
        </div>
    );
}
```

## 7. Profile Page Integration

```typescript
// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { profileService } from "@/backend/backend/services";
import { useAuthStore } from "@/backend/backend/stores";

export default function ProfilePage() {
    const { user } = useAuthStore();
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        const result = await profileService.getMyPrivateData(user!.id);
        if (result.success && result.data) {
            setProfileData(result.data);
        }
    };

    if (!profileData) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profileData.profile.first_name} {profileData.profile.last_name}</h1>
            <p>Email: {profileData.profile.email}</p>
            
            <h2>Recent Stories</h2>
            {profileData.recent_stories.map((story: any) => (
                <div key={story.id}>{story.title}</div>
            ))}

            <h2>Recent Bookings</h2>
            {profileData.recent_bookings.map((booking: any) => (
                <div key={booking.id}>
                    {booking.destination_name} - {booking.status}
                </div>
            ))}
        </div>
    );
}
```

## 8. Admin Dashboard Integration

```typescript
// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { guideApplicationService } from "@/backend/backend/services";

export default function AdminPage() {
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        const result = await guideApplicationService.getByStatus('pending');
        if (result.success && result.data) {
            setApplications(result.data);
        }
    };

    const handleApprove = async (id: string) => {
        const result = await guideApplicationService.updateStatus(
            id,
            'approved',
            'Application approved'
        );
        if (result.success) {
            loadApplications(); // Refresh list
        }
    };

    const handleReject = async (id: string) => {
        const result = await guideApplicationService.updateStatus(
            id,
            'rejected',
            'Application rejected'
        );
        if (result.success) {
            loadApplications();
        }
    };

    return (
        <div>
            <h1>Pending Applications</h1>
            {applications.map(app => (
                <div key={app.id}>
                    <p>User: {app.user_id}</p>
                    <p>Document: {app.document_type} - {app.id_number}</p>
                    <button onClick={() => handleApprove(app.id)}>Approve</button>
                    <button onClick={() => handleReject(app.id)}>Reject</button>
                </div>
            ))}
        </div>
    );
}
```

## 9. Real-time Subscriptions

```typescript
// hooks/useRealtimeBookings.ts
import { useEffect } from 'react';
import { supabase } from '@/backend/supabase/client';
import { useBookingStore } from '@/backend/backend/stores';

export function useRealtimeBookings(userId: string) {
    const { addBooking, updateBooking } = useBookingStore();

    useEffect(() => {
        const channel = supabase
            .channel('bookings')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bookings',
                    filter: `tourist_id=eq.${userId}`
                },
                (payload) => {
                    addBooking(payload.new);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'bookings',
                    filter: `tourist_id=eq.${userId}`
                },
                (payload) => {
                    updateBooking(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);
}
```

## 10. Error Handling Pattern

```typescript
// utils/errorHandler.ts
export function handleServiceError(error: any) {
    if (error.message.includes('JWT')) {
        // Session expired
        window.location.href = '/auth/login';
    } else if (error.message.includes('RLS')) {
        // Permission denied
        alert('You do not have permission to perform this action');
    } else {
        // Generic error
        alert(error.message || 'An error occurred');
    }
}

// Usage in component
const result = await guideService.getFullGuideData(id);
if (!result.success) {
    handleServiceError(result.error);
}
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Quick Start Checklist

1. ✅ Create Supabase project
2. ✅ Run `full-schema.sql` in Supabase SQL Editor
3. ✅ Add environment variables
4. ✅ Test authentication flow
5. ✅ Connect one page at a time
6. ✅ Test RLS policies
7. ✅ Add error handling
8. ✅ Implement loading states
9. ✅ Test all user flows
10. ✅ Deploy!
