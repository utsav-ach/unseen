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
    iconName: string;
    color: string;
}

export const destinations: Destination[] = [
    {
        id: 1,
        name: "Kathmandu",
        slug: "kathmandu",
        title: "Your Journey Begins",
        description: "Start your adventure in the vibrant capital, where ancient temples meet modern energy.",
        longDescription: "Kathmandu, the capital city of Nepal, is a vibrant blend of ancient culture and modern life. Explore UNESCO World Heritage Sites including Durbar Square, Swayambhunath (Monkey Temple), and Pashupatinath Temple. Wander through narrow alleys of Thamel, experience authentic Nepali cuisine, and witness the spiritual energy that permeates this historic city.",
        difficulty: "Easy",
        region: "Kathmandu Valley",
        duration: "2-3 days",
        bestSeason: "Oct-Nov, Mar-Apr",
        altitude: "1,400m",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1571768092938-05f03b610f30?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "UNESCO World Heritage Sites",
            "Ancient temples and stupas",
            "Vibrant local markets",
            "Traditional Newari architecture",
            "Authentic Nepali cuisine"
        ],
        rating: 4.8,
        reviews: 2847,
        price: "$50-100/day",
        iconName: "Building2",
        color: "#F59E0B"
    },
    {
        id: 2,
        name: "Pokhara",
        slug: "pokhara",
        title: "Lake Paradise",
        description: "Discover serene lakes surrounded by the majestic Annapurna range.",
        longDescription: "Pokhara is Nepal's adventure capital and a gateway to the Annapurna region. Nestled beside the tranquil Phewa Lake with stunning views of the Annapurna and Dhaulagiri mountain ranges, Pokhara offers the perfect blend of relaxation and adventure. Enjoy paragliding, boating, hiking, or simply relax by the lakeside cafes.",
        difficulty: "Easy to Moderate",
        region: "Western Nepal",
        duration: "3-5 days",
        bestSeason: "Oct-Nov, Mar-May",
        altitude: "822m",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Phewa Lake boating",
            "Paragliding adventures",
            "World Peace Pagoda",
            "Sarangkot sunrise views",
            "Davis Falls and caves"
        ],
        rating: 4.9,
        reviews: 3521,
        price: "$40-80/day",
        iconName: "Mountain",
        color: "#3B82F6"
    },
    {
        id: 3,
        name: "Mustang",
        slug: "mustang",
        title: "Hidden Kingdom",
        description: "Explore the ancient walled city and dramatic desert landscapes.",
        longDescription: "Upper Mustang, the former Kingdom of Lo, is a remote and mystical region that remained closed to outsiders until 1992. This high-altitude desert landscape features dramatic cliffs, ancient cave dwellings, and the walled city of Lo Manthang. Experience Tibetan Buddhist culture, visit centuries-old monasteries, and trek through one of the world's most unique landscapes.",
        difficulty: "Challenging",
        region: "Northern Nepal",
        duration: "10-14 days",
        bestSeason: "Mar-Nov",
        altitude: "3,840m",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Lo Manthang walled city",
            "Ancient cave monasteries",
            "Tibetan Buddhist culture",
            "Dramatic desert landscapes",
            "Restricted area permit required"
        ],
        rating: 4.7,
        reviews: 892,
        price: "$200-300/day",
        iconName: "Castle",
        color: "#EF4444"
    },
    {
        id: 4,
        name: "Dolpo",
        slug: "dolpo",
        title: "Remote Wilderness",
        description: "Experience untouched beauty in one of Nepal's most isolated regions.",
        longDescription: "Dolpo is one of the most remote and pristine regions in Nepal, made famous by the book and film 'The Snow Leopard'. This high-altitude wilderness offers stunning turquoise lakes, ancient Bon Po monasteries, and a chance to experience traditional Tibetan culture virtually unchanged for centuries. The trek to Shey Phoksundo Lake is considered one of the most beautiful in the Himalayas.",
        difficulty: "Very Challenging",
        region: "Northwestern Nepal",
        duration: "18-25 days",
        bestSeason: "May-Sep",
        altitude: "3,600m",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Shey Phoksundo Lake",
            "Ancient Bon Po culture",
            "Snow leopard habitat",
            "Pristine wilderness",
            "Minimal tourist infrastructure"
        ],
        rating: 4.9,
        reviews: 456,
        price: "$250-400/day",
        iconName: "MountainSnow",
        color: "#10B981"
    },
    {
        id: 5,
        name: "Annapurna Circuit",
        slug: "annapurna-circuit",
        title: "Classic Trek",
        description: "One of the world's most famous trekking routes with diverse landscapes.",
        longDescription: "The Annapurna Circuit is a classic trek that takes you through diverse landscapes from subtropical forests to high-altitude deserts. Cross the challenging Thorong La Pass at 5,416m, visit traditional villages, and enjoy spectacular mountain views. This trek offers the perfect combination of natural beauty, cultural immersion, and physical challenge.",
        difficulty: "Challenging",
        region: "Central Nepal",
        duration: "15-20 days",
        bestSeason: "Oct-Nov, Mar-May",
        altitude: "5,416m",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Thorong La Pass crossing",
            "Diverse landscapes",
            "Traditional mountain villages",
            "Hot springs at Tatopani",
            "Muktinath temple"
        ],
        rating: 4.8,
        reviews: 4521,
        price: "$30-60/day",
        iconName: "Footprints",
        color: "#8B5CF6"
    },
    {
        id: 6,
        name: "Gokyo Lakes",
        slug: "gokyo-lakes",
        title: "Turquoise Paradise",
        description: "Trek to stunning high-altitude lakes with views of Everest.",
        longDescription: "The Gokyo Lakes trek offers a less crowded alternative to Everest Base Camp while providing equally spectacular mountain views. Trek through Sherpa villages, cross suspension bridges, and reach the stunning turquoise Gokyo Lakes. Climb Gokyo Ri for panoramic views of four 8,000m peaks including Everest, Lhotse, Makalu, and Cho Oyu.",
        difficulty: "Challenging",
        region: "Everest Region",
        duration: "12-15 days",
        bestSeason: "Oct-Nov, Mar-May",
        altitude: "5,357m",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Six turquoise glacial lakes",
            "Gokyo Ri viewpoint",
            "Views of 4 x 8000m peaks",
            "Ngozumpa Glacier",
            "Sherpa culture"
        ],
        rating: 4.9,
        reviews: 1876,
        price: "$40-80/day",
        iconName: "Gem",
        color: "#06B6D4"
    },
    {
        id: 7,
        name: "Langtang Valley",
        slug: "langtang-valley",
        title: "Valley of Glaciers",
        description: "Beautiful valley trek close to Kathmandu with stunning mountain views.",
        longDescription: "Langtang Valley, known as the 'Valley of Glaciers', offers a spectacular trek close to Kathmandu. This region was heavily affected by the 2015 earthquake but has rebuilt beautifully. Trek through rhododendron forests, visit traditional Tamang villages, and enjoy close-up views of Langtang Lirung. The trek combines natural beauty with cultural experiences.",
        difficulty: "Moderate",
        region: "Central Nepal",
        duration: "7-10 days",
        bestSeason: "Oct-Nov, Mar-May",
        altitude: "3,870m",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Kyanjin Gompa monastery",
            "Langtang Lirung views",
            "Tamang culture",
            "Cheese factories",
            "Close to Kathmandu"
        ],
        rating: 4.7,
        reviews: 2134,
        price: "$25-50/day",
        iconName: "Mountain",
        color: "#10B981"
    },
    {
        id: 8,
        name: "Poon Hill",
        slug: "poon-hill",
        title: "Sunrise Spectacular",
        description: "Short trek with incredible sunrise views over the Annapurna range.",
        longDescription: "Poon Hill is perfect for those with limited time who still want to experience the Himalayas. This short trek offers spectacular sunrise views over the Annapurna and Dhaulagiri ranges. Trek through beautiful rhododendron forests, stay in traditional Gurung villages, and enjoy one of the most famous sunrise viewpoints in Nepal.",
        difficulty: "Easy to Moderate",
        region: "Annapurna Region",
        duration: "4-5 days",
        bestSeason: "Oct-Nov, Mar-Apr",
        altitude: "3,210m",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
        ],
        highlights: [
            "Famous sunrise viewpoint",
            "Panoramic mountain views",
            "Rhododendron forests",
            "Gurung villages",
            "Short duration trek"
        ],
        rating: 4.8,
        reviews: 3892,
        price: "$20-40/day",
        iconName: "Sunrise",
        color: "#F59E0B"
    }
];
