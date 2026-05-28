export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  TAILOR = 'TAILOR',
  ADMIN = 'ADMIN'
}

export interface Tailor {
  id: string;
  name: string;
  region: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  verified: boolean;
  imageUrl: string;
  startingPrice: number;
  tags: string[];
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  upiId?: string;
}

export interface Craft {
  id: string;
  name: string;
  region: string;
  description: string;
  imageUrl: string;
}
