# Nepal Travel Guide Platform

A comprehensive travel platform connecting tourists with local guides in Nepal, featuring destination discovery, guide booking, and community storytelling.

## 🌟 Features

### For Tourists
- Browse curated destinations across Nepal
- Find and book verified local guides
- Read and share travel stories
- Leave reviews and ratings
- Manage bookings and profile

### For Guides
- Create professional profile
- Set service areas and rates
- Manage bookings and availability
- Build reputation through reviews
- Earn income from guiding

### For Admins
- Review and approve guide applications
- Manage users and content
- Monitor platform activity
- Curate featured destinations

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **State Management:** Zustand
- **Validation:** Zod
- **Maps:** PostGIS for geographic queries
- **Deployment:** Vercel

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── auth/                # Authentication pages
│   ├── destinations/        # Destination pages
│   ├── stories/             # Story pages
│   ├── guides/              # Guide pages
│   ├── bookings/            # Booking pages
│   ├── profile/             # Profile pages
│   └── admin/               # Admin pages
├── backend/
│   ├── backend/
│   │   ├── services/        # API services (8 services)
│   │   ├── stores/          # Zustand stores (8 stores)
│   │   └── schemas.ts       # Zod schemas & types
│   └── supabase/            # Supabase configuration
├── components/              # Reusable React components
├── data/                    # Mock data for development
├── public/                  # Static assets
└── full-schema.sql          # Complete database schema
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nepal-travel-guide
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run `full-schema.sql` in the SQL Editor
   - Create storage buckets: `profile_pics` and `vault`

4. **Configure environment variables**
```bash
# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
```
http://localhost:3000
```

## 📚 Documentation

- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Complete project status and features
- **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)** - Backend architecture and services
- **[INTEGRATION_EXAMPLE.md](./INTEGRATION_EXAMPLE.md)** - Code examples for integration
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
- **[LANDING_PAGE_DOCUMENTATION.md](./LANDING_PAGE_DOCUMENTATION.md)** - Landing page details

## 🗄️ Database Schema

### Core Tables
- `profiles` - User profiles
- `guides` - Guide listings
- `guide_applications` - Guide applications
- `guide_service_areas` - Geographic service areas
- `bookings` - Tourist-guide bookings
- `reviews` - Booking reviews
- `stories` - User stories
- `story_likes` - Story likes
- `story_comments` - Story comments
- `featured_destinations` - Curated destinations

### Security Features
- Row Level Security (RLS) on all tables
- Automated triggers for data consistency
- Secure storage buckets
- Protected admin operations

## 🔧 Backend Services

### Available Services
1. **authService** - Authentication & user management
2. **profileService** - Profile operations
3. **guideService** - Guide management
4. **bookingService** - Booking operations
5. **reviewService** - Review management
6. **storyService** - Story operations
7. **guideApplicationService** - Application processing
8. **featuredDestinationService** - Destination management

### Usage Example
```typescript
import { authService } from '@/backend/backend/services';

// Login
const result = await authService.loginWithEmail(email, password);
if (result.success) {
  // Handle success
}
```

## 🎨 Design System

### Colors
- **Ink** (#1A1612) - Primary text
- **Cream** (#FAF8F5) - Background
- **Gold** (#C9A96E) - Accent
- **Sage** (#8B9D83) - Success
- **Terracotta** (#C17767) - Highlight
- **Warm Gray** (#6B6B6B) - Secondary text

### Typography
- **Heading:** Playfair Display
- **Body:** Inter

## 🔐 Authentication

Supports multiple authentication methods:
- Email/Password
- Phone (OTP)
- OAuth (Google, Facebook, Apple)

## 📱 Pages

### Public Pages
- ✅ Home
- ✅ Destinations (listing & detail)
- ✅ Stories (listing & detail)
- ✅ Guides (listing & profile)

### Protected Pages
- ✅ Login/Signup
- ✅ User Profile
- ✅ My Bookings
- ✅ Apply to be Guide

### Admin Pages
- ✅ Admin Dashboard
- ✅ Application Management

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Configure Supabase**
   - Add Vercel URL to Supabase redirect URLs
   - Configure OAuth providers

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔄 Integration Status

### ✅ Completed
- Complete database schema
- All backend services
- All Zustand stores
- All page layouts
- Component library
- Type definitions

### 🔄 In Progress
- Connect frontend to backend
- Implement real-time features
- Add payment integration

### 📋 Todo
- Email notifications
- Advanced search/filtering
- Analytics dashboard
- Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer:** Your Name
- **Designer:** Your Name
- **Project Manager:** Your Name

## 📞 Support

For support, email support@nepalguide.com or join our Slack channel.

## 🙏 Acknowledgments

- Supabase for the amazing backend platform
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and testers

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform features
- ✅ User authentication
- ✅ Guide booking system
- ✅ Story sharing

### Phase 2 (Next)
- Payment integration
- Real-time chat
- Advanced search
- Mobile app

### Phase 3 (Future)
- AI-powered recommendations
- Multi-language support
- Video stories
- Virtual tours

## 📊 Stats

- **10 Database Tables** with full RLS
- **8 Backend Services** fully implemented
- **8 Zustand Stores** for state management
- **15+ Pages** with responsive design
- **16 Reusable Components**
- **100% TypeScript** for type safety

---

**Built with ❤️ for travelers exploring Nepal**

For detailed implementation guides, see the documentation files in the root directory.
