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
}

export interface Craft {
  id: string;
  name: string;
  region: string;
  description: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  status: 'Received' | 'Stitching' | 'QC' | 'Packaging' | 'Shipped' | 'Delivered';
  item: string;
  tailorName: string;
  date: string;
  amount: number;
}
