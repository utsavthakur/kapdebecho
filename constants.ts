import { Tailor, Craft, Order } from './types';

export const MOCK_TAILORS: Tailor[] = [
  {
    id: '1',
    name: 'Masterji Rahmat Khan',
    region: 'Lucknow',
    specialization: 'Chikankari & Sherwanis',
    experienceYears: 35,
    rating: 4.9,
    verified: true,
    imageUrl: 'https://picsum.photos/400/400?random=1',
    startingPrice: 4500,
    tags: ['Heritage Certified', 'Hand Stitching'],
    location: {
      lat: 26.8467,
      lng: 80.9462,
      address: 'Chowk, Lucknow, Uttar Pradesh'
    }
  },
  {
    id: '2',
    name: 'Savitri Devi',
    region: 'Kanchipuram',
    specialization: 'Silk Blouse & Saree Customization',
    experienceYears: 22,
    rating: 4.8,
    verified: true,
    imageUrl: 'https://picsum.photos/400/400?random=2',
    startingPrice: 1200,
    tags: ['Silk Expert', 'Quick Delivery'],
    location: {
      lat: 12.8185,
      lng: 79.6947,
      address: 'Gandhi Road, Kanchipuram, Tamil Nadu'
    }
  },
  {
    id: '3',
    name: 'Royal Rajputana Tailors',
    region: 'Jaipur',
    specialization: 'Bandhgala & Jodhpuri Suits',
    experienceYears: 40,
    rating: 5.0,
    verified: true,
    imageUrl: 'https://picsum.photos/400/400?random=3',
    startingPrice: 8500,
    tags: ['Royal Heritage', 'Gold Thread Work'],
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: 'MI Road, Jaipur, Rajasthan'
    }
  }
];

export const REGIONAL_CRAFTS: Craft[] = [
  {
    id: 'c1',
    name: 'Banarasi Weaves',
    region: 'Varanasi',
    description: 'Ancient tradition of gold and silver brocade.',
    imageUrl: 'https://picsum.photos/600/400?random=10'
  },
  {
    id: 'c2',
    name: 'Lucknowi Chikankari',
    region: 'Lucknow',
    description: 'Intricate shadow work embroidery on fine muslin.',
    imageUrl: 'https://picsum.photos/600/400?random=11'
  },
  {
    id: 'c3',
    name: 'Kashmiri Pashmina',
    region: 'Kashmir',
    description: 'World-renowned soft wool and hand embroidery.',
    imageUrl: 'https://picsum.photos/600/400?random=12'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'BTN-8823',
    status: 'Stitching',
    item: 'Custom Bandhgala Suit',
    tailorName: 'Royal Rajputana Tailors',
    date: '2023-10-25',
    amount: 12500
  },
  {
    id: 'BTN-8810',
    status: 'Delivered',
    item: 'Silk Blouse',
    tailorName: 'Savitri Devi',
    date: '2023-10-10',
    amount: 1800
  }
];
