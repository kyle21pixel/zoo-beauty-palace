/**
 * Zoo Beauty Palace - Shared Type Definitions
 */

// ============= User Types =============

export type UserRole = 'customer' | 'provider' | 'beautician' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  address?: Address;
  favorites: string[]; // service IDs
  bookingHistory: string[]; // booking IDs
}

export interface Provider extends User {
  role: 'provider';
  businessName: string;
  description: string;
  address: Address;
  services: string[]; // service IDs
  staff: string[]; // beautician IDs
  rating: number;
  reviewCount: number;
  verified: boolean;
  images: string[];
}

export interface Beautician extends User {
  role: 'beautician';
  providerId?: string;
  bio: string;
  specialties: string[];
  experience: number; // years
  rating: number;
  reviewCount: number;
  available: boolean;
  location?: Coordinates;
  certifications: string[];
  images: string[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// ============= Service Types =============

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number; // minutes
  providerId: string;
  images: string[];
  tags: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceCategory = 
  | 'hair'
  | 'nails'
  | 'makeup'
  | 'skincare'
  | 'massage'
  | 'waxing'
  | 'eyelashes'
  | 'eyebrows'
  | 'spa'
  | 'other';

// ============= Booking Types =============

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  beauticianId: string;
  providerId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  location: Address;
  notes?: string;
  price: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============= Payment Types =============

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'cash' | 'wallet' | 'bank_transfer';

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'payment' | 'refund' | 'payout' | 'commission';
  amount: number;
  status: PaymentStatus;
  description: string;
  relatedId?: string; // booking or payment ID
  createdAt: Date;
}

// ============= Review Types =============

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  serviceId: string;
  beauticianId: string;
  providerId: string;
  rating: number;
  comment: string;
  images?: string[];
  response?: string; // provider response
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============= Location Types =============

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// ============= Analytics Types =============

export interface Analytics {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalCustomers: number;
  completionRate: number;
  cancellationRate: number;
  period: 'day' | 'week' | 'month' | 'year';
}

export interface RevenueData {
  date: string;
  amount: number;
  bookings: number;
}

export interface DashboardStats {
  todayBookings: number;
  todayRevenue: number;
  pendingBookings: number;
  activeBeauticians: number;
  newCustomers: number;
  averageRating: number;
}

// ============= Notification Types =============

export type NotificationType = 
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_reminder'
  | 'payment_success'
  | 'payment_failed'
  | 'review_received'
  | 'promotion'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ============= Promotion Types =============

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
  applicableServices?: string[];
  applicableCategories?: ServiceCategory[];
}

// ============= Configuration Types =============

export interface PlatformSettings {
  commissionRate: number; // percentage
  cancellationWindow: number; // hours
  bookingAdvanceTime: number; // hours
  paymentMethods: PaymentMethod[];
  supportedCategories: ServiceCategory[];
  minServicePrice: number;
  maxServicePrice: number;
}

// ============= API Response Types =============

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============= Filter Types =============

export interface ServiceFilters {
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  providerId?: string;
  available?: boolean;
  search?: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  dateFrom?: Date;
  dateTo?: Date;
  customerId?: string;
  beauticianId?: string;
  providerId?: string;
}
