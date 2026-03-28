export interface Story {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorImage: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    iconName: string;
    color: string;
    tags: string[];
}

export const stories: Story[] = [
    {
        id: 1,
        title: "Lost in the Clouds",
        slug: "lost-in-the-clouds",
        excerpt: "My unexpected adventure when fog descended on Everest Base Camp trek and taught me the true meaning of patience.",
        content: "The morning started like any other on the trail to Everest Base Camp. Clear skies, crisp mountain air, and the promise of spectacular views ahead. But nature had other plans. Within an hour, thick fog rolled in, reducing visibility to mere meters. What seemed like a setback became one of the most profound experiences of my life...",
        author: "Sarah Johnson",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        date: "Dec 15, 2024",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
        category: "Adventure",
        iconName: "BookOpen",
        color: "#F59E0B",
        tags: ["Everest", "Trekking", "Solo Travel"]
    },
    {
        id: 2,
        title: "Tea Houses and Friendships",
        slug: "tea-houses-and-friendships",
        excerpt: "How a broken ankle led to the most meaningful connections of my life in a remote Himalayan village.",
        content: "They say the best travel stories come from things going wrong. I never believed it until I slipped on a wet stone path in the Annapurna region. What followed was three weeks in a small tea house, unable to continue my trek. Those three weeks changed my life forever...",
        author: "Mike Chen",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        date: "Dec 10, 2024",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
        category: "Culture",
        iconName: "Backpack",
        color: "#3B82F6",
        tags: ["Annapurna", "Culture", "Friendship"]
    },
    {
        id: 3,
        title: "Festival in the Mountains",
        slug: "festival-in-the-mountains",
        excerpt: "Celebrating Tihar with a local family in remote Mustang region - lights, laughter, and unforgettable memories.",
        content: "Tihar, the festival of lights, is magical anywhere in Nepal. But celebrating it in the remote Mustang region, with a family who welcomed me as their own, was something beyond words. The oil lamps flickering against ancient stone walls, the sound of traditional songs echoing through narrow alleys...",
        author: "Priya Sharma",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        date: "Dec 5, 2024",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop",
        category: "Culture",
        iconName: "Flower2",
        color: "#EF4444",
        tags: ["Mustang", "Festival", "Culture"]
    },
    {
        id: 4,
        title: "Solo Female Trekker",
        slug: "solo-female-trekker",
        excerpt: "Safety tips and empowering moments from my solo Manaslu trek - proving that adventure has no gender.",
        content: "As a solo female trekker, I've heard every concern, every warning, every 'are you sure?' But the Manaslu Circuit taught me that courage isn't the absence of fear - it's moving forward despite it. Here's my honest account of trekking alone in the Himalayas...",
        author: "Emma Wilson",
        authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
        date: "Nov 28, 2024",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&h=800&fit=crop",
        category: "Adventure",
        iconName: "Mountain",
        color: "#10B981",
        tags: ["Manaslu", "Solo Travel", "Women"]
    },
    {
        id: 5,
        title: "Sunrise at Poon Hill",
        slug: "sunrise-at-poon-hill",
        excerpt: "Waking up at 4 AM for the most spectacular sunrise view of the Annapurna and Dhaulagiri ranges.",
        content: "The alarm went off at 4 AM. It was freezing. Every fiber of my being wanted to stay in the warm sleeping bag. But I had come to Poon Hill for one reason - the sunrise. And what a sunrise it was...",
        author: "David Kumar",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        date: "Nov 20, 2024",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
        category: "Photography",
        iconName: "Sunrise",
        color: "#F59E0B",
        tags: ["Poon Hill", "Photography", "Sunrise"]
    },
    {
        id: 6,
        title: "The Kindness of Strangers",
        slug: "kindness-of-strangers",
        excerpt: "When I lost my way in Langtang Valley, a local shepherd became my unexpected guide and friend.",
        content: "I pride myself on my navigation skills. GPS, maps, compass - I had it all. But in the Langtang Valley, technology failed me. What didn't fail was the kindness of a local shepherd who found me sitting confused at a trail junction...",
        author: "Lisa Anderson",
        authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
        date: "Nov 15, 2024",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
        category: "Culture",
        iconName: "Heart",
        color: "#EF4444",
        tags: ["Langtang", "Culture", "Kindness"]
    }
];
