export enum OrderStatus {
  PENDING = 'PENDING',
  PAYMENT_VERIFICATION = 'PAYMENT_VERIFICATION',
  CONFIRMED = 'CONFIRMED',
  STITCHING = 'STITCHING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  UTR_SUBMITTED = 'UTR_SUBMITTED',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Address {
  fullName: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  line1: string;
  landmark?: string;
}

export interface ProductSnapshot {
  name: string;
  image: string;
  size: string;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  tailorId: string;
  productSnapshot: ProductSnapshot;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId: string | null;
  address: Address;
  notes: string;
  estimatedDelivery: string | null;
  trackingId: string | null;
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  paymentUtr?: string;
  paymentVerifiedAt?: string;
  paymentVerifiedBy?: string;
  upiTransactionRef?: string;
  paymentNotes?: string;
}

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PAYMENT_VERIFICATION,
  OrderStatus.CONFIRMED,
  OrderStatus.STITCHING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
];

export const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-stone-100 text-stone-700',
  [OrderStatus.PAYMENT_VERIFICATION]: 'bg-amber-100 text-amber-800',
  [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [OrderStatus.STITCHING]: 'bg-orange-100 text-orange-800',
  [OrderStatus.SHIPPED]: 'bg-purple-100 text-purple-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
};
