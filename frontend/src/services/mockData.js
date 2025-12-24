// frontend/src/services/mockData.js
// Mock data for testing UI components without backend

export const mockUsers = [
  {
    id: 1,
    email: 'admin@zoobeauty.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    isVerified: true,
  },
  {
    id: 2,
    email: 'provider@zoobeauty.com',
    firstName: 'Beauty',
    lastName: 'Provider',
    role: 'provider',
    isActive: true,
    isVerified: true,
  },
  {
    id: 3,
    email: 'beautician@zoobeauty.com',
    firstName: 'Freelance',
    lastName: 'Beautician',
    role: 'beautician',
    isActive: true,
    isVerified: true,
  },
  {
    id: 4,
    email: 'client@zoobeauty.com',
    firstName: 'Regular',
    lastName: 'Client',
    role: 'client',
    isActive: true,
    isVerified: true,
  },
];

export const mockServices = [
  {
    id: 1,
    name: 'Wig Installation',
    category: 'wig-installation',
    description: 'Professional wig fitting and styling',
    duration: 60,
    price: { min: 50, max: 150 },
    provider: 2,
    isActive: true,
    rating: { average: 4.8, count: 24 },
  },
  {
    id: 2,
    name: 'Braiding',
    category: 'braiding',
    description: 'Various braiding styles and techniques',
    duration: 120,
    price: { min: 80, max: 200 },
    provider: 2,
    isActive: true,
    rating: { average: 4.9, count: 32 },
  },
  {
    id: 3,
    name: 'Barbering',
    category: 'barbering',
    description: 'Haircuts and grooming services',
    duration: 45,
    price: { min: 30, max: 80 },
    beautician: 3,
    isActive: true,
    rating: { average: 4.7, count: 18 },
  },
  {
    id: 4,
    name: 'Nails',
    category: 'nails',
    description: 'Manicures, pedicures, and nail art',
    duration: 90,
    price: { min: 40, max: 100 },
    beautician: 3,
    isActive: true,
    rating: { average: 4.6, count: 27 },
  },
  {
    id: 5,
    name: 'Massage',
    category: 'massage',
    description: 'Relaxing and therapeutic massages',
    duration: 60,
    price: { min: 60, max: 120 },
    provider: 2,
    isActive: true,
    rating: { average: 4.9, count: 42 },
  },
  {
    id: 6,
    name: 'Tattooing',
    category: 'tattooing',
    description: 'Custom tattoos by skilled artists',
    duration: 180,
    price: { min: 150, max: 500 },
    beautician: 3,
    isActive: true,
    rating: { average: 5.0, count: 15 },
  },
];

export const mockBookings = [
  {
    id: 1,
    service: 1,
    client: 4,
    provider: 2,
    bookingType: 'on-route',
    status: 'completed',
    scheduledDate: '2023-12-25',
    scheduledTime: '10:00',
    duration: 60,
    totalAmount: 75,
    paymentStatus: 'paid',
    rating: 5,
    review: 'Excellent service!',
  },
  {
    id: 2,
    service: 3,
    client: 4,
    beautician: 3,
    bookingType: 'on-site',
    status: 'confirmed',
    scheduledDate: '2023-12-28',
    scheduledTime: '14:00',
    duration: 45,
    totalAmount: 50,
    paymentStatus: 'paid',
  },
  {
    id: 3,
    service: 5,
    client: 4,
    provider: 2,
    bookingType: 'on-route',
    status: 'pending',
    scheduledDate: '2023-12-30',
    scheduledTime: '11:00',
    duration: 60,
    totalAmount: 80,
    paymentStatus: 'pending',
  },
];

export const mockProviders = [
  {
    id: 2,
    email: 'provider@zoobeauty.com',
    firstName: 'Beauty',
    lastName: 'Provider',
    businessName: 'Beauty Palace Salon',
    address: {
      street: '123 Beauty St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    rating: { average: 4.8, count: 86 },
    totalEarnings: 12500,
    isAvailable: true,
    serviceRadius: 10,
  },
];

export const mockBeauticians = [
  {
    id: 3,
    email: 'beautician@zoobeauty.com',
    firstName: 'Freelance',
    lastName: 'Beautician',
    specialization: ['braiding', 'nails', 'tattooing'],
    experience: { years: 5, description: 'Professional beautician with 5 years experience' },
    rating: { average: 4.9, count: 67 },
    totalEarnings: 8900,
    isAvailable: true,
    travelRadius: 20,
  },
];

// Mock API functions to simulate backend responses
export const mockAuthAPI = {
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === credentials.email);
        if (user) {
          const token = `mock-jwt-token-${user.id}`;
          resolve({
            data: {
              success: true,
              message: 'Login successful',
              data: {
                user,
                token
              }
            }
          });
        } else {
          resolve({
            data: {
              success: false,
              message: 'Invalid credentials'
            }
          });
        }
      }, 500);
    });
  },

  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new user with incremented ID
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
          isActive: true,
          isVerified: true,
        };
        const token = `mock-jwt-token-${newUser.id}`;
        
        resolve({
          data: {
            success: true,
            message: 'Registration successful',
            data: {
              user: newUser,
              token
            }
          }
        });
      }, 500);
    });
  },

  getMe: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a sample user
        const user = mockUsers[3]; // client user
        resolve({
          data: {
            success: true,
            data: { user }
          }
        });
      }, 300);
    });
  },

  updateProfile: (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update the user with new data
        const updatedUser = { ...mockUsers[3], ...profileData };
        resolve({
          data: {
            success: true,
            message: 'Profile updated successfully',
            data: { user: updatedUser }
          }
        });
      }, 500);
    });
  }
};

export const mockServiceAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { services: mockServices }
          }
        });
      }, 500);
    });
  },

  getByCategory: (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredServices = mockServices.filter(s => s.category === category);
        resolve({
          data: {
            success: true,
            data: { services: filteredServices }
          }
        });
      }, 500);
    });
  },
};

export const mockBookingAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { bookings: mockBookings }
          }
        });
      }, 500);
    });
  },

  getByUser: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userBookings = mockBookings.filter(b => b.client == userId);
        resolve({
          data: {
            success: true,
            data: { bookings: userBookings }
          }
        });
      }, 500);
    });
  },

  getByProvider: (providerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const providerBookings = mockBookings.filter(b => b.provider == providerId);
        resolve({
          data: {
            success: true,
            data: { bookings: providerBookings }
          }
        });
      }, 500);
    });
  },

  create: (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: mockBookings.length + 1,
          ...bookingData,
          status: 'pending',
          paymentStatus: 'pending'
        };
        resolve({
          data: {
            success: true,
            message: 'Booking created successfully',
            data: { booking: newBooking }
          }
        });
      }, 500);
    });
  },

  update: (id, bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBooking = { ...mockBookings.find(b => b.id == id), ...bookingData };
        resolve({
          data: {
            success: true,
            message: 'Booking updated successfully',
            data: { booking: updatedBooking }
          }
        });
      }, 500);
    });
  },

  delete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            message: 'Booking deleted successfully'
          }
        });
      }, 500);
    });
  },

  updateStatus: (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = mockBookings.find(b => b.id == id);
        const updatedBooking = { ...booking, status };
        resolve({
          data: {
            success: true,
            message: 'Booking status updated successfully',
            data: { booking: updatedBooking }
          }
        });
      }, 500);
    });
  },
};

export const mockReviewAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { reviews: [] }
          }
        });
      }, 500);
    });
  },

  getByService: (serviceId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { reviews: [] }
          }
        });
      }, 500);
    });
  },

  getByProvider: (providerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { reviews: [] }
          }
        });
      }, 500);
    });
  },

  getByBeautician: (beauticianId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { reviews: [] }
          }
        });
      }, 500);
    });
  },

  create: (reviewData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            message: 'Review created successfully',
            data: { review: { id: Date.now(), ...reviewData } }
          }
        });
      }, 500);
    });
  },
};

export const mockUserAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { users: mockUsers }
          }
        });
      }, 500);
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id == id);
        resolve({
          data: {
            success: true,
            data: { user }
          }
        });
      }, 300);
    });
  },

  update: (id, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...mockUsers.find(u => u.id == id), ...userData };
        resolve({
          data: {
            success: true,
            message: 'User updated successfully',
            data: { user: updatedUser }
          }
        });
      }, 500);
    });
  },

  delete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            message: 'User deleted successfully'
          }
        });
      }, 500);
    });
  },
};

export const mockProviderAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { providers: mockProviders }
          }
        });
      }, 500);
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const provider = mockProviders.find(p => p.id == id);
        resolve({
          data: {
            success: true,
            data: { provider }
          }
        });
      }, 300);
    });
  },

  getServices: (providerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const services = mockServices.filter(s => s.provider == providerId);
        resolve({
          data: {
            success: true,
            data: { services }
          }
        });
      }, 500);
    });
  },

  getBookings: (providerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = mockBookings.filter(b => b.provider == providerId);
        resolve({
          data: {
            success: true,
            data: { bookings }
          }
        });
      }, 500);
    });
  },

  create: (providerData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProvider = {
          id: mockProviders.length + 1,
          ...providerData,
        };
        resolve({
          data: {
            success: true,
            message: 'Provider created successfully',
            data: { provider: newProvider }
          }
        });
      }, 500);
    });
  },

  update: (id, providerData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedProvider = { ...mockProviders.find(p => p.id == id), ...providerData };
        resolve({
          data: {
            success: true,
            message: 'Provider updated successfully',
            data: { provider: updatedProvider }
          }
        });
      }, 500);
    });
  },
};

export const mockBeauticianAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            data: { beauticians: mockBeauticians }
          }
        });
      }, 500);
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const beautician = mockBeauticians.find(b => b.id == id);
        resolve({
          data: {
            success: true,
            data: { beautician }
          }
        });
      }, 300);
    });
  },

  getServices: (beauticianId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const services = mockServices.filter(s => s.beautician == beauticianId);
        resolve({
          data: {
            success: true,
            data: { services }
          }
        });
      }, 500);
    });
  },

  getBookings: (beauticianId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = mockBookings.filter(b => b.beautician == beauticianId);
        resolve({
          data: {
            success: true,
            data: { bookings }
          }
        });
      }, 500);
    });
  },

  create: (beauticianData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBeautician = {
          id: mockBeauticians.length + 1,
          ...beauticianData,
        };
        resolve({
          data: {
            success: true,
            message: 'Beautician created successfully',
            data: { beautician: newBeautician }
          }
        });
      }, 500);
    });
  },

  update: (id, beauticianData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBeautician = { ...mockBeauticians.find(b => b.id == id), ...beauticianData };
        resolve({
          data: {
            success: true,
            message: 'Beautician updated successfully',
            data: { beautician: updatedBeautician }
          }
        });
      }, 500);
    });
  },
};

export default {
  mockAuthAPI,
  mockServiceAPI,
  mockBookingAPI,
  mockUserAPI,
  mockProviderAPI,
  mockBeauticianAPI,
  mockReviewAPI
};