export interface UserProfile {
    id: number;
    name: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    username?: string;
    email: string;
    phone?: string;
    countryCode?: string;
    avatar: string;
    bio: string;
    location: string;
    joinedDate: string;
    emergencyContact?: {
        name: string;
        phone: string;
    };
    stats: {
        destinationsPlanned: number;
        tripsCompleted: number;
        reviewsWritten: number;
        storiesShared: number;
        bookingsMade: number;
        favoriteRegion: string;
        averageRating: number;
        experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
    };
    recentReviews: {
        id: number;
        destinationName: string;
        reviewText: string;
        rating: number;
        timeAgo: string;
    }[];
    bookings: {
        id: number;
        guideName: string;
        destination: string;
        date: string;
        status: 'Completed' | 'Upcoming';
    }[];
    stories: {
        id: number;
        image: string;
        title: string;
        publishedTime: string;
        likes: number;
        comments: number;
    }[];
    interactions: {
        id: number;
        type: 'Liked' | 'Commented';
        target: string;
        preview: string;
        timeAgo: string;
    }[];
    socialLinks: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
}

export const userProfile: UserProfile = {
    id: 1,
    name: "Alex Thompson",
    firstName: "Alex",
    middleName: "",
    lastName: "Thompson",
    username: "alexthompson",
    email: "alexthompson11@gmail..com",
    phone: "9876543210",
    countryCode: "+977",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: `Adventure enthusiast and mountain lover. Always seeking new trails and cultural experiences in the Himalayas. Passionate about sustainable tourism and connecting with local communities.`,
    location: "Kathmandu, Nepal",
    joinedDate: "2022-03-15",
    emergencyContact: {
        name: "Full name of contact",
        phone: "+1 5555551234"
    },
    stats: {
        destinationsPlanned: 15,
        tripsCompleted: 12,
        reviewsWritten: 24,
        storiesShared: 8,
        bookingsMade: 18,
        favoriteRegion: "Annapurna Region",
        averageRating: 4.5,
        experienceLevel: "Intermediate"
    },
    recentReviews: [
        {
            id: 1,
            destinationName: "Everest Base Camp",
            reviewText: "Absolutely breathtaking experience! The journey was challenging but rewarding.",
            rating: 5,
            timeAgo: "2 days ago"
        },
        {
            id: 2,
            destinationName: "Annapurna Circuit",
            reviewText: "One of the best treks I've ever done. Stunning views and amazing culture.",
            rating: 5,
            timeAgo: "1 week ago"
        },
        {
            id: 3,
            destinationName: "Langtang Valley",
            reviewText: "Beautiful trek with less crowds. Perfect for those seeking tranquility.",
            rating: 4,
            timeAgo: "2 weeks ago"
        },
        {
            id: 4,
            destinationName: "Poon Hill",
            reviewText: "Short but sweet trek with incredible sunrise views over the Himalayas.",
            rating: 5,
            timeAgo: "3 weeks ago"
        },
        {
            id: 5,
            destinationName: "Manaslu Circuit",
            reviewText: "Off the beaten path adventure. Challenging but absolutely worth it!",
            rating: 5,
            timeAgo: "1 month ago"
        }
    ],
    bookings: [
        {
            id: 1,
            guideName: "Nima Sherpa",
            destination: "Everest Base Camp",
            date: "2024-11-15",
            status: "Completed"
        },
        {
            id: 2,
            guideName: "Pasang Lama",
            destination: "Annapurna Circuit",
            date: "2024-09-20",
            status: "Completed"
        },
        {
            id: 3,
            guideName: "Tenzing Dorje",
            destination: "Manaslu Circuit",
            date: "2025-04-10",
            status: "Upcoming"
        },
        {
            id: 4,
            guideName: "Dawa Sherpa",
            destination: "Langtang Valley",
            date: "2024-08-05",
            status: "Completed"
        },
        {
            id: 5,
            guideName: "Mingma Tsering",
            destination: "Upper Mustang",
            date: "2025-05-20",
            status: "Upcoming"
        }
    ],
    stories: [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
            title: "Lost in the Clouds: My Everest Journey",
            publishedTime: "2 days ago",
            likes: 234,
            comments: 45
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            title: "Sunrise at Poon Hill",
            publishedTime: "1 week ago",
            likes: 189,
            comments: 32
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
            title: "Cultural Immersion in Langtang",
            publishedTime: "2 weeks ago",
            likes: 156,
            comments: 28
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",
            title: "The Hidden Trails of Manaslu",
            publishedTime: "3 weeks ago",
            likes: 201,
            comments: 38
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            title: "Annapurna: A Journey Through Time",
            publishedTime: "1 month ago",
            likes: 278,
            comments: 52
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
            title: "Tea Houses and Mountain Views",
            publishedTime: "1 month ago",
            likes: 167,
            comments: 29
        }
    ],
    interactions: [
        {
            id: 1,
            type: "Liked",
            target: "Everest Base Camp Trek Guide",
            preview: "Comprehensive guide to trekking Everest Base Camp",
            timeAgo: "1 hour ago"
        },
        {
            id: 2,
            type: "Commented",
            target: "Best Time to Visit Nepal",
            preview: "Great article! I'd also recommend visiting in October...",
            timeAgo: "3 hours ago"
        },
        {
            id: 3,
            type: "Liked",
            target: "Annapurna Circuit Photo Gallery",
            preview: "Stunning photography from the Annapurna Circuit",
            timeAgo: "1 day ago"
        },
        {
            id: 4,
            type: "Commented",
            target: "Trekking Gear Essentials",
            preview: "Don't forget a good quality sleeping bag! It gets cold...",
            timeAgo: "2 days ago"
        },
        {
            id: 5,
            type: "Liked",
            target: "Sherpa Culture and Traditions",
            preview: "Deep dive into the rich culture of Sherpa people",
            timeAgo: "3 days ago"
        },
        {
            id: 6,
            type: "Commented",
            target: "Solo Trekking in Nepal",
            preview: "I've done several solo treks and it's incredibly safe...",
            timeAgo: "4 days ago"
        }
    ],
    socialLinks: {
        instagram: "https://instagram.com/alexhimalaya",
        facebook: "https://facebook.com/alex.thompson.trekker"
    }
};