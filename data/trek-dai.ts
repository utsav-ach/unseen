export interface Guide {
    id: number;
    name: string;
    slug: string;
    location: string;
    region: string;
    bio: string;
    experience: string;
    specialties: string[];
    languages: string[];
    certifications: string[];
    avatar: string;
    rating: number;
    reviews: number;
    phone: string;
    email: string;
    priceRange: string;
    availability: boolean;
    verified: boolean;
    joinedDate: string;
    totalTrips: number;
    iconName: string;
    color: string;
    coordinates?: [number, number]; // Add coordinates for map positioning
}

export interface Accommodation {
    id: number;
    name: string;
    slug: string;
    type: 'hotel' | 'homestay' | 'lodge' | 'guesthouse';
    location: string;
    region: string;
    bio: string;
    amenities: string[];
    roomTypes: string[];
    avatar: string;
    gallery: string[];
    rating: number;
    reviews: number;
    phone: string;
    email: string;
    priceRange: string;
    altitude: string;
    capacity: number;
    verified: boolean;
    establishedYear: number;
    iconName: string;
    color: string;
}

export const guides: Guide[] = [
    {
        id: 1,
        name: "Nima Sherpa",
        slug: "nima-sherpa",
        location: "Namche Bazaar, Solukhumbu",
        region: "Everest Region",
        bio: "IFMGA-certified guide with 10+ years experience leading treks to EBC, Gokyo, and Annapurna circuits. Specializes in high-altitude mountaineering and has summited Everest twice. Known for his safety-first approach and deep knowledge of Sherpa culture.",
        experience: "12 years",
        specialties: ["High-altitude trekking", "Everest Base Camp", "Gokyo Lakes", "Island Peak", "Mountaineering"],
        languages: ["English", "Nepali", "Sherpa", "Hindi"],
        certifications: ["IFMGA Mountain Guide", "Wilderness First Aid", "High Altitude Rescue"],
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",
        rating: 4.9,
        reviews: 156,
        phone: "+977-9841234567",
        email: "nima.sherpa@example.com",
        priceRange: "$40-60/day",
        availability: true,
        verified: true,
        joinedDate: "2018-03-15",
        totalTrips: 287,
        iconName: "Mountain",
        color: "#3B82F6",
        coordinates: [27.9881, 86.9250]
    },
    {
        id: 2,
        name: "Pemba Lama",
        slug: "pemba-lama",
        location: "Lukla, Solukhumbu",
        region: "Everest Region",
        bio: "Local Sherpa guide with deep knowledge of Everest region culture and traditions. Expert in sustainable tourism practices and passionate about preserving local heritage. Fluent storyteller who brings the mountains to life.",
        experience: "8 years",
        specialties: ["Cultural tours", "Everest Base Camp", "Sustainable tourism", "Photography tours"],
        languages: ["English", "Nepali", "Sherpa", "Tibetan"],
        certifications: ["Nepal Trekking Guide License", "Cultural Heritage Guide", "First Aid Certified"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        rating: 4.8,
        reviews: 98,
        phone: "+977-9841234568",
        email: "pemba.lama@example.com",
        priceRange: "$35-50/day",
        availability: true,
        verified: true,
        joinedDate: "2019-06-20",
        totalTrips: 142,
        iconName: "Camera",
        color: "#10B981",
        coordinates: [27.6869, 86.7320]
    },
    {
        id: 3,
        name: "Kiran Gurung",
        slug: "kiran-gurung",
        location: "Pokhara, Kaski",
        region: "Annapurna Region",
        bio: "Annapurna region specialist with expertise in off-the-beaten-path routes. Fluent in English, Hindi, and Nepali. Known for his warm personality and ability to customize treks based on client preferences and fitness levels.",
        experience: "9 years",
        specialties: ["Annapurna Circuit", "Poon Hill", "Mardi Himal", "Custom treks", "Adventure sports"],
        languages: ["English", "Nepali", "Hindi", "Gurung"],
        certifications: ["Nepal Trekking Guide License", "Paragliding Instructor", "River Rafting Guide"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        rating: 4.7,
        reviews: 89,
        phone: "+977-9841234569",
        email: "kiran.gurung@example.com",
        priceRange: "$30-45/day",
        availability: true,
        verified: true,
        joinedDate: "2020-01-10",
        totalTrips: 156,
        iconName: "Compass",
        color: "#22C55E",
        coordinates: [28.2096, 83.9856]
    },
    {
        id: 4,
        name: "Tenzin Norbu",
        slug: "tenzin-norbu",
        location: "Lo Manthang, Mustang",
        region: "Mustang Region",
        bio: "Born and raised in Upper Mustang, Tenzin is your gateway to the forbidden kingdom. Expert in Tibetan Buddhist culture, ancient monasteries, and the unique desert landscape of Mustang. Speaks fluent Tibetan and has connections with local communities.",
        experience: "7 years",
        specialties: ["Upper Mustang", "Tibetan culture", "Monastery tours", "Desert trekking", "Cultural immersion"],
        languages: ["English", "Nepali", "Tibetan", "Hindi"],
        certifications: ["Nepal Trekking Guide License", "Cultural Heritage Specialist", "Buddhist Philosophy"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        rating: 4.9,
        reviews: 67,
        phone: "+977-9841234570",
        email: "tenzin.norbu@example.com",
        priceRange: "$50-70/day",
        availability: true,
        verified: true,
        joinedDate: "2021-04-05",
        totalTrips: 89,
        iconName: "Castle",
        color: "#EF4444",
        coordinates: [28.7917, 83.8333]
    },
    {
        id: 5,
        name: "Ang Dorje Sherpa",
        slug: "ang-dorje-sherpa",
        location: "Gokyo, Solukhumbu",
        region: "Everest Region",
        bio: "Veteran high-altitude guide with 15+ years of experience. Has guided expeditions to multiple 8000m peaks and is known for his exceptional safety record. Specializes in technical climbing and high-altitude rescue operations.",
        experience: "15 years",
        specialties: ["High-altitude climbing", "Technical mountaineering", "Rescue operations", "Expedition support"],
        languages: ["English", "Nepali", "Sherpa", "Japanese"],
        certifications: ["IFMGA Mountain Guide", "High Altitude Rescue Specialist", "Avalanche Safety"],
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        rating: 4.9,
        reviews: 203,
        phone: "+977-9841234571",
        email: "angdorje.sherpa@example.com",
        priceRange: "$60-80/day",
        availability: false,
        verified: true,
        joinedDate: "2017-08-12",
        totalTrips: 412,
        iconName: "MountainSnow",
        color: "#8B5CF6",
        coordinates: [27.9600, 86.6900]
    },
    {
        id: 6,
        name: "Maya Tamang",
        slug: "maya-tamang",
        location: "Langtang, Rasuwa",
        region: "Langtang Region",
        bio: "One of Nepal's leading female trekking guides, Maya specializes in the Langtang region and Tamang heritage trails. Passionate about women's empowerment in tourism and sustainable community development.",
        experience: "6 years",
        specialties: ["Langtang Valley", "Tamang Heritage Trail", "Women's trekking groups", "Community tourism"],
        languages: ["English", "Nepali", "Tamang", "Hindi"],
        certifications: ["Nepal Trekking Guide License", "Women's Leadership in Tourism", "Community Guide"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        rating: 4.8,
        reviews: 74,
        phone: "+977-9841234572",
        email: "maya.tamang@example.com",
        priceRange: "$25-40/day",
        availability: true,
        verified: true,
        joinedDate: "2021-09-18",
        totalTrips: 98,
        iconName: "Heart",
        color: "#EC4899",
        coordinates: [28.2096, 85.5240]
    },
    {
        id: 7,
        name: "Rajesh Rai",
        slug: "rajesh-rai",
        location: "Taplejung, Kanchenjunga",
        region: "Kanchenjunga Region",
        bio: "Expert guide for the remote Kanchenjunga region with deep knowledge of eastern Nepal's biodiversity and culture. Specializes in off-the-beaten-path adventures and wildlife spotting.",
        experience: "11 years",
        specialties: ["Kanchenjunga Base Camp", "Wildlife tours", "Remote trekking", "Bird watching"],
        languages: ["English", "Nepali", "Rai", "Hindi"],
        certifications: ["Nepal Trekking Guide License", "Wildlife Guide", "First Aid Certified"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        rating: 4.7,
        reviews: 52,
        phone: "+977-9841234579",
        email: "rajesh.rai@example.com",
        priceRange: "$35-55/day",
        availability: true,
        verified: true,
        joinedDate: "2019-03-22",
        totalTrips: 134,
        iconName: "Binoculars",
        color: "#F59E0B",
        coordinates: [27.3500, 87.8667]
    },
    {
        id: 8,
        name: "Dawa Sherpa",
        slug: "dawa-sherpa",
        location: "Dingboche, Solukhumbu",
        region: "Everest Region",
        bio: "High-altitude specialist with extensive experience in the Everest region. Known for excellent acclimatization guidance and emergency response skills. Has led over 200 successful EBC treks.",
        experience: "14 years",
        specialties: ["Everest Base Camp", "Three Passes Trek", "Acclimatization expert", "Emergency response"],
        languages: ["English", "Nepali", "Sherpa", "French"],
        certifications: ["IFMGA Mountain Guide", "Wilderness First Responder", "Avalanche Safety Level 2"],
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        rating: 4.9,
        reviews: 187,
        phone: "+977-9841234580",
        email: "dawa.sherpa@example.com",
        priceRange: "$50-70/day",
        availability: true,
        verified: true,
        joinedDate: "2017-05-10",
        totalTrips: 256,
        iconName: "Shield",
        color: "#3B82F6",
        coordinates: [27.8917, 86.8311]
    },
    {
        id: 9,
        name: "Suman Thapa",
        slug: "suman-thapa",
        location: "Jomsom, Mustang",
        region: "Mustang Region",
        bio: "Mustang and Annapurna circuit specialist with a passion for photography and cultural storytelling. Offers unique perspectives on the trans-Himalayan landscape and Thakali culture.",
        experience: "9 years",
        specialties: ["Annapurna Circuit", "Upper Mustang", "Photography tours", "Cultural immersion"],
        languages: ["English", "Nepali", "Thakali", "Hindi"],
        certifications: ["Nepal Trekking Guide License", "Photography Guide", "Cultural Heritage Specialist"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        rating: 4.6,
        reviews: 93,
        phone: "+977-9841234581",
        email: "suman.thapa@example.com",
        priceRange: "$30-50/day",
        availability: true,
        verified: true,
        joinedDate: "2020-07-15",
        totalTrips: 142,
        iconName: "Camera",
        color: "#8B5CF6",
        coordinates: [28.7806, 83.7231]
    },
    {
        id: 10,
        name: "Pasang Lama",
        slug: "pasang-lama",
        location: "Samagaon, Gorkha",
        region: "Manaslu Region",
        bio: "Manaslu circuit expert born and raised in the region. Offers authentic cultural experiences with Tibetan Buddhist communities and knows every trail and teahouse in the area.",
        experience: "10 years",
        specialties: ["Manaslu Circuit", "Tsum Valley", "Buddhist culture", "Teahouse trekking"],
        languages: ["English", "Nepali", "Tibetan", "Gurung"],
        certifications: ["Nepal Trekking Guide License", "Cultural Guide", "First Aid Certified"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        rating: 4.8,
        reviews: 76,
        phone: "+977-9841234582",
        email: "pasang.lama@example.com",
        priceRange: "$35-50/day",
        availability: true,
        verified: true,
        joinedDate: "2019-11-08",
        totalTrips: 118,
        iconName: "Mountain",
        color: "#06B6D4",
        coordinates: [28.6333, 84.7167]
    },
    {
        id: 11,
        name: "Bikram Magar",
        slug: "bikram-magar",
        location: "Ghorepani, Myagdi",
        region: "Annapurna Region",
        bio: "Poon Hill and Annapurna foothills specialist. Perfect for first-time trekkers and families. Known for his patience, storytelling, and ability to make every trek memorable and comfortable.",
        experience: "5 years",
        specialties: ["Poon Hill", "Ghorepani trek", "Family treks", "Beginner-friendly"],
        languages: ["English", "Nepali", "Magar", "Hindi"],
        certifications: ["Nepal Trekking Guide License", "First Aid Certified", "Family Trek Specialist"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        rating: 4.7,
        reviews: 64,
        phone: "+977-9841234583",
        email: "bikram.magar@example.com",
        priceRange: "$25-35/day",
        availability: true,
        verified: true,
        joinedDate: "2021-02-14",
        totalTrips: 87,
        iconName: "Users",
        color: "#22C55E",
        coordinates: [28.3917, 83.7042]
    },
    {
        id: 12,
        name: "Tsering Dolma",
        slug: "tsering-dolma",
        location: "Dunai, Dolpo",
        region: "Dolpo Region",
        bio: "One of the few female guides specializing in the remote Dolpo region. Expert in Bon Buddhism, traditional medicine, and the unique culture of this isolated Himalayan region.",
        experience: "7 years",
        specialties: ["Upper Dolpo", "Shey Phoksundo", "Bon culture", "Remote trekking"],
        languages: ["English", "Nepali", "Tibetan", "Dolpo"],
        certifications: ["Nepal Trekking Guide License", "Cultural Heritage Guide", "Wilderness First Aid"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        rating: 4.9,
        reviews: 41,
        phone: "+977-9841234584",
        email: "tsering.dolma@example.com",
        priceRange: "$55-75/day",
        availability: true,
        verified: true,
        joinedDate: "2020-09-01",
        totalTrips: 68,
        iconName: "Sparkles",
        color: "#EC4899",
        coordinates: [28.9667, 82.9000]
    }
];

export const accommodations: Accommodation[] = [
    {
        id: 1,
        name: "Mountain View Homestay",
        slug: "mountain-view-homestay",
        type: "homestay",
        location: "Ghandruk, Kaski",
        region: "Annapurna Region",
        bio: "Traditional homestay with warm rooms, authentic local meals, and stunning sunrise views over Machhapuchhre and Annapurna. Family-run for three generations, offering genuine Gurung hospitality and cultural experiences.",
        amenities: ["Traditional meals", "Mountain views", "Cultural programs", "Organic garden", "Hot shower", "WiFi"],
        roomTypes: ["Twin sharing", "Single room", "Dormitory"],
        avatar: "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        ],
        rating: 4.6,
        reviews: 124,
        phone: "+977-9841234573",
        email: "mountainview@example.com",
        priceRange: "$15-25/night",
        altitude: "1,940m",
        capacity: 20,
        verified: true,
        establishedYear: 1995,
        iconName: "Home",
        color: "#10B981"
    },
    {
        id: 2,
        name: "Everest Sherpa Lodge",
        slug: "everest-sherpa-lodge",
        type: "lodge",
        location: "Namche Bazaar, Solukhumbu",
        region: "Everest Region",
        bio: "Family-run lodge in the heart of Sherpa country. Clean rooms, hearty meals, and legendary Sherpa hospitality at 3,440m altitude. Perfect base for acclimatization with stunning mountain views and cultural experiences.",
        amenities: ["Mountain views", "Heated dining room", "Hot shower", "WiFi", "Bakery", "Equipment rental"],
        roomTypes: ["Twin sharing", "Single room", "Deluxe room"],
        avatar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
        ],
        rating: 4.8,
        reviews: 189,
        phone: "+977-9841234574",
        email: "everestlodge@example.com",
        priceRange: "$20-35/night",
        altitude: "3,440m",
        capacity: 30,
        verified: true,
        establishedYear: 1988,
        iconName: "Mountain",
        color: "#3B82F6"
    },
    {
        id: 3,
        name: "Heritage Hotel Bandipur",
        slug: "heritage-hotel-bandipur",
        type: "hotel",
        location: "Bandipur, Tanahu",
        region: "Central Nepal",
        bio: "Restored Newari architecture hotel offering cultural immersion with modern comforts. Perfect base for exploring historic Bandipur with its preserved medieval charm and panoramic Himalayan views.",
        amenities: ["Heritage architecture", "Modern amenities", "Restaurant", "Cultural tours", "Spa services", "Conference hall"],
        roomTypes: ["Standard room", "Deluxe room", "Heritage suite", "Family room"],
        avatar: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        ],
        rating: 4.5,
        reviews: 87,
        phone: "+977-9841234575",
        email: "heritage@example.com",
        priceRange: "$40-80/night",
        altitude: "1,030m",
        capacity: 40,
        verified: true,
        establishedYear: 2010,
        iconName: "Building2",
        color: "#22C55E"
    },
    {
        id: 4,
        name: "Himalayan Eco Lodge",
        slug: "himalayan-eco-lodge",
        type: "lodge",
        location: "Kyanjin Gompa, Rasuwa",
        region: "Langtang Region",
        bio: "Eco-friendly lodge at the heart of Langtang Valley, built with sustainable materials and powered by solar energy. Offers spectacular views of Langtang Lirung and authentic Tamang cultural experiences.",
        amenities: ["Solar power", "Organic meals", "Mountain views", "Cultural programs", "Yak cheese tasting", "Meditation space"],
        roomTypes: ["Twin sharing", "Single room", "Dormitory"],
        avatar: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        ],
        rating: 4.7,
        reviews: 156,
        phone: "+977-9841234576",
        email: "ecolodge@example.com",
        priceRange: "$18-30/night",
        altitude: "3,870m",
        capacity: 25,
        verified: true,
        establishedYear: 2015,
        iconName: "Leaf",
        color: "#10B981"
    },
    {
        id: 5,
        name: "Mustang Palace Hotel",
        slug: "mustang-palace-hotel",
        type: "hotel",
        location: "Lo Manthang, Mustang",
        region: "Mustang Region",
        bio: "Unique hotel in the ancient walled city of Lo Manthang, offering modern comfort in a traditional setting. Experience the mystique of the former forbidden kingdom with authentic Tibetan hospitality.",
        amenities: ["Traditional architecture", "Tibetan cuisine", "Cultural tours", "Monastery visits", "Heated rooms", "Library"],
        roomTypes: ["Standard room", "Deluxe room", "Royal suite"],
        avatar: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        ],
        rating: 4.4,
        reviews: 73,
        phone: "+977-9841234577",
        email: "mustangpalace@example.com",
        priceRange: "$60-120/night",
        altitude: "3,840m",
        capacity: 20,
        verified: true,
        establishedYear: 2012,
        iconName: "Castle",
        color: "#EF4444"
    },
    {
        id: 6,
        name: "Lakeside Retreat",
        slug: "lakeside-retreat",
        type: "guesthouse",
        location: "Pokhara, Kaski",
        region: "Western Nepal",
        bio: "Peaceful guesthouse on the shores of Phewa Lake with stunning mountain reflections. Perfect for relaxation before or after trekking adventures, offering modern amenities and traditional Nepali hospitality.",
        amenities: ["Lake views", "Garden terrace", "Restaurant", "Boat rental", "Spa services", "Tour desk"],
        roomTypes: ["Lake view room", "Garden room", "Deluxe suite", "Family room"],
        avatar: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        ],
        rating: 4.6,
        reviews: 234,
        phone: "+977-9841234578",
        email: "lakeside@example.com",
        priceRange: "$25-50/night",
        altitude: "822m",
        capacity: 35,
        verified: true,
        establishedYear: 2005,
        iconName: "Waves",
        color: "#06B6D4"
    }
];

// Combined data for easy access
export const trekDaiData = {
    guides,
    accommodations
};