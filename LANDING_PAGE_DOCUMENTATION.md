# Landing Page Complete Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Design System](#design-system)
4. [Components](#components)
5. [Animations & Effects](#animations--effects)
6. [Data Structure](#data-structure)
7. [Features](#features)
8. [File Structure](#file-structure)

---

## Overview

**Project Name:** Unseen Nepal - Travel Landing Page  
**Type:** Multi-page travel booking platform  
**Purpose:** Showcase hidden destinations in Nepal with functional search, navigation, and booking features

**Key Differentiators:**
- ✅ Functional search (not just visual)
- ✅ Dynamic destination pages (8 destinations)
- ✅ Interactive journey section with scroll-based storytelling
- ✅ Real navigation and routing
- ✅ Professional icon system (no emojis)
- ✅ Premium depth effects and animations

---

## Tech Stack

### Core Technologies
- **Framework:** Next.js 16.2.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.3
- **Animations:** Framer Motion 11.0.0
- **Icons:** Lucide React (latest)
- **Runtime:** React 18.3.0

### Development Tools
- **Package Manager:** npm
- **Build Tool:** Turbopack (Next.js 16)
- **Type Checking:** TypeScript strict mode
- **CSS Processing:** PostCSS 8.4.38, Autoprefixer 10.4.19

---

## Design System

### Color Palette

#### Primary Colors
```css
--primary: #0F3D2E        /* Deep forest green - main brand color */
--secondary: #14532D      /* Soft green - depth and gradients */
--dark-green: #0B2E22     /* Darker green - gradient endpoints */
```

#### Accent Colors
```css
--accent: #F59E0B         /* Golden sunrise - CTAs, highlights */
--accent-dark: #D97706    /* Darker gold - hover states */
```

#### Neutral Colors
```css
--light: #F8FAFC          /* Snow white - backgrounds */
--gray-soft: #E5E7EB      /* Soft mist gray - dividers */
--gray-900: #111827       /* Dark gray - footer */
```

#### Destination-Specific Colors
```css
--kathmandu: #F59E0B      /* Golden */
--pokhara: #3B82F6        /* Blue */
--mustang: #EF4444        /* Red */
--dolpo: #10B981          /* Green */
```

### Typography

#### Font Families
```css
font-heading: 'Playfair Display', serif;  /* Luxury, editorial feel */
font-body: 'Inter', sans-serif;           /* Clean, modern, readable */
```

#### Font Weights
- Headings: 400 (regular), 700 (bold)
- Body: 400 (regular), 600 (semibold)

#### Type Scale
```css
/* Hero Title */
text-4xl → text-6xl → text-7xl (responsive)

/* Section Headings */
text-4xl → text-5xl

/* Journey Cards */
text-2xl (Playfair for destination names)

/* Card Titles */
text-lg → text-xl (Inter semibold)

/* Body Text */
text-base → text-lg

/* Small Text */
text-sm → text-xs
```

### Spacing System
```css
/* Container */
max-w-7xl (1280px)
px-4 (mobile), px-6 (tablet), px-8 (desktop)

/* Section Spacing */
py-20 (standard)
py-28 (CTA sections)
py-32 (Journey section)

/* Gaps */
gap-4, gap-6, gap-8 (component spacing)
```

### Border Radius
```css
rounded-full    /* Buttons, badges */
rounded-2xl     /* Cards, sections */
rounded-xl      /* Images, smaller cards */
```

---

## Components

### 1. Navbar (`components/Navbar.tsx`)
**Type:** Client component with scroll detection

**Features:**
- Transparent → glassmorphism on scroll
- Mobile hamburger menu
- Smooth transitions
- Fixed positioning

**State:**
- `isOpen` - Mobile menu toggle
- `isScrolled` - Scroll detection (triggers at 50px)

**Links:**
- Home, Destinations, Experiences, About, Contact

**Styling:**
```tsx
// Default (transparent)
bg-transparent

// Scrolled (glassmorphism)
bg-white/95 backdrop-blur-md shadow-lg
```

---

### 2. Hero (`components/Hero.tsx`)
**Type:** Client component with functional search

**Features:**
- Full-screen height
- Background image with gradient overlay
- **Functional search bar** with dropdown results
- Real-time filtering
- Click outside to close
- Empty state handling

**State:**
- `searchQuery` - Search input value
- `showResults` - Dropdown visibility

**Search Logic:**
```tsx
// Filters by: name, title, description, region
const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**Placeholder:** "Search destinations, regions, or experiences..."

---

### 3. ScrollPlane (`components/ScrollPlane.tsx`)
**Type:** Client component with scroll-based animation

**Features:**
- Plane flies across screen based on scroll progress
- Curved flight path (horizontal + vertical)
- Rotation and scale effects
- Vapor trail with pulsing animation
- Subtle glow effect
- **Hidden on mobile** (`hidden md:block`)

**Scroll Range:** 5% → 70% of page scroll

**Transforms:**
```tsx
x: -30% → 130%        // Horizontal movement
y: 150 → -100         // Vertical curve
rotate: 15° → -8°     // Realistic tilt
scale: 0.7 → 1.2 → 0.9  // Depth effect
opacity: 0 → 1 → 1 → 0  // Fade in/out
```

**Opacity:** 65% (faded for subtlety)

---

### 4. ScrollProgress (`components/ScrollProgress.tsx`)
**Type:** Client component

**Features:**
- Thin bar at top of page (3px height)
- Gradient color: `from-accent via-yellow-500 to-accent`
- Scales with scroll progress using `scaleX`

---

### 5. FloatingCTA (`components/FloatingCTA.tsx`)
**Type:** Client component with visibility toggle

**Features:**
- Appears after 500px scroll
- Fixed bottom-right position
- Animated arrow icon
- Ripple effect (ping animation)
- Scale on hover

**Button Text:** "Explore Now"

---

### 6. FeaturedDestinations (`components/FeaturedDestinations.tsx`)
**Type:** Static component using centralized data

**Features:**
- Shows first 4 destinations from `data/destinations.ts`
- Image with hover zoom
- Difficulty & region badges
- Star ratings (Lucide icons)
- Hover lift effect
- Click to navigate to destination page

**Grid:** 1 → 2 → 4 columns (responsive)

**Data Source:** `destinations.slice(0, 4)`

---

### 7. JourneySection (`components/JourneySection.tsx`) 🔥
**Type:** Client component - SIGNATURE FEATURE

**Purpose:** Visualize the travel journey through Nepal

**Features:**
- **Animated SVG path** that fills as user scrolls
- **4 journey stops:** Kathmandu → Pokhara → Mustang → Dolpo
- **Progressive card reveals** with opacity/scale animations
- **Connecting dots** on the path line
- **Progress bars** on each card
- **Color-coded destinations** with Lucide icons
- **Clickable cards** - navigate to destination pages
- **Active state highlighting** based on scroll position

**Icons Used:**
- Kathmandu: `Building2` (Golden #F59E0B)
- Pokhara: `Mountain` (Blue #3B82F6)
- Mustang: `Castle` (Red #EF4444)
- Dolpo: `MountainSnow` (Green #10B981)

**Scroll Triggers:**
```tsx
0-20%: No active destination
20-40%: Kathmandu active
40-60%: Pokhara active
60-80%: Mustang active
80%+: Dolpo active
```

**Active State Styling:**
```tsx
ring-4 ring-accent scale-105 shadow-2xl
```

**SVG Path Animation:**
```tsx
pathLength: 0 → 1 (draws as you scroll)
stroke: url(#journeyGradient) // Multi-color gradient
```

**Responsive:**
- Desktop: Full SVG path with animations
- Mobile: Path hidden, cards stack vertically

---

### 8. ExperienceSection (`components/ExperienceSection.tsx`)
**Type:** Static component

**Features:**
- 4 feature cards with Lucide icons
- Hover effects with scale
- Icon backgrounds with color-coded circles

**Icons & Colors:**
- `Mountain` - Hidden Places (#F59E0B)
- `Compass` - Guided Adventures (#3B82F6)
- `Users` - Authentic Culture (#10B981)
- `ShieldCheck` - Safe Travel (#EF4444)

---

### 9. StatsSection (`components/StatsSection.tsx`)
**Type:** Client component with animated counters

**Features:**
- **Premium gradient background** with depth
- **Golden glow effect** (blur-[120px])
- **Dot pattern texture**
- **Floating circles** (pulsing animation)
- Animated number counters using `requestAnimationFrame`
- Viewport detection (only animates when in view)
- Star icon for rating (Lucide `Star`)

**Background:**
```tsx
bg-gradient-to-br from-[#0F3D2E] via-[#14532D] to-[#0B2E22]
```

**Stats:**
- 10,000+ Travelers
- 150+ Hidden Destinations
- 4.9⭐ Average Rating (with Star icon)
- 25+ Years Experience

**Counter Duration:** 2 seconds

---

### 10. FeaturedStories (`components/FeaturedStories.tsx`)
**Type:** Static component

**Features:**
- 4 story cards with Lucide icons
- Color-coded backgrounds
- Author & date metadata
- Hover effects

**Icons & Colors:**
- `BookOpen` - Lost in the Clouds (#F59E0B)
- `Backpack` - Tea Houses (#3B82F6)
- `Flower2` - Festival (#EF4444)
- `Mountain` - Solo Trekker (#10B981)

---

### 11. TestimonialsSlider (`components/TestimonialsSlider.tsx`)
**Type:** Client component with auto-rotation

**Features:**
- Auto-slides every 5 seconds
- Smooth slide transitions (AnimatePresence)
- Dot navigation
- Click to change manually
- 5-star ratings with Lucide icons

**Testimonials:** 4 reviews from different countries

---

### 12. CTASection (`components/CTASection.tsx`)
**Type:** Static component with premium effects

**Features:**
- **Multi-layer gradient depth**
- **Golden glow effect** at top
- **Dot pattern texture**
- **Floating circles** (pulsing)
- **Plane trail continuation** (horizontal line)
- **Floating animation** on heading
- Enhanced button with golden shadow

**Background:**
```tsx
bg-gradient-to-br from-[#0F3D2E] via-[#14532D] to-[#0B2E22]
```

**Effects:**
```tsx
// Golden glow
w-[500px] h-[300px] bg-[#F59E0B]/20 blur-[120px]

// Dot pattern
bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]

// Plane trail
h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent
```

---

### 13. Footer (`components/Footer.tsx`)
**Type:** Static component

**Features:**
- Dark gradient background
- Logo with gradient text
- Quick links
- Social icons with golden gradients
- Privacy & Terms links

**Social Platforms:**
- Facebook, Instagram, Twitter, TikTok

**Instagram Icon:**
```tsx
bg-gradient-to-br from-[#F59E0B] to-[#D97706]
```

---

## Animations & Effects

### Framer Motion Animations

#### 1. Scroll-Based Animations

**Scroll Progress Bar:**
```tsx
<motion.div
    style={{ scaleX: scrollYProgress }}
    className="fixed top-0 left-0 h-[3px] origin-left"
/>
```

**Scroll Plane:**
```tsx
const x = useTransform(scrollYProgress, [0.05, 0.7], ["-30%", "130%"]);
const y = useTransform(scrollYProgress, [0.05, 0.7], [150, -100]);
const rotate = useTransform(scrollYProgress, [0.05, 0.7], [15, -8]);
const scale = useTransform(scrollYProgress, [0.05, 0.4, 0.7], [0.7, 1.2, 0.9]);
const opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.65, 0.7], [0, 1, 1, 0]);
```

**Journey Section Path:**
```tsx
<motion.path
    style={{
        pathLength: useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
    }}
/>
```

**Journey Card Reveals:**
```tsx
const opacity = useTransform(
    scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
    [0, 1, 1, 0.7]
);

const scale = useTransform(
    scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress],
    [0.8, 1.05, 1]
);
```

#### 2. Hover Animations

**Cards:**
```tsx
hover:-translate-y-2  // Lift effect
hover:shadow-2xl      // Enhanced shadow
```

**Buttons:**
```tsx
hover:scale-105       // Slight grow
hover:shadow-[#F59E0B]/50  // Golden shadow
```

**Icons:**
```tsx
group-hover:scale-110  // Icon scale in card
```

**Images:**
```tsx
group-hover:scale-110  // Zoom effect
transition-transform duration-500
```

#### 3. Active/Press Animations

```tsx
active:scale-95  // Press feedback
```

#### 4. Entrance Animations

**Fade + Slide Up:**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Staggered:**
```tsx
transition={{ delay: index * 0.1 }}
```

**Viewport Triggered:**
```tsx
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

#### 5. Continuous Animations

**Vapor Trail:**
```tsx
animate={{
    opacity: [0.2, 0.35, 0.2],
    scaleX: [0.8, 1.2, 0.8],
}}
transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
}}
```

**Floating CTA Ripple:**
```tsx
animate-ping  // Tailwind utility
```

**Testimonial Slider:**
```tsx
// Auto-rotate every 5 seconds
useEffect(() => {
    const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
}, []);
```

**Floating Elements:**
```tsx
animate-pulse  // Pulsing circles
style={{ animationDelay: '1s' }}  // Staggered timing
```

### Custom CSS Animations

**Float Animation:**
```css
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
```

**Blob Animation (legacy):**
```css
@keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
}
```

---

## Data Structure

### Destination Interface

```typescript
export interface Destination {
    id: number;
    name: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    difficulty: string;
    region: string;
    duration: string;
    bestSeason: string;
    altitude: string;
    image: string;
    gallery: string[];
    highlights: string[];
    rating: number;
    reviews: number;
    price: string;
    iconName: string;  // Lucide icon name
    color: string;     // Hex color code
}
```

### Available Destinations (8 total)

1. **Kathmandu** - Capital city, UNESCO sites
2. **Pokhara** - Lake paradise, adventure capital
3. **Mustang** - Hidden kingdom, desert landscapes
4. **Dolpo** - Remote wilderness, pristine lakes
5. **Annapurna Circuit** - Classic high-altitude trek
6. **Gokyo Lakes** - Turquoise lakes, Everest views
7. **Langtang Valley** - Valley of glaciers
8. **Poon Hill** - Short trek, sunrise views

### Icon Mapping

```typescript
// Dynamic icon loading
const IconComponent = (LucideIcons as any)[destination.iconName] || Mountain;

// Icon names used:
- Building2 (Kathmandu)
- Mountain (Pokhara, Langtang)
- Castle (Mustang)
- MountainSnow (Dolpo)
- Footprints (Annapurna Circuit)
- Gem (Gokyo Lakes)
- Sunrise (Poon Hill)
```

---

## Features

### 1. Functional Search System

**Location:** Hero section

**How It Works:**
1. User types in search bar
2. Real-time filtering of destinations
3. Dropdown shows matching results
4. Click result → navigate to destination page
5. Click outside → close dropdown
6. Empty state if no results

**Search Fields:**
- Destination name
- Title
- Description
- Region

**UI Elements:**
- Search icon (Lucide `Search`)
- Arrow icon (Lucide `ArrowRight`)
- Color-coded destination badges
- Difficulty & region labels

---

### 2. Dynamic Routing

**Destination Pages:** `/destinations/[slug]`

**Static Generation:**
```typescript
export async function generateStaticParams() {
    return destinations.map((dest) => ({
        slug: dest.slug,
    }));
}
```

**Generated Routes:**
- `/destinations/kathmandu`
- `/destinations/pokhara`
- `/destinations/mustang`
- `/destinations/dolpo`
- `/destinations/annapurna-circuit`
- `/destinations/gokyo-lakes`
- `/destinations/langtang-valley`
- `/destinations/poon-hill`

**All Destinations Page:** `/destinations`

---

### 3. Interactive Journey Section

**Scroll-Based Storytelling:**
- SVG path draws as user scrolls
- Cards reveal progressively
- Active destination highlights
- Click card → navigate to page

**Visual Elements:**
- Gradient path line (multi-color)
- Background dotted path
- Icon badges on cards
- Step number indicators
- Progress bars

**Mobile Behavior:**
- Path hidden
- Cards stack vertically
- Still clickable

---

### 4. Star Rating System

**Implementation:**
```tsx
{[...Array(5)].map((_, i) => (
    <Star
        key={i}
        className={`w-4 h-4 ${
            i < Math.floor(rating) 
                ? 'fill-accent text-accent' 
                : 'text-gray-300'
        }`}
    />
))}
```

**Used In:**
- Destination cards
- Destination pages
- Stats section (single star)
- All destinations page

---

### 5. Premium Visual Effects

**Golden Glow:**
```tsx
<div className="absolute top-[-100px] left-1/2 -translate-x-1/2 
    w-[600px] h-[300px] bg-[#F59E0B]/20 blur-[120px]" />
```

**Dot Pattern:**
```tsx
<div className="absolute inset-0 opacity-10 
    bg-[radial-gradient(#ffffff_1px,transparent_1px)] 
    [background-size:20px_20px]" />
```

**Floating Circles:**
```tsx
<div className="absolute w-40 h-40 bg-[#F59E0B]/10 
    rounded-full top-10 right-10 animate-pulse" />
```

**Plane Trail:**
```tsx
<div className="absolute bottom-10 left-0 w-full h-[2px] 
    bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />
```

---

## File Structure

```
unseen-nepal/
├── app/
│   ├── destinations/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic destination pages
│   │   └── page.tsx               # All destinations listing
│   ├── layout.tsx                 # Root layout with fonts
│   ├── page.tsx                   # Home page composition
│   └── globals.css                # Global styles + animations
│
├── components/
│   ├── Navbar.tsx                 # Navigation with scroll detection
│   ├── Hero.tsx                   # Hero with functional search
│   ├── ScrollPlane.tsx            # Scroll-triggered plane
│   ├── ScrollProgress.tsx         # Progress bar
│   ├── FloatingCTA.tsx            # Floating CTA button
│   ├── FeaturedDestinations.tsx   # First 4 destinations
│   ├── JourneySection.tsx         # 🔥 SIGNATURE FEATURE
│   ├── ExperienceSection.tsx      # Why choose us
│   ├── StatsSection.tsx           # Animated counters
│   ├── FeaturedStories.tsx        # Travel stories
│   ├── TestimonialsSlider.tsx     # Auto-rotating reviews
│   ├── CTASection.tsx             # Call to action
│   └── Footer.tsx                 # Footer with social links
│
├── data/
│   └── destinations.ts            # 8 destinations with full data
│
├── public/
│   ├── plane.png                  # Plane image
│   └── .gitkeep
│
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
├── next.config.mjs                # Next.js config
├── postcss.config.mjs             # PostCSS config
├── README.md                      # Project README
├── gpt.md                         # Original documentation
├── SPRINT_COMPLETED.md            # Sprint summary
├── ICON_UPGRADE_COMPLETE.md       # Icon upgrade notes
└── LANDING_PAGE_DOCUMENTATION.md  # This file
```

---

## Dependencies

### Production Dependencies
```json
{
  "framer-motion": "^11.0.0",
  "lucide-react": "latest",
  "next": "^16.2.1",
  "react": "^18.3.0",
  "react-dom": "^18.3.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.4.19",
  "postcss": "^8.4.38",
  "tailwindcss": "^3.4.3",
  "typescript": "^5"
}
```

---

## Performance Optimizations

### 1. Image Optimization
- Next.js Image component with lazy loading
- Responsive images with `fill` prop
- Automatic WebP conversion

### 2. Code Splitting
- Dynamic imports where needed
- Component-level code splitting
- Route-based splitting (App Router)

### 3. Static Generation
- All destination pages pre-rendered at build time
- Fast page loads with SSG
- No runtime data fetching

### 4. Animation Performance
- CSS transforms (GPU-accelerated)
- `will-change` hints where needed
- Reduced motion on mobile

### 5. Mobile Optimization
- Plane animation hidden on mobile
- Simplified journey section
- Reduced animation complexity

---

## Accessibility Features

### 1. Semantic HTML
- Proper heading hierarchy (h1 → h6)
- `<nav>`, `<main>`, `<section>`, `<article>` tags
- `<button>` for interactive elements

### 2. ARIA Labels
```tsx
aria-label="Instagram"
aria-label="Search destinations"
```

### 3. Keyboard Navigation
- All interactive elements focusable
- Tab order follows visual order
- Enter/Space for button activation

### 4. Focus States
```tsx
focus:outline-none focus:ring-4 focus:ring-accent/50
```

### 5. Alt Text
- All images have descriptive alt text
- Icons have aria-labels

---

## SEO Optimization

### 1. Metadata
```tsx
export const metadata = {
    title: "Unseen Nepal - Discover Hidden Destinations",
    description: "Explore Nepal's hidden gems...",
};
```

### 2. Static Generation
- All pages pre-rendered
- Fast initial load
- Better crawlability

### 3. Semantic Structure
- Proper heading hierarchy
- Descriptive link text
- Structured data ready

### 4. Image Optimization
- Next.js Image component
- Automatic lazy loading
- Responsive images

---

## Browser Support

### Supported Browsers
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- ES6+ JavaScript
- Intersection Observer API
- Framer Motion support

---

## Build & Deployment

### Build Command
```bash
npm run build
```

### Build Output
```
Route (app)
┌ ○ /                          # Home page (static)
├ ○ /_not-found                # 404 page
├ ○ /destinations              # All destinations (static)
└ ● /destinations/[slug]       # Dynamic routes (SSG)
  ├ /destinations/kathmandu
  ├ /destinations/pokhara
  ├ /destinations/mustang
  └ [+5 more paths]
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

---

## Future Enhancements

### High Priority
- [ ] Connect search to destinations page with filters
- [ ] Add booking form functionality
- [ ] Integrate CMS (Sanity/Contentful)
- [ ] Add user authentication
- [ ] Implement favorites system

### Medium Priority
- [ ] Add blog section
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Advanced search filters
- [ ] Social sharing

### Low Priority
- [ ] Video content integration
- [ ] Analytics dashboard
- [ ] Newsletter integration
- [ ] Live chat support
- [ ] Payment integration

---

## Credits & Resources

### Images
- **Source:** Unsplash
- **License:** Free to use

### Icons
- **Library:** Lucide React
- **License:** ISC License

### Fonts
- **Playfair Display:** Google Fonts (OFL)
- **Inter:** Google Fonts (OFL)

### Inspiration
- Premium travel brands
- Luxury booking platforms
- Modern landing page designs

---

## License

This project is for portfolio/demonstration purposes.

---

## Contact & Support

For questions or support, please refer to the project repository.

---

**Last Updated:** January 2025  
**Version:** 2.0.0  
**Status:** Production Ready ✅
