# Unseen Nepal - Travel Landing Page

A premium Next.js travel landing page showcasing hidden destinations in Nepal with advanced scroll-based animations and real product functionality.

## 🚀 Features

- ✅ **Functional Search** - Real-time destination search with dropdown results
- ✅ **Dynamic Destination Pages** - Individual pages for each destination with full details
- ✅ **Clickable Journey Section** - Interactive scroll-based storytelling with navigation
- ✅ **Plane Animation** - Scroll-triggered plane that highlights active destinations
- ✅ **8 Destinations** - Comprehensive data with images, details, and pricing
- ✅ **Responsive Design** - Optimized for all devices
- ✅ **Modern Stack** - Next.js 16, TypeScript, Tailwind CSS, Framer Motion

## 🎯 What Makes This Different

This isn't just a landing page - it's a **real working product**:

1. **Search Actually Works** - Type "Pokhara" and get instant results
2. **Real Navigation** - Click any destination to see full details
3. **Interactive Journey** - Scroll to see destinations highlight and click to navigate
4. **Multi-Page App** - Individual destination pages with galleries, pricing, booking
5. **Connected Animations** - Plane animation syncs with journey section

## 📁 Project Structure

```
unseen-nepal/
├── app/
│   ├── destinations/
│   │   ├── [slug]/page.tsx    # Dynamic destination pages
│   │   └── page.tsx            # All destinations listing
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── components/
│   ├── Hero.tsx                # Search-enabled hero
│   ├── JourneySection.tsx      # Clickable journey cards
│   ├── FeaturedDestinations.tsx
│   └── ...
├── data/
│   └── destinations.ts         # 8 destinations with full data
└── public/
    └── plane.png
```

## 🗺️ Available Destinations

1. **Kathmandu** - Capital city with UNESCO sites
2. **Pokhara** - Lake paradise and adventure capital
3. **Mustang** - Hidden kingdom with desert landscapes
4. **Dolpo** - Remote wilderness and pristine lakes
5. **Annapurna Circuit** - Classic high-altitude trek
6. **Gokyo Lakes** - Turquoise lakes with Everest views
7. **Langtang Valley** - Valley of glaciers near Kathmandu
8. **Poon Hill** - Short trek with sunrise views

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Playfair Display, Inter
- **Images:** Next.js Image optimization

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ✨ Key Features Implemented

### 1. Functional Search (Hero Section)
- Real-time filtering of destinations
- Dropdown results with destination details
- Click to navigate to destination page
- Empty state handling ("No destinations found")
- Click outside to close dropdown

### 2. Dynamic Destination Pages
- Individual pages for each destination (`/destinations/[slug]`)
- Full destination details and descriptions
- Image galleries
- Pricing and booking information
- Quick info bar (difficulty, duration, altitude, season)
- Highlights list
- Related destinations
- Sticky booking card

### 3. Clickable Journey Section
- Click any journey card to navigate to destination
- Active state highlighting based on scroll position
- Plane animation syncs with journey progress
- Smooth transitions and hover effects

### 4. All Destinations Page
- Grid view of all 8 destinations
- Click any card to view details
- Ratings and reviews displayed

## 🎨 Design System

### Colors
- Primary: `#0F3D2E` (Deep forest green)
- Accent: `#F59E0B` (Golden sunrise)
- Gradients: Blue-purple for CTA sections

### Typography
- Headings: Playfair Display (luxury, editorial)
- Body: Inter (clean, modern)

### Animations
- Scroll-triggered plane (desktop only)
- Journey path drawing
- Card reveals and highlights
- Hover effects and transitions

## 📱 Responsive Design

- Mobile: Simplified layout, plane hidden
- Tablet: 2-column grids
- Desktop: Full animations and 4-column grids

## 🔮 Future Enhancements

- [ ] Connect search to destinations page with filters
- [ ] Add booking form functionality
- [ ] Integrate CMS for dynamic content
- [ ] Add user authentication
- [ ] Implement favorites system
- [ ] Add blog section
- [ ] Multi-language support
- [ ] Dark mode toggle

## 📄 License

This project is for portfolio/demonstration purposes.

## 🙏 Credits

- Images: Unsplash
- Icons: Emoji
- Fonts: Google Fonts
"# unseen" 
