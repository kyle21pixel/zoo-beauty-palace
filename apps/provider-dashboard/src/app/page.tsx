'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, Button } from '@zoo/ui';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/lib/api';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Calendar,
  CalendarDays,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  BarChart3,
  PieChart as PieChartIcon,
  Settings,
  Flag,
  Award,
  Target,
  Activity,
  Zap,
  CreditCard,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Command,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  Wifi,
  Key,
  Sliders,
} from 'lucide-react';

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [liveBookings, setLiveBookings] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [staffData, setStaffData] = useState<any[]>([]);
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [reviewResponses, setReviewResponses] = useState<Record<string, string>>({});
  
  // Calendar states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  
  // Settings states
  const [businessName, setBusinessName] = useState('Glamour Studio');
  const [businessEmail, setBusinessEmail] = useState('contact@glamourstudio.com');
  const [businessPhone, setBusinessPhone] = useState('+1 234-567-8900');
  const [businessAddress, setBusinessAddress] = useState('123 Beauty Ave, New York, NY 10001');
  const [operatingHours, setOperatingHours] = useState<Record<string, { open: string; close: string; enabled: boolean }>>({
    Monday: { open: '09:00', close: '18:00', enabled: true },
    Tuesday: { open: '09:00', close: '18:00', enabled: true },
    Wednesday: { open: '09:00', close: '18:00', enabled: true },
    Thursday: { open: '09:00', close: '18:00', enabled: true },
    Friday: { open: '09:00', close: '18:00', enabled: true },
    Saturday: { open: '10:00', close: '16:00', enabled: true },
    Sunday: { open: '10:00', close: '16:00', enabled: false },
  });
  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    payments: true,
    reviews: true,
    emails: false,
    sms: false,
  });

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('providerDarkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }

    // Initialize all data
    initializeNotifications();
    initializeData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      simulateRealTimeUpdate();
    }, 8000);

    // Keyboard shortcut for command palette
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowNotifications(false);
        setShowServiceModal(false);
        setShowStaffModal(false);
        setShowBookingDetails(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('providerDarkMode', String(darkMode));
  }, [darkMode]);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      // Fetch real data from API
      const [servicesRes, bookingsRes, usersRes, reviewsRes] = await Promise.all([
        api.getServices(),
        api.getBookings(),
        api.getUsers(),
        api.getReviews(),
      ]);

      // Set services data
      const services = servicesRes.data.map((s: any) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        price: s.price,
        duration: `${s.duration} min`,
        active: s.active || true,
        bookings: 0, // This would come from a separate aggregation
        description: s.description || '',
      }));
      setServicesData(services);

      // Set bookings data - transform from DB format
      const bookings = bookingsRes.data.map((b: any) => ({
        id: b.id,
        customer: 'Customer', // Would need to join with user data
        customerId: b.customer_id,
        service: 'Service', // Would need to join with service data
        serviceId: b.service_id,
        time: new Date(b.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date(b.scheduled_at).toISOString().split('T')[0],
        status: b.status,
        price: b.total_price,
        email: '',
        phone: '',
      }));
      setBookingsData(bookings);

      // Set staff data (beauticians)
      const beauticians = usersRes.data
        .filter((u: any) => u.role === 'beautician')
        .map((u: any) => ({
          id: u.id,
          name: u.name,
          role: 'Beautician',
          specialization: u.specialty || 'Beauty Services',
          avatar: '👤',
          rating: 4.8,
          bookings: 0,
          revenue: 0,
        }));
      setStaffData(beauticians);

      // Set customers data
      const customers = usersRes.data
        .filter((u: any) => u.role === 'customer')
        .map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone || 'N/A',
          totalBookings: 0,
          totalSpent: 0,
          lastVisit: new Date().toISOString().split('T')[0],
          status: 'Regular',
        }));
      setCustomersData(customers);

      // Set reviews data
      const reviews = reviewsRes.data.map((r: any) => ({
        id: r.id,
        customer: 'Customer',
        customerId: r.customer_id,
        rating: r.rating,
        service: 'Service',
        serviceId: r.service_id,
        comment: r.comment,
        date: new Date(r.created_at).toISOString().split('T')[0],
        avatar: '👤',
        response: r.response || '',
      }));
      setReviewsData(reviews);

      toast.success('Data loaded from database!', { icon: '✅' });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data from database. Please ensure backend is running.', {
        duration: 5000,
      });
      
      // Fallback to minimal mock data only on error
      setServicesData([
        { id: '1', name: 'Sample Service', category: 'Hair', price: 100, duration: '60 min', active: true, bookings: 0, description: 'Sample service - Connect to database to see real data' },
      ]);
      setBookingsData([]);
      setStaffData([]);
      setCustomersData([]);
      setReviewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeNotifications = () => {
    const initialNotifications = [
      { id: 1, type: 'booking', message: 'New booking from Sarah Johnson', time: '5m ago', read: false },
      { id: 2, type: 'payment', message: 'Payment received: $150', time: '15m ago', read: false },
      { id: 3, type: 'review', message: 'New 5-star review from Emma Davis', time: '1h ago', read: true },
    ];
    setNotifications(initialNotifications);
  };

  const simulateRealTimeUpdate = () => {
    const customers = ['Sarah Johnson', 'Emma Davis', 'Olivia Wilson', 'Ava Martinez', 'Sophia Taylor'];
    const services = ['Hair Treatment', 'Bridal Makeup', 'Manicure', 'Facial', 'Hair Coloring'];
    
    const newBooking = {
      id: Date.now(),
      customer: customers[Math.floor(Math.random() * customers.length)],
      service: services[Math.floor(Math.random() * services.length)],
      amount: `$${(Math.random() * 200 + 50).toFixed(0)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLiveBookings(prev => [newBooking, ...prev].slice(0, 5));

    const newNotification = {
      id: Date.now(),
      type: 'booking',
      message: `New booking from ${newBooking.customer}`,
      time: 'Just now',
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 10));

    toast.success(`New booking: ${newBooking.customer} - ${newBooking.service}`, {
      icon: '📅',
      duration: 4000,
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Action handlers
  const handleBookingAction = (bookingId: string, action: 'accept' | 'reject' | 'complete' | 'cancel') => {
    const actionMap = {
      accept: { status: 'confirmed', message: 'Booking confirmed!' },
      reject: { status: 'cancelled', message: 'Booking rejected' },
      complete: { status: 'completed', message: 'Booking completed!' },
      cancel: { status: 'cancelled', message: 'Booking cancelled' },
    };

    setBookingsData(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: actionMap[action].status }
          : booking
      )
    );

    toast.success(actionMap[action].message, { icon: action === 'accept' || action === 'complete' ? '✅' : '❌' });
  };

  const handleToggleService = (serviceId: string) => {
    setServicesData(prev =>
      prev.map(service =>
        service.id === serviceId
          ? { ...service, active: !service.active }
          : service
      )
    );
    toast.success('Service status updated');
  };

  const handleDeleteService = (serviceId: string) => {
    setServicesData(prev => prev.filter(s => s.id !== serviceId));
    toast.success('Service deleted successfully');
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      name: 'New Service',
      category: 'General',
      price: 100,
      duration: '60 min',
      active: true,
      bookings: 0,
      description: 'Service description',
    };
    setServicesData(prev => [newService, ...prev]);
    toast.success('Service added successfully');
    setShowServiceModal(false);
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaffData(prev => prev.filter(s => s.id !== staffId));
    toast.success('Staff member removed');
  };

  const handleAddStaff = () => {
    const newStaff = {
      id: Date.now().toString(),
      name: 'New Staff Member',
      role: 'Beautician',
      specialization: 'General Services',
      avatar: '👤',
      rating: 0,
      bookings: 0,
      revenue: 0,
    };
    setStaffData(prev => [newStaff, ...prev]);
    toast.success('Staff member added successfully');
    setShowStaffModal(false);
  };

  const handleRespondToReview = (reviewId: string, response: string) => {
    if (!response || response.trim() === '') {
      toast.error('Please enter a response');
      return;
    }
    
    setReviewsData(prev =>
      prev.map(review =>
        review.id === reviewId ? { ...review, response } : review
      )
    );
    toast.success('Response added successfully', { icon: '✅', duration: 3000 });
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    
    toast.success(`${filename} exported successfully`);
  };

  const handleBulkAction = (action: string) => {
    if (selectedBookings.length === 0) {
      toast.error('Please select bookings first');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setBookingsData(prev => 
        prev.map(booking => 
          selectedBookings.includes(booking.id)
            ? { ...booking, status: action === 'confirm' ? 'confirmed' : action === 'cancel' ? 'cancelled' : booking.status }
            : booking
        )
      );
      setSelectedBookings([]);
      setIsLoading(false);
      toast.success(`${selectedBookings.length} bookings ${action === 'confirm' ? 'confirmed' : 'cancelled'}`, {
        icon: action === 'confirm' ? '✅' : '❌',
      });
    }, 800);
  };

  const handleSelectBooking = (id: string) => {
    setSelectedBookings(prev => 
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const handleSelectAllBookings = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  const handleEditService = () => {
    if (selectedService) {
      setServicesData(prev =>
        prev.map(service =>
          service.id === selectedService.id
            ? { ...selectedService }
            : service
        )
      );
      toast.success('Service updated successfully');
      setShowServiceModal(false);
      setSelectedService(null);
    }
  };

  const handleEditStaff = () => {
    if (selectedStaff) {
      setStaffData(prev =>
        prev.map(staff =>
          staff.id === selectedStaff.id
            ? { ...selectedStaff }
            : staff
        )
      );
      toast.success('Staff member updated successfully');
      setShowStaffModal(false);
      setSelectedStaff(null);
    }
  };

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 4500, bookings: 45, target: 5000 },
    { month: 'Feb', revenue: 5200, bookings: 52, target: 5000 },
    { month: 'Mar', revenue: 4800, bookings: 48, target: 5000 },
    { month: 'Apr', revenue: 6100, bookings: 61, target: 6000 },
    { month: 'May', revenue: 7200, bookings: 72, target: 6500 },
    { month: 'Jun', revenue: 6800, bookings: 68, target: 6500 },
    { month: 'Jul', revenue: 7500, bookings: 75, target: 7000 },
    { month: 'Aug', revenue: 8200, bookings: 82, target: 7500 },
    { month: 'Sep', revenue: 7800, bookings: 78, target: 7500 },
    { month: 'Oct', revenue: 8500, bookings: 85, target: 8000 },
    { month: 'Nov', revenue: 9200, bookings: 92, target: 8500 },
    { month: 'Dec', revenue: 8800, bookings: 88, target: 8500 },
  ];

  const serviceDistribution = [
    { name: 'Hair Services', value: 35, color: '#FF4275' },
    { name: 'Makeup', value: 25, color: '#774EAF' },
    { name: 'Nails', value: 20, color: '#FFB347' },
    { name: 'Facial', value: 15, color: '#4ECDC4' },
    { name: 'Other', value: 5, color: '#95E1D3' },
  ];

  const weeklyPerformance = [
    { day: 'Mon', bookings: 12, revenue: 1200 },
    { day: 'Tue', bookings: 15, revenue: 1500 },
    { day: 'Wed', bookings: 10, revenue: 1000 },
    { day: 'Thu', bookings: 18, revenue: 1800 },
    { day: 'Fri', bookings: 22, revenue: 2200 },
    { day: 'Sat', bookings: 28, revenue: 2800 },
    { day: 'Sun', bookings: 8, revenue: 800 },
  ];

  const statusColors: Record<string, string> = {
    confirmed: '#22C55E',
    pending: '#F59E0B',
    'in-progress': '#3B82F6',
    completed: '#9575BF',
    cancelled: '#EF4444',
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filtered data
  const filteredBookings = bookingsData.filter(booking => {
    if (bookingFilter === 'all') return true;
    return booking.status === bookingFilter;
  }).filter(booking => {
    if (!searchQuery) return true;
    return booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
           booking.service.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderOverview = () => {
    return (
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.5rem',
            color: darkMode ? 'white' : '#1A1A1A',
          }}>
            Welcome back! 👋
          </h1>
          <p style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '1.125rem' }}>
            Here's what's happening with your business today
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Today\'s Bookings', value: '12', change: '+8%', positive: true, icon: Calendar, color: '#FF4275' },
            { label: 'Today\'s Revenue', value: '$1,840', change: '+12%', positive: true, icon: DollarSign, color: '#FFB347' },
            { label: 'Pending Bookings', value: '5', change: '-2', positive: true, icon: Clock, color: '#774EAF' },
            { label: 'Average Rating', value: '4.8', change: '+0.2', positive: true, icon: Star, color: '#FF6E8F' },
          ].map((stat, index) => (
            <Card key={index} variant="elevated" padding={6} 
              className="interactive-card"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                animation: `slideUp 0.5s ease ${index * 0.1}s both`,
                cursor: 'pointer',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: stat.positive ? '#D1FAE520' : '#FEE2E220',
                  color: stat.positive ? '#22C55E' : '#EF4444',
                }}>
                  {stat.change}
                </span>
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '0.25rem',
                color: stat.color,
              }}>
                {stat.value}
              </h3>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <Card variant="elevated" padding={6} style={{
            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                  Live Bookings
                </h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  background: '#22C55E20',
                  borderRadius: '1rem',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    animation: 'pulse 2s infinite',
                  }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22C55E' }}>LIVE</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {liveBookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: darkMode ? '#737373' : '#A3A3A3' }}>
                  Waiting for new bookings...
                </div>
              ) : (
                liveBookings.map(booking => (
                  <div key={booking.id} style={{
                    padding: '1rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F9FAFB',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    animation: 'slideIn 0.3s ease-out',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                      }}>
                        {booking.customer.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                          {booking.customer}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>
                          {booking.service}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, color: '#22C55E', marginBottom: '0.25rem' }}>
                        {booking.amount}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: darkMode ? '#737373' : '#A3A3A3' }}>
                        {booking.time}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card variant="elevated" padding={6} style={{
            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button fullWidth leftIcon={<Plus size={18} />}>
                Add New Service
              </Button>
              <Button fullWidth variant="secondary" leftIcon={<Users size={18} />}>
                Add Staff Member
              </Button>
              <Button fullWidth variant="outline" leftIcon={<BarChart3 size={18} />}>
                View Analytics
              </Button>
              <Button fullWidth variant="outline" leftIcon={<MessageSquare size={18} />}>
                Messages
              </Button>
            </div>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
            Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4275" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF4275" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#E5E5E5'} />
              <XAxis dataKey="month" stroke={darkMode ? '#737373' : '#A3A3A3'} style={{ fontSize: '0.75rem' }} />
              <YAxis stroke={darkMode ? '#737373' : '#A3A3A3'} style={{ fontSize: '0.75rem' }} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? '#1A1A1A' : 'white',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                  borderRadius: '0.5rem',
                  color: darkMode ? 'white' : '#1A1A1A',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#FF4275" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  };

  const renderBookings = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Bookings Management
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {selectedBookings.length > 0 && (
              <>
                <Button 
                  leftIcon={<CheckCircle size={18} />} 
                  onClick={() => handleBulkAction('confirm')}
                  disabled={isLoading}
                  style={{
                    background: '#22C55E',
                    borderColor: '#22C55E',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                >
                  Confirm ({selectedBookings.length})
                </Button>
                <Button 
                  leftIcon={<XCircle size={18} />} 
                  variant="outline"
                  onClick={() => handleBulkAction('cancel')}
                  disabled={isLoading}
                  style={{
                    borderColor: '#EF4444',
                    color: '#EF4444',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                >
                  Cancel ({selectedBookings.length})
                </Button>
              </>
            )}
            <Button leftIcon={<Download size={18} />} variant="outline" onClick={() => exportToCSV(filteredBookings, 'bookings')}>
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '0.5rem',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                color: darkMode ? 'white' : '#1A1A1A',
                transition: 'all 0.2s',
              }}
            />
          </div>
          {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setBookingFilter(status)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: bookingFilter === status 
                  ? '#FF4275' 
                  : (darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white'),
                color: bookingFilter === status ? 'white' : (darkMode ? '#A3A3A3' : '#737373'),
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <Card variant="elevated" padding={0} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          overflowX: 'auto',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5' }}>
                <th style={{ padding: '1rem', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={handleSelectAllBookings}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#FF4275' }}
                  />
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Service</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Date & Time</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr 
                  key={booking.id} 
                  style={{ 
                    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6',
                    background: selectedBookings.includes(booking.id) ? (darkMode ? 'rgba(255, 66, 117, 0.1)' : 'rgba(255, 66, 117, 0.05)') : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#FF4275' }}
                    />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.25rem' }}>
                        {booking.customer}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: darkMode ? '#737373' : '#A3A3A3' }}>
                        {booking.email}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: darkMode ? 'white' : '#1A1A1A' }}>{booking.service}</td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ color: darkMode ? 'white' : '#1A1A1A' }}>{booking.date}</div>
                      <div style={{ fontSize: '0.875rem', color: darkMode ? '#737373' : '#A3A3A3' }}>{booking.time}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: darkMode ? 'white' : '#1A1A1A', fontWeight: 600 }}>${booking.price}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: `${statusColors[booking.status]}15`,
                      color: statusColors[booking.status],
                      textTransform: 'capitalize',
                    }}>
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#16A34A';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#22C55E';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: 'none',
                              background: '#22C55E',
                              color: 'white',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                            }}
                          >
                            <CheckCircle size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'reject')}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#EF4444';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#EF4444';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: '1px solid #EF4444',
                              background: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                            }}
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status === 'in-progress' && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'complete')}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#7C3AAF';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(149, 117, 191, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#9575BF';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: '#9575BF',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                          }}
                        >
                          <CheckCircle size={16} />
                          Complete
                        </button>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                          title="Cancel booking"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FEE2E2';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                            color: '#EF4444',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowBookingDetails(true);
                        }}
                        title="View details"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: 'none',
                          background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                          color: darkMode ? 'white' : '#1A1A1A',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderServices = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Services Management
          </h1>
          <Button leftIcon={<Plus size={18} />} onClick={handleAddService}>
            Add Service
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {servicesData.map((service, index) => (
            <Card 
              key={service.id} 
              variant="elevated" 
              padding={6} 
              className="interactive-card"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideUp 0.4s ease ${index * 0.05}s both`,
              }}>
              {/* Gradient accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, #FF4275, #FFB347, #9575BF)`,
                opacity: service.active ? 1 : 0.3,
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', marginTop: '0.5rem' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: service.active ? '#22C55E20' : '#EF444420',
                  color: service.active ? '#22C55E' : '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: service.active ? '#22C55E' : '#EF4444',
                    animation: service.active ? 'pulse 2s infinite' : 'none',
                  }} />
                  {service.active ? 'Active' : 'Inactive'}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleToggleService(service.id)}
                    title={service.active ? 'Deactivate' : 'Activate'}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 179, 71, 0.2)' : '#FEF3C7';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: service.active ? '#FFB347' : (darkMode ? '#737373' : '#A3A3A3'),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Zap size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setShowServiceModal(true);
                    }}
                    title="Edit service"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: darkMode ? 'white' : '#1A1A1A',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
                        handleDeleteService(service.id);
                      }
                    }}
                    title="Delete service"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FEE2E2';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: '#EF4444',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Trash2 size={16} />

                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                {service.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '1rem' }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>Category:</span>
                <span style={{ color: darkMode ? 'white' : '#1A1A1A', fontWeight: 600, fontSize: '0.875rem' }}>{service.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>Price:</span>
                <span style={{ color: '#FF4275', fontWeight: 600, fontSize: '0.875rem' }}>${service.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>Duration:</span>
                <span style={{ color: darkMode ? 'white' : '#1A1A1A', fontWeight: 600, fontSize: '0.875rem' }}>{service.duration}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>Bookings:</span>
                <span style={{ color: darkMode ? 'white' : '#1A1A1A', fontWeight: 600, fontSize: '0.875rem' }}>{service.bookings}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderStaff = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Staff Management
          </h1>
          <Button leftIcon={<Plus size={18} />} onClick={handleAddStaff}>
            Add Staff Member
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {staffData.map((member, index) => (
            <Card 
              key={member.id} 
              variant="elevated" 
              padding={6} 
              className="interactive-card"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                animation: `slideUp 0.4s ease ${index * 0.05}s both`,
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.25rem',
                    boxShadow: '0 8px 20px rgba(255, 66, 117, 0.3)',
                  }}>
                    {member.avatar}
                  </div>
                  {member.bookings > 50 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-5px',
                      right: '-5px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#FFB347',
                      border: `3px solid ${darkMode ? '#1A1A1A' : 'white'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Award size={14} color="white" />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedStaff(member);
                      setShowStaffModal(true);
                    }}
                    title="Edit staff member"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: darkMode ? 'white' : '#1A1A1A',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to remove ${member.name} from your team?`)) {
                        handleDeleteStaff(member.id);
                      }
                    }}
                    title="Remove staff member"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FEE2E2';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: '#EF4444',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#FF4275', marginBottom: '0.25rem', fontWeight: 600 }}>
                {member.role}
              </p>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '1rem' }}>
                {member.specialization}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Star size={16} fill="#FFB347" color="#FFB347" />
                <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{member.rating}</span>
                <span style={{ fontSize: '0.875rem', color: darkMode ? '#737373' : '#A3A3A3' }}>
                  ({member.bookings} bookings)
                </span>
              </div>
              <div style={{
                padding: '1rem',
                background: darkMode ? 'rgba(255, 66, 117, 0.1)' : '#FFF1F4',
                borderRadius: '0.5rem',
              }}>
                <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.25rem' }}>
                  Total Revenue
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF4275' }}>
                  ${member.revenue.toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomers = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Customer Management
          </h1>
          <Button leftIcon={<Download size={18} />} variant="outline" onClick={() => exportToCSV(customersData, 'customers')}>
            Export
          </Button>
        </div>

        <Card variant="elevated" padding={0} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          overflowX: 'auto',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Contact</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Total Bookings</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Total Spent</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Last Visit</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.25rem' }}>
                      {customer.name}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>
                      <div>{customer.email}</div>
                      <div>{customer.phone}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: darkMode ? 'white' : '#1A1A1A', fontWeight: 600 }}>
                    {customer.totalBookings}
                  </td>
                  <td style={{ padding: '1rem', color: '#22C55E', fontWeight: 600 }}>
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                    {customer.lastVisit}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: customer.status === 'VIP' ? '#FFB34720' : customer.status === 'Regular' ? '#3B82F620' : '#22C55E20',
                      color: customer.status === 'VIP' ? '#FFB347' : customer.status === 'Regular' ? '#3B82F6' : '#22C55E',
                    }}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Reviews & Ratings
          </h1>
          <p style={{ color: darkMode ? '#A3A3A3' : '#737373', marginTop: '0.5rem' }}>
            Average Rating: <span style={{ color: '#FFB347', fontWeight: 600, fontSize: '1.25rem' }}>4.8</span> ⭐
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {reviewsData.map(review => (
            <Card key={review.id} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                      {review.customer}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? '#FFB347' : 'none'} color="#FFB347" />
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>{review.service}</div>
                  <div style={{ fontSize: '0.75rem', color: darkMode ? '#737373' : '#A3A3A3' }}>{review.date}</div>
                </div>
              </div>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '1rem', lineHeight: 1.6 }}>
                "{review.comment}"
              </p>
              {review.response ? (
                <div style={{
                  padding: '1rem',
                  background: darkMode ? 'rgba(255, 66, 117, 0.1)' : '#FFF1F4',
                  borderRadius: '0.5rem',
                  borderLeft: '3px solid #FF4275',
                }}>
                  <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Your Response:
                  </div>
                  <p style={{ color: darkMode ? 'white' : '#1A1A1A' }}>{review.response}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Write a response..."
                    value={reviewResponses[review.id] || ''}
                    onChange={(e) => setReviewResponses({ ...reviewResponses, [review.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && reviewResponses[review.id]?.trim()) {
                        handleRespondToReview(review.id, reviewResponses[review.id]);
                        setReviewResponses({ ...reviewResponses, [review.id]: '' });
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                      background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                      color: darkMode ? 'white' : '#1A1A1A',
                      fontSize: '1rem',
                    }}
                  />
                  <button
                    onClick={() => {
                      if (reviewResponses[review.id]?.trim()) {
                        handleRespondToReview(review.id, reviewResponses[review.id]);
                        setReviewResponses({ ...reviewResponses, [review.id]: '' });
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E6315F';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 66, 117, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FF4275';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: '#FF4275',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <MessageSquare size={16} />
                    Respond
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderEarnings = () => {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '2rem' }}>
          Earnings & Financials
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'This Month', value: '$8,800', change: '+12%', icon: DollarSign, color: '#22C55E' },
            { label: 'Last Month', value: '$9,200', change: '-4%', icon: TrendingUp, color: '#3B82F6' },
            { label: 'Total Year', value: '$87,500', change: '+28%', icon: Target, color: '#FF4275' },
            { label: 'Pending Payouts', value: '$2,450', change: '5 pending', icon: Clock, color: '#FFB347' },
          ].map((stat, index) => (
            <Card key={index} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: darkMode ? 'white' : '#1A1A1A' }}>{stat.value}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.875rem', color: stat.change.startsWith('+') ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
                {stat.change}
              </div>
            </Card>
          ))}
        </div>

        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
            Revenue Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#E5E5E5'} />
              <XAxis dataKey="day" stroke={darkMode ? '#737373' : '#A3A3A3'} style={{ fontSize: '0.75rem' }} />
              <YAxis stroke={darkMode ? '#737373' : '#A3A3A3'} style={{ fontSize: '0.75rem' }} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? '#1A1A1A' : 'white',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="revenue" fill="#FF4275" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  };

  const renderCalendar = () => {
    // Generate calendar bookings
    const calendarBookings = bookingsData.map(booking => ({
      ...booking,
      start: new Date(booking.date + ' ' + booking.time),
      title: `${booking.customer} - ${booking.service}`,
    }));

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.5rem' }}>
              📅 Calendar View
            </h1>
            <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Button
              leftIcon={<Plus size={18} />}
              onClick={() => {
                toast.success('Add booking modal would open here');
              }}
              style={{ marginRight: '1rem' }}
            >
              Add Booking
            </Button>
            {['month', 'week', 'day'].map(view => (
              <button
                key={view}
                onClick={() => {
                  setCalendarView(view as any);
                  toast.success(`Switched to ${view} view`);
                }}
                onMouseEnter={(e) => {
                  if (calendarView !== view) {
                    e.currentTarget.style.background = darkMode ? 'rgba(255, 66, 117, 0.1)' : '#FFF1F4';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (calendarView !== view) {
                    e.currentTarget.style.background = darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: calendarView === view ? 'none' : (darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5'),
                  background: calendarView === view ? '#FF4275' : (darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white'),
                  color: calendarView === view ? 'white' : (darkMode ? '#A3A3A3' : '#737373'),
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {view === 'month' && <Calendar size={16} />}
                {view === 'week' && <CalendarDays size={16} />}
                {view === 'day' && <Clock size={16} />}
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Header */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                  toast.success('Navigated to previous month');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                  color: darkMode ? 'white' : '#1A1A1A',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                  color: darkMode ? 'white' : '#1A1A1A',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              onClick={() => setSelectedDate(new Date())}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: '#FF4275',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Today
            </button>
          </div>

          {/* Day Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: darkMode ? '#A3A3A3' : '#737373', fontSize: '0.875rem' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
            {Array.from({ length: 35 }, (_, i) => {
              const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
              const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
              const dayNumber = i - firstDay + 1;
              const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
              const isToday = isCurrentMonth && dayNumber === new Date().getDate() && 
                              selectedDate.getMonth() === new Date().getMonth();

              const dayBookings = isCurrentMonth ? calendarBookings.filter(b => 
                new Date(b.date).getDate() === dayNumber &&
                new Date(b.date).getMonth() === selectedDate.getMonth()
              ) : [];

              return (
                <div
                  key={i}
                  style={{
                    minHeight: '80px',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    background: isToday 
                      ? '#FF427520' 
                      : (darkMode ? 'rgba(255, 255, 255, 0.02)' : '#F9FAFB'),
                    border: isToday ? '2px solid #FF4275' : 'none',
                    opacity: isCurrentMonth ? 1 : 0.3,
                  }}
                >
                  <div style={{ 
                    fontWeight: isToday ? 700 : 600, 
                    color: isToday ? '#FF4275' : (darkMode ? 'white' : '#1A1A1A'),
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                  }}>
                    {isCurrentMonth ? dayNumber : ''}
                  </div>
                  {dayBookings.map(booking => (
                    <div
                      key={booking.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: statusColors[booking.status] + '40',
                        borderRadius: '0.25rem',
                        fontSize: '0.65rem',
                        marginBottom: '0.25rem',
                        color: darkMode ? 'white' : '#1A1A1A',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {booking.time.substring(0, 5)} {booking.customer.split(' ')[0]}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Bookings Sidebar */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
            Upcoming Bookings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookingsData.slice(0, 5).map(booking => (
              <div
                key={booking.id}
                style={{
                  padding: '1rem',
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F9FAFB',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${statusColors[booking.status]}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{booking.customer}</span>
                  <span style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>{booking.time}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>{booking.service}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderReports = () => {
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.5rem' }}>
            Reports & Analytics
          </h1>
          <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
            Generate and download comprehensive business reports
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { 
              title: 'Revenue Report', 
              description: 'Detailed revenue breakdown by service and time period',
              icon: DollarSign,
              color: '#22C55E',
              stats: { total: '$87,500', period: 'This Year', growth: '+28%' }
            },
            { 
              title: 'Booking Analytics', 
              description: 'Booking trends, peak times, and customer patterns',
              icon: Calendar,
              color: '#3B82F6',
              stats: { total: '856', period: 'Total Bookings', growth: '+18%' }
            },
            { 
              title: 'Staff Performance', 
              description: 'Individual staff member performance metrics',
              icon: Users,
              color: '#774EAF',
              stats: { total: '4', period: 'Active Staff', growth: '100%' }
            },
            { 
              title: 'Customer Report', 
              description: 'Customer retention, LTV, and demographic data',
              icon: Target,
              color: '#FF4275',
              stats: { total: '342', period: 'Total Customers', growth: '+24%' }
            },
            { 
              title: 'Service Analysis', 
              description: 'Most popular services and pricing optimization',
              icon: Star,
              color: '#FFB347',
              stats: { total: '5', period: 'Active Services', growth: '+2' }
            },
            { 
              title: 'Financial Summary', 
              description: 'Comprehensive financial overview and projections',
              icon: TrendingUp,
              color: '#4ECDC4',
              stats: { total: '$9.2K', period: 'Monthly Avg', growth: '+15%' }
            },
          ].map((report, index) => (
            <Card key={index} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${report.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <report.icon size={28} color={report.color} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                {report.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '1rem', lineHeight: 1.5 }}>
                {report.description}
              </p>
              <div style={{
                padding: '1rem',
                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F9FAFB',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: report.color, marginBottom: '0.25rem' }}>
                  {report.stats.total}
                </div>
                <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.25rem' }}>
                  {report.stats.period}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#22C55E', fontWeight: 600 }}>
                  {report.stats.growth}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => toast.success(`Generating ${report.title}...`)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: report.color,
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  Generate
                </button>
                <button
                  onClick={() => {
                    const reportData = [{
                      title: report.title,
                      total: report.stats.total,
                      period: report.stats.period,
                      growth: report.stats.growth,
                      date: new Date().toISOString(),
                    }];
                    exportToCSV(reportData, report.title.toLowerCase().replace(/ /g, '-'));
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${report.color}`,
                    background: 'transparent',
                    color: report.color,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Download size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Export Section */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
            Quick Export
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Export All Bookings', action: () => exportToCSV(bookingsData, 'all-bookings') },
              { label: 'Export Services', action: () => exportToCSV(servicesData, 'services') },
              { label: 'Export Staff Data', action: () => exportToCSV(staffData, 'staff') },
              { label: 'Export Customers', action: () => exportToCSV(customersData, 'customers') },
              { label: 'Export Reviews', action: () => exportToCSV(reviewsData, 'reviews') },
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                leftIcon={<FileText size={18} />}
                onClick={item.action}
                fullWidth
              >
                {item.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderSettings = () => {
    const handleSaveBusinessProfile = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Business profile updated successfully!', {
          icon: '✅',
          duration: 3000,
        });
      }, 800);
    };

    const handleSaveOperatingHours = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Operating hours saved successfully!', {
          icon: '⏰',
          duration: 3000,
        });
      }, 800);
    };

    const toggleNotification = (key: string) => {
      setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
      toast.success('Notification setting updated');
    };

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={32} color="#FF4275" />
            Settings & Configuration
          </h1>
          <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
            Manage your business profile, operating hours, and preferences
          </p>
        </div>

        {/* Business Profile */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Briefcase size={24} color="#FF4275" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
              Business Profile
            </h2>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  color: darkMode ? 'white' : '#1A1A1A',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                  <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Email
                </label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Phone
                </label>
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Address
              </label>
              <input
                type="text"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  color: darkMode ? 'white' : '#1A1A1A',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                leftIcon={<Save size={18} />}
                onClick={handleSaveBusinessProfile}
                fullWidth
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                leftIcon={<X size={18} />}
                onClick={() => {
                  setBusinessName('Glamour Studio');
                  setBusinessEmail('contact@glamourstudio.com');
                  setBusinessPhone('+1 234-567-8900');
                  setBusinessAddress('123 Beauty Ave, New York, NY 10001');
                  toast('Changes discarded', { icon: 'ℹ️' });
                }}
                fullWidth
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Operating Hours */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Clock size={24} color="#FF4275" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
              Operating Hours
            </h2>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1rem',
                background: operatingHours[day]?.enabled ? (darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB') : (darkMode ? 'rgba(255, 255, 255, 0.01)' : '#FAFAFA'),
                borderRadius: '0.75rem',
                border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5',
                opacity: operatingHours[day]?.enabled ? 1 : 0.5,
                transition: 'all 0.3s',
              }}>
                <div style={{ width: '120px', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} color={operatingHours[day]?.enabled ? '#FF4275' : '#A3A3A3'} />
                  {day}
                </div>
                <input
                  type="time"
                  value={operatingHours[day]?.open}
                  onChange={(e) => setOperatingHours(prev => ({
                    ...prev,
                    [day]: { ...prev[day], open: e.target.value }
                  }))}
                  disabled={!operatingHours[day]?.enabled}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                    cursor: operatingHours[day]?.enabled ? 'pointer' : 'not-allowed',
                  }}
                />
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>to</span>
                <input
                  type="time"
                  value={operatingHours[day]?.close}
                  onChange={(e) => setOperatingHours(prev => ({
                    ...prev,
                    [day]: { ...prev[day], close: e.target.value }
                  }))}
                  disabled={!operatingHours[day]?.enabled}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                    cursor: operatingHours[day]?.enabled ? 'pointer' : 'not-allowed',
                  }}
                />
                <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373', fontWeight: 600 }}>
                    {operatingHours[day]?.enabled ? 'Open' : 'Closed'}
                  </span>
                  <input
                    type="checkbox"
                    checked={operatingHours[day]?.enabled}
                    onChange={() => setOperatingHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day], enabled: !prev[day].enabled }
                    }))}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#FF4275' }}
                  />
                </label>
              </div>
            ))}
            <Button
              leftIcon={<Save size={18} />}
              onClick={handleSaveOperatingHours}
              style={{ marginTop: '1rem' }}
            >
              {isLoading ? 'Saving...' : 'Save Operating Hours'}
            </Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card variant="elevated" padding={6} style={{
          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Bell size={24} color="#FF4275" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
              Notifications
            </h2>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              { key: 'newBookings', label: 'New Booking Notifications', description: 'Get notified when a new booking is made', icon: Calendar },
              { key: 'payments', label: 'Payment Notifications', description: 'Receive alerts for successful payments', icon: DollarSign },
              { key: 'reviews', label: 'Review Notifications', description: 'Be notified of new customer reviews', icon: Star },
              { key: 'emails', label: 'Email Notifications', description: 'Receive email summaries of daily activity', icon: Mail },
              { key: 'sms', label: 'SMS Notifications', description: 'Get text messages for urgent updates', icon: MessageSquare },
            ].map((setting) => {
              const isEnabled = notificationSettings[setting.key as keyof typeof notificationSettings];
              const IconComponent = setting.icon;
              return (
                <div 
                  key={setting.key} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem',
                    background: isEnabled ? (darkMode ? 'rgba(255, 66, 117, 0.05)' : '#FFF1F4') : (darkMode ? 'rgba(255, 255, 255, 0.02)' : '#FAFAFA'),
                    borderRadius: '0.75rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '0.75rem',
                      background: isEnabled ? '#FF427520' : (darkMode ? 'rgba(255,255,255,0.05)' : '#F3F4F6'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <IconComponent size={20} color={isEnabled ? '#FF4275' : '#A3A3A3'} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {setting.label}
                        {isEnabled && <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: '#22C55E20', color: '#22C55E', borderRadius: '0.25rem', fontWeight: 700 }}>ON</span>}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>
                        {setting.description}
                      </div>
                    </div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '54px', height: '28px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => toggleNotification(setting.key)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isEnabled ? '#FF4275' : (darkMode ? '#404040' : '#E5E5E5'),
                      transition: '0.4s',
                      borderRadius: '28px',
                      boxShadow: isEnabled ? '0 0 10px rgba(255, 66, 117, 0.3)' : 'none',
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '22px',
                        width: '22px',
                        left: isEnabled ? '29px' : '3px',
                        bottom: '3px',
                        background: 'white',
                        transition: '0.4s',
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }} />
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Security & API Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <Card variant="elevated" padding={6} style={{
            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Shield size={24} color="#FF4275" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                Security
              </h2>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Button 
                variant="outline" 
                leftIcon={<Lock size={18} />} 
                fullWidth
                onClick={() => toast.success('Password change dialog would open here', { icon: '🔒' })}
              >
                Change Password
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Shield size={18} />} 
                fullWidth
                onClick={() => toast.success('Two-factor authentication setup', { icon: '🛡️' })}
              >
                Two-Factor Auth
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Activity size={18} />} 
                fullWidth
                onClick={() => toast.success('Showing recent login activity', { icon: '📊' })}
              >
                Login Activity
              </Button>
            </div>
          </Card>

          <Card variant="elevated" padding={6} style={{
            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Key size={24} color="#FF4275" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                API & Integrations
              </h2>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Button 
                variant="outline" 
                leftIcon={<Key size={18} />} 
                fullWidth
                onClick={() => {
                  const apiKey = 'sk_live_' + Math.random().toString(36).substring(2, 15);
                  navigator.clipboard.writeText(apiKey);
                  toast.success('API key generated and copied to clipboard!', { icon: '🔑', duration: 4000 });
                }}
              >
                Generate API Key
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Globe size={18} />} 
                fullWidth
                onClick={() => toast.success('Webhook configuration would open here', { icon: '🔗' })}
              >
                Webhooks
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Wifi size={18} />} 
                fullWidth
                onClick={() => toast.success('Available integrations: Stripe, Zoom, Google Calendar', { icon: '🔌', duration: 4000 })}
              >
                Integrations
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? '#1A1A1A' : 'white',
            color: darkMode ? 'white' : '#1A1A1A',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
          },
        }}
      />

      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div>
          {/* Header with Notifications */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1rem',
            position: 'relative',
          }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Bell size={20} color={darkMode ? 'white' : '#1A1A1A'} />
              {unreadCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  width: '10px',
                  height: '10px',
                  background: '#FF4275',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 2px ' + (darkMode ? '#1A1A1A' : 'white'),
                }} />
              )}
            </button>

            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                width: '380px',
                maxHeight: '500px',
                background: darkMode ? 'rgba(26, 26, 26, 0.98)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                overflowY: 'auto',
                zIndex: 1000,
              }}>
                <div style={{
                  padding: '1rem 1.5rem',
                  borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <h3 style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>Notifications</h3>
                  <button
                    onClick={markAllNotificationsRead}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FF4275',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Mark all read
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: darkMode ? '#737373' : '#A3A3A3' }}>
                    <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '1rem 1.5rem',
                        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6',
                        background: notif.read ? 'transparent' : (darkMode ? 'rgba(255, 66, 117, 0.05)' : '#FFF1F4'),
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: notif.type === 'booking' ? '#FF427520' : notif.type === 'payment' ? '#22C55E20' : '#FFB34720',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {notif.type === 'booking' && <Calendar size={18} color="#FF4275" />}
                          {notif.type === 'payment' && <DollarSign size={18} color="#22C55E" />}
                          {notif.type === 'review' && <Star size={18} color="#FFB347" />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.9375rem', marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                            {notif.message}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: darkMode ? '#737373' : '#A3A3A3' }}>
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#FF4275',
                          }} />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'staff' && renderStaff()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'earnings' && renderEarnings()}
          {activeTab === 'calendar' && renderCalendar()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'settings' && renderSettings()}

          {/* Service Edit Modal */}
          {showServiceModal && selectedService && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
              }}
              onClick={() => {
                setShowServiceModal(false);
                setSelectedService(null);
              }}
            >
              <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', margin: '0 1rem' }}>
                <Card variant="elevated" padding={6} style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.95)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      Edit Service
                    </h2>
                    <button
                      onClick={() => {
                        setShowServiceModal(false);
                        setSelectedService(null);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={selectedService.name}
                        onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1rem',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                          Category
                        </label>
                        <select
                          value={selectedService.category}
                          onChange={(e) => setSelectedService({ ...selectedService, category: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontSize: '1rem',
                          }}
                        >
                          <option value="Hair">Hair</option>
                          <option value="Makeup">Makeup</option>
                          <option value="Nails">Nails</option>
                          <option value="Facial">Facial</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                          Duration
                        </label>
                        <select
                          value={selectedService.duration}
                          onChange={(e) => setSelectedService({ ...selectedService, duration: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontSize: '1rem',
                          }}
                        >
                          <option value="30min">30 minutes</option>
                          <option value="45min">45 minutes</option>
                          <option value="60min">60 minutes</option>
                          <option value="90min">90 minutes</option>
                          <option value="120min">120 minutes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={selectedService.price}
                        onChange={(e) => setSelectedService({ ...selectedService, price: parseFloat(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Description
                      </label>
                      <textarea
                        value={selectedService.description}
                        onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1rem',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Active Service
                      </label>
                      <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                        <input
                          type="checkbox"
                          checked={selectedService.active}
                          onChange={(e) => setSelectedService({ ...selectedService, active: e.target.checked })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: selectedService.active ? '#FF4275' : (darkMode ? '#404040' : '#E5E5E5'),
                          transition: '0.4s',
                          borderRadius: '24px',
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: selectedService.active ? '28px' : '3px',
                            bottom: '3px',
                            background: 'white',
                            transition: '0.4s',
                            borderRadius: '50%',
                          }} />
                        </span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <Button
                        onClick={handleEditService}
                        leftIcon={<Save size={18} />}
                        fullWidth
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowServiceModal(false);
                          setSelectedService(null);
                        }}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Staff Edit Modal */}
          {showStaffModal && selectedStaff && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
              }}
              onClick={() => {
                setShowStaffModal(false);
                setSelectedStaff(null);
              }}
            >
              <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', margin: '0 1rem' }}>
                <Card variant="elevated" padding={6} style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.95)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      Edit Staff Member
                    </h2>
                    <button
                      onClick={() => {
                        setShowStaffModal(false);
                        setSelectedStaff(null);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={selectedStaff.name}
                        onChange={(e) => setSelectedStaff({ ...selectedStaff, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1rem',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                          Role
                        </label>
                        <select
                          value={selectedStaff.role}
                          onChange={(e) => setSelectedStaff({ ...selectedStaff, role: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontSize: '1rem',
                          }}
                        >
                          <option value="Hair Stylist">Hair Stylist</option>
                          <option value="Makeup Artist">Makeup Artist</option>
                          <option value="Nail Technician">Nail Technician</option>
                          <option value="Esthetician">Esthetician</option>
                          <option value="Manager">Manager</option>
                          <option value="Receptionist">Receptionist</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                          Rating
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={selectedStaff.rating}
                          onChange={(e) => setSelectedStaff({ ...selectedStaff, rating: parseFloat(e.target.value) })}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                            background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontSize: '1rem',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={selectedStaff.specialization}
                        onChange={(e) => setSelectedStaff({ ...selectedStaff, specialization: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                        Avatar
                      </label>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {['👨‍🦱', '👩‍🦰', '👨‍🦰', '👩‍🦱', '👨‍💼', '👩‍💼', '🧑‍🦱', '🧑‍🦰'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setSelectedStaff({ ...selectedStaff, avatar: emoji })}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '0.5rem',
                              border: selectedStaff.avatar === emoji ? '2px solid #FF4275' : (darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5'),
                              background: selectedStaff.avatar === emoji ? '#FF427520' : (darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white'),
                              cursor: 'pointer',
                              fontSize: '1.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? '#A3A3A3' : '#737373' }}>
                          Total Bookings
                        </label>
                        <div style={{ 
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          background: darkMode ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                        }}>
                          {selectedStaff.bookings}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: darkMode ? '#A3A3A3' : '#737373' }}>
                          Total Revenue
                        </label>
                        <div style={{ 
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          background: darkMode ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                        }}>
                          ${selectedStaff.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <Button
                        onClick={handleEditStaff}
                        leftIcon={<Save size={18} />}
                        fullWidth
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowStaffModal(false);
                          setSelectedStaff(null);
                        }}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Booking Details Modal */}
          {showBookingDetails && selectedBooking && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.2s ease',
              }}
              onClick={() => {
                setShowBookingDetails(false);
                setSelectedBooking(null);
              }}
            >
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{ 
                  width: '100%', 
                  maxWidth: '700px', 
                  margin: '0 1rem',
                  animation: 'slideUp 0.3s ease',
                }}
              >
                <Card variant="elevated" padding={6} style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.98)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '0.5rem' }}>
                        Booking Details
                      </h2>
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: `${statusColors[selectedBooking.status]}15`,
                        color: statusColors[selectedBooking.status],
                        textTransform: 'capitalize',
                      }}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowBookingDetails(false);
                        setSelectedBooking(null);
                      }}
                      style={{
                        background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        color: darkMode ? 'white' : '#1A1A1A',
                        transition: 'all 0.2s',
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Customer Information */}
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={20} color="#FF4275" />
                        Customer Information
                      </h3>
                      <div style={{
                        background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        display: 'grid',
                        gap: '1rem',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Name:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.customer}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Phone:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.phone}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Email:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color="#FF4275" />
                        Booking Information
                      </h3>
                      <div style={{
                        background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F9FAFB',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        display: 'grid',
                        gap: '1rem',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Service:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.service}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Date:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.date}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Time:</span>
                          <span style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>{selectedBooking.time}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5' }}>
                          <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>Total Price:</span>
                          <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#FF4275' }}>${selectedBooking.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem' }}>
                      {selectedBooking.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => {
                              handleBookingAction(selectedBooking.id, 'accept');
                              setShowBookingDetails(false);
                            }}
                            leftIcon={<CheckCircle size={18} />}
                            style={{
                              background: '#22C55E',
                              borderColor: '#22C55E',
                            }}
                          >
                            Accept Booking
                          </Button>
                          <Button
                            onClick={() => {
                              handleBookingAction(selectedBooking.id, 'reject');
                              setShowBookingDetails(false);
                            }}
                            variant="outline"
                            leftIcon={<XCircle size={18} />}
                            style={{
                              borderColor: '#EF4444',
                              color: '#EF4444',
                            }}
                          >
                            Reject Booking
                          </Button>
                        </>
                      )}
                      {selectedBooking.status === 'in-progress' && (
                        <Button
                          onClick={() => {
                            handleBookingAction(selectedBooking.id, 'complete');
                            setShowBookingDetails(false);
                          }}
                          leftIcon={<CheckCircle size={18} />}
                          style={{
                            background: '#9575BF',
                            borderColor: '#9575BF',
                            gridColumn: '1 / -1',
                          }}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      {!['completed', 'cancelled'].includes(selectedBooking.status) && (
                        <Button
                          onClick={() => {
                            handleBookingAction(selectedBooking.id, 'cancel');
                            setShowBookingDetails(false);
                          }}
                          variant="outline"
                          leftIcon={<XCircle size={18} />}
                          style={{
                            borderColor: '#EF4444',
                            color: '#EF4444',
                            gridColumn: selectedBooking.status !== 'pending' ? '1 / -1' : 'auto',
                          }}
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5' }}>
                      <button
                        onClick={() => {
                          window.location.href = `tel:${selectedBooking.phone}`;
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: 'transparent',
                          color: darkMode ? 'white' : '#1A1A1A',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: 600,
                          transition: 'all 0.2s',
                        }}
                      >
                        <Phone size={16} />
                        Call
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = `mailto:${selectedBooking.email}`;
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: 'transparent',
                          color: darkMode ? 'white' : '#1A1A1A',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: 600,
                          transition: 'all 0.2s',
                        }}
                      >
                        <Mail size={16} />
                        Email
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = `sms:${selectedBooking.phone}`;
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                          background: 'transparent',
                          color: darkMode ? 'white' : '#1A1A1A',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: 600,
                          transition: 'all 0.2s',
                        }}
                      >
                        <MessageSquare size={16} />
                        SMS
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {(activeTab === 'calendar' || activeTab === 'reports' || activeTab === 'settings') && (
            <div style={{
              padding: '4rem',
              textAlign: 'center',
              color: darkMode ? '#737373' : '#A3A3A3',
            }}>
              <Activity size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab
              </h2>
              <p>Content for this tab will be implemented soon</p>
              <Button onClick={() => setActiveTab('overview')} style={{ marginTop: '2rem' }}>
                Back to Overview
              </Button>
            </div>
          )}
        </div>
      </DashboardLayout>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        button:hover {
          transform: translateY(-1px);
        }

        button:active {
          transform: translateY(0);
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 66, 117, 0.1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? 'rgba(255,255,255,0.02)' : '#F3F4F6'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : '#D1D5DB'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.15)' : '#9CA3AF'};
        }

        /* Glassmorphism effects */
        .glass-card {
          background: ${darkMode ? 'rgba(26, 26, 26, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        /* Hover effects for cards */
        .interactive-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .interactive-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}
