export interface TouristRequest {
  id: string;
  touristName: string;
  touristAvatar: string;
  email: string;
  phone: string;
  destination: string;
  route: string;
  duration: number;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: string;
  pricePerDay: number;
  experience: string;
  specialRequirements: string;
  accommodation: string;
  transportation: string;
  activities: string[];
  dietaryRestrictions: string;
  medicalConditions: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  guideId: string;
  guideRemarks?: string;
  prepaymentAmount?: number;
}

export const touristRequests: TouristRequest[] = [
  {
    id: 'TR001',
    touristName: 'John Smith',
    touristAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    destination: 'Everest Base Camp',
    route: 'Lukla → Gorak Shep',
    duration: 12,
    startDate: '2024-03-15',
    endDate: '2024-03-27',
    groupSize: 2,
    budget: '$3000-$5000 per person',
    pricePerDay: 350,
    experience: 'Intermediate - Have done several multi-day hikes',
    specialRequirements: 'Need photography guide, prefer early morning starts',
    accommodation: 'Tea houses preferred',
    transportation: 'Flight to Lukla included',
    activities: ['Trekking', 'Photography', 'Cultural Tours'],
    dietaryRestrictions: 'Vegetarian options needed for 2 members',
    medicalConditions: 'One member has mild altitude sensitivity',
    emergencyContact: {
      name: 'Michael Smith',
      phone: '+1-555-0124',
      relationship: 'Brother'
    },
    status: 'pending',
    submittedAt: '2024-03-15T10:30:00Z',
    guideId: 'guide-1'
  },
  {
    id: 'TR002',
    touristName: 'Sarah Johnson',
    touristAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0234',
    destination: 'Annapurna Circuit',
    route: 'Besisahar → Jomsom',
    duration: 15,
    startDate: '2024-03-16',
    endDate: '2024-03-31',
    groupSize: 4,
    budget: '$2000-$3000 per person',
    pricePerDay: 250,
    experience: 'Advanced - Multiple high-altitude treks completed',
    specialRequirements: 'Interested in local culture and village stays',
    accommodation: 'Mix of tea houses and homestays',
    transportation: 'Local bus from Kathmandu',
    activities: ['Trekking', 'Cultural Tours', 'Bird Watching'],
    dietaryRestrictions: 'None',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Lisa Johnson',
      phone: '+1-555-0235',
      relationship: 'Sister'
    },
    status: 'pending',
    submittedAt: '2024-03-16T14:20:00Z',
    guideId: 'guide-1'
  },
  {
    id: 'TR003',
    touristName: 'Michael Chen',
    touristAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    email: 'michael.chen@email.com',
    phone: '+44-7700-900123',
    destination: 'Langtang Valley Trek',
    route: 'Syabrubesi → Kyanjin Gompa',
    duration: 8,
    startDate: '2024-03-17',
    endDate: '2024-03-25',
    groupSize: 3,
    budget: '$1500-$2000',
    pricePerDay: 220,
    experience: 'Beginner - First time in Himalayas',
    specialRequirements: 'Solo female traveler, prefer smaller groups',
    accommodation: 'Tea houses',
    transportation: 'Private jeep to trailhead',
    activities: ['Trekking', 'Wildlife Viewing', 'Meditation'],
    dietaryRestrictions: 'Gluten-free diet',
    medicalConditions: 'Asthma - carries inhaler',
    emergencyContact: {
      name: 'Robert Chen',
      phone: '+44-7700-900124',
      relationship: 'Father'
    },
    status: 'pending',
    submittedAt: '2024-03-17T09:15:00Z',
    guideId: 'guide-1'
  },
  {
    id: 'TR004',
    touristName: 'Emma Wilson',
    touristAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    email: 'emma.wilson@email.com',
    phone: '+1-555-0345',
    destination: 'Poon Hill Trek',
    route: 'Nayapul → Ghorepani',
    duration: 5,
    startDate: '2024-03-18',
    endDate: '2024-03-23',
    groupSize: 2,
    budget: '$1000-$1500 per person',
    pricePerDay: 240,
    experience: 'Beginner - First trek',
    specialRequirements: 'Need basic trekking gear rental',
    accommodation: 'Tea houses',
    transportation: 'Private vehicle to starting point',
    activities: ['Trekking', 'Sunrise viewing', 'Photography'],
    dietaryRestrictions: 'Vegetarian',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'James Wilson',
      phone: '+1-555-0346',
      relationship: 'Husband'
    },
    status: 'pending',
    submittedAt: '2024-03-18T16:45:00Z',
    guideId: 'guide-1'
  },
  {
    id: 'TR005',
    touristName: 'David Martinez',
    touristAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    email: 'david.martinez@email.com',
    phone: '+61-4-1234-5678',
    destination: 'Gokyo Lakes',
    route: 'Lukla → Gokyo',
    duration: 10,
    startDate: '2024-04-01',
    endDate: '2024-04-11',
    groupSize: 3,
    budget: '$2500-$3500 per person',
    pricePerDay: 300,
    experience: 'Intermediate - Regular hiker',
    specialRequirements: 'Interested in photography workshops',
    accommodation: 'Tea houses',
    transportation: 'Flight to Lukla',
    activities: ['Trekking', 'Photography', 'Yoga'],
    dietaryRestrictions: 'Vegan',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Sofia Martinez',
      phone: '+61-4-1234-5679',
      relationship: 'Wife'
    },
    status: 'approved',
    submittedAt: '2024-03-25T11:00:00Z',
    guideId: 'guide-1',
    guideRemarks: 'Excellent fit for our cultural immersion package. Confirmed availability.',
    prepaymentAmount: 4500
  },
  {
    id: 'TR006',
    touristName: 'Lisa Anderson',
    touristAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    email: 'lisa.anderson@email.com',
    phone: '+1-555-0456',
    destination: 'Manaslu Circuit',
    route: 'Soti Khola → Dharapani',
    duration: 14,
    startDate: '2024-04-10',
    endDate: '2024-04-24',
    groupSize: 2,
    budget: '$3500-$4500 per person',
    pricePerDay: 320,
    experience: 'Advanced - Multiple high-altitude treks',
    specialRequirements: 'Need porter service',
    accommodation: 'Tea houses and camping',
    transportation: 'Private jeep',
    activities: ['Trekking', 'Cultural Tours', 'Photography'],
    dietaryRestrictions: 'None',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Mark Anderson',
      phone: '+1-555-0457',
      relationship: 'Spouse'
    },
    status: 'rejected',
    submittedAt: '2024-03-20T14:30:00Z',
    guideId: 'guide-1',
    guideRemarks: 'Unfortunately, dates conflict with another booking. Suggested alternative dates.'
  }
];

export const getRequestsByGuideId = (guideId: string) => {
  return touristRequests.filter(request => request.guideId === guideId);
};

export const getRequestById = (requestId: string) => {
  return touristRequests.find(request => request.id === requestId);
};

export const getRequestStats = (guideId: string) => {
  const requests = getRequestsByGuideId(guideId);
  return {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };
};
