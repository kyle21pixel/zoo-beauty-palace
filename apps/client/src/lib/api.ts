const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
  message?: string;
}

export const api = {
  // Services
  async getServices() {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json() as Promise<ApiResponse<any[]>>;
  },

  async getServiceById(id: string) {
    const res = await fetch(`${API_URL}/api/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async createService(data: any) {
    const res = await fetch(`${API_URL}/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async updateService(id: string, data: any) {
    const res = await fetch(`${API_URL}/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async deleteService(id: string) {
    const res = await fetch(`${API_URL}/api/services/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json() as Promise<ApiResponse<any>>;
  },

  // Bookings
  async getBookings(params?: { status?: string; customerId?: string; beauticianId?: string; providerId?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_URL}/api/bookings${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json() as Promise<ApiResponse<any[]>>;
  },

  async getBookingById(id: string) {
    const res = await fetch(`${API_URL}/api/bookings/${id}`);
    if (!res.ok) throw new Error('Failed to fetch booking');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async createBooking(data: any) {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async updateBooking(id: string, data: any) {
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update booking');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async deleteBooking(id: string) {
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete booking');
    return res.json() as Promise<ApiResponse<any>>;
  },

  // Users
  async getUsers(role?: string) {
    const query = role ? `?role=${role}` : '';
    const res = await fetch(`${API_URL}/api/users${query}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json() as Promise<ApiResponse<any[]>>;
  },

  async getUserById(id: string) {
    const res = await fetch(`${API_URL}/api/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async createUser(data: any) {
    const res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async updateUser(id: string, data: any) {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async deleteUser(id: string) {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return res.json() as Promise<ApiResponse<any>>;
  },

  // Reviews
  async getReviews(params?: { customerId?: string; serviceId?: string; beauticianId?: string; providerId?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_URL}/api/reviews${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json() as Promise<ApiResponse<any[]>>;
  },

  async getReviewById(id: string) {
    const res = await fetch(`${API_URL}/api/reviews/${id}`);
    if (!res.ok) throw new Error('Failed to fetch review');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async createReview(data: any) {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create review');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async updateReview(id: string, data: any) {
    const res = await fetch(`${API_URL}/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update review');
    return res.json() as Promise<ApiResponse<any>>;
  },

  async deleteReview(id: string) {
    const res = await fetch(`${API_URL}/api/reviews/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return res.json() as Promise<ApiResponse<any>>;
  },

  // Health check
  async healthCheck() {
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },
};
