'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, Button } from '@zoo/ui';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

  const initializeData = () => {
    // Initialize bookings
    setBookingsData([
      { id: '1', customer: 'Sarah Johnson', service: 'Luxury Hair Treatment', time: '10:00 AM', date: '2025-12-25', status: 'confirmed', price: 150, email: 'sarah.j@email.com', phone: '+1 234-567-8900' },
      { id: '2', customer: 'Emma Davis', service: 'Bridal Makeup', time: '11:30 AM', date: '2025-12-25', status: 'pending', price: 250, email: 'emma.d@email.com', phone: '+1 234-567-8901' },
      { id: '3', customer: 'Olivia Wilson', service: 'Classic Manicure', time: '2:00 PM', date: '2025-12-25', status: 'confirmed', price: 75, email: 'olivia.w@email.com', phone: '+1 234-567-8902' },
      { id: '4', customer: 'Ava Martinez', service: 'Hydrating Facial', time: '3:30 PM', date: '2025-12-25', status: 'in-progress', price: 120, email: 'ava.m@email.com', phone: '+1 234-567-8903' },
      { id: '5', customer: 'Isabella Brown', service: 'Hair Coloring', time: '4:00 PM', date: '2025-12-26', status: 'pending', price: 180, email: 'isabella.b@email.com', phone: '+1 234-567-8904' },
    ]);

    // Initialize services
    setServicesData([
      { id: '1', name: 'Luxury Hair Treatment', category: 'Hair', price: 150, duration: '90 min', active: true, bookings: 45, description: 'Premium hair treatment service' },
      { id: '2', name: 'Bridal Makeup', category: 'Makeup', price: 250, duration: '120 min', active: true, bookings: 32, description: 'Complete bridal makeup package' },
      { id: '3', name: 'Classic Manicure', category: 'Nails', price: 75, duration: '60 min', active: true, bookings: 58, description: 'Professional manicure service' },
      { id: '4', name: 'Hydrating Facial', category: 'Facial', price: 120, duration: '75 min', active: true, bookings: 41, description: 'Deep hydrating facial treatment' },
      { id: '5', name: 'Hair Coloring', category: 'Hair', price: 180, duration: '120 min', active: false, bookings: 28, description: 'Professional hair coloring' },
    ]);

    // Initialize staff
    setStaffData([
      { id: '1', name: 'Jessica Smith', role: 'Senior Stylist', specialization: 'Hair Specialist', avatar: '👩‍🦰', rating: 4.9, bookings: 156, revenue: 18500 },
      { id: '2', name: 'Michael Johnson', role: 'Makeup Artist', specialization: 'Bridal Makeup', avatar: '👨‍🎨', rating: 4.8, bookings: 128, revenue: 16200 },
      { id: '3', name: 'Emily Davis', role: 'Nail Technician', specialization: 'Nail Art', avatar: '👩‍💼', rating: 4.7, bookings: 142, revenue: 12800 },
      { id: '4', name: 'David Wilson', role: 'Beautician', specialization: 'Facial Treatments', avatar: '👨‍⚕️', rating: 4.9, bookings: 134, revenue: 15400 },
    ]);

    // Initialize customers
    setCustomersData([
      { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234-567-8900', totalBookings: 12, totalSpent: 1850, lastVisit: '2025-12-20', status: 'VIP' },
      { id: '2', name: 'Emma Davis', email: 'emma.d@email.com', phone: '+1 234-567-8901', totalBookings: 8, totalSpent: 1200, lastVisit: '2025-12-18', status: 'Regular' },
      { id: '3', name: 'Olivia Wilson', email: 'olivia.w@email.com', phone: '+1 234-567-8902', totalBookings: 15, totalSpent: 2450, lastVisit: '2025-12-22', status: 'VIP' },
      { id: '4', name: 'Ava Martinez', email: 'ava.m@email.com', phone: '+1 234-567-8903', totalBookings: 5, totalSpent: 680, lastVisit: '2025-12-15', status: 'New' },
    ]);

    // Initialize reviews
    setReviewsData([
      { id: '1', customer: 'Sarah Johnson', rating: 5, service: 'Hair Treatment', comment: 'Absolutely amazing service! Jessica did a fantastic job.', date: '2025-12-20', avatar: '👩', response: '' },
      { id: '2', customer: 'Emma Davis', rating: 5, service: 'Bridal Makeup', comment: 'Made my special day perfect! Highly recommended.', date: '2025-12-18', avatar: '👰', response: '' },
      { id: '3', customer: 'Olivia Wilson', rating: 4, service: 'Manicure', comment: 'Great service, but had to wait a bit longer than expected.', date: '2025-12-17', avatar: '👩‍💼', response: '' },
      { id: '4', customer: 'Ava Martinez', rating: 5, service: 'Facial', comment: 'My skin feels incredible! Will definitely come back.', date: '2025-12-15', avatar: '👩‍🦱', response: 'Thank you so much! We look forward to seeing you again!' },
    ]);
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
    setReviewsData(prev =>
      prev.map(review =>
        review.id === reviewId ? { ...review, response } : review
      )
    );
    toast.success('Response added successfully');
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
            <Card key={index} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Bookings Management
          </h1>
          <Button leftIcon={<Download size={18} />} variant="outline" onClick={() => exportToCSV(bookingsData, 'bookings')}>
            Export
          </Button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#737373' }} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '0.5rem',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                color: darkMode ? 'white' : '#1A1A1A',
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
                <tr key={booking.id} style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F3F4F6' }}>
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
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: 'none',
                              background: '#22C55E',
                              color: 'white',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'reject')}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: '1px solid #EF4444',
                              background: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status === 'in-progress' && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'complete')}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: '#9575BF',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          Complete
                        </button>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                            color: '#EF4444',
                            cursor: 'pointer',
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
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: 'none',
                          background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                          color: darkMode ? 'white' : '#1A1A1A',
                          cursor: 'pointer',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {servicesData.map(service => (
            <Card key={service.id} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: service.active ? '#22C55E20' : '#EF444420',
                  color: service.active ? '#22C55E' : '#EF4444',
                }}>
                  {service.active ? 'Active' : 'Inactive'}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleToggleService(service.id)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: darkMode ? 'white' : '#1A1A1A',
                      cursor: 'pointer',
                    }}
                  >
                    <Zap size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setShowServiceModal(true);
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
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: '#EF4444',
                      cursor: 'pointer',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {staffData.map(member => (
            <Card key={member.id} variant="elevated" padding={6} style={{
              background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}>
                  {member.avatar}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedStaff(member);
                      setShowStaffModal(true);
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
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(member.id)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6',
                      color: '#EF4444',
                      cursor: 'pointer',
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
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                      background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                  <button
                    onClick={() => handleRespondToReview(review.id, 'Thank you for your feedback!')}
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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

    // Generate calendar bookings
    const calendarBookings = bookingsData.map(booking => ({
      ...booking,
      start: new Date(booking.date + ' ' + booking.time),
      title: `${booking.customer} - ${booking.service}`,
    }));

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
            Calendar View
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['month', 'week', 'day'].map(view => (
              <button
                key={view}
                onClick={() => setCalendarView(view as any)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: calendarView === view ? '#FF4275' : (darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white'),
                  color: calendarView === view ? 'white' : (darkMode ? '#A3A3A3' : '#737373'),
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
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
    const [businessName, setBusinessName] = useState('Glamour Studio');
    const [businessEmail, setBusinessEmail] = useState('contact@glamourstudio.com');
    const [businessPhone, setBusinessPhone] = useState('+1 234-567-8900');
    const [businessAddress, setBusinessAddress] = useState('123 Beauty Ave, New York, NY 10001');

    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A', marginBottom: '2rem' }}>
          Settings
        </h1>

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
            <Button
              leftIcon={<Save size={18} />}
              onClick={() => toast.success('Business profile updated successfully')}
            >
              Save Changes
            </Button>
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
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '120px', fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                  {day}
                </div>
                <input
                  type="time"
                  defaultValue="09:00"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
                <span style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>to</span>
                <input
                  type="time"
                  defaultValue="18:00"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
                <input
                  type="checkbox"
                  defaultChecked={day !== 'Sunday'}
                  style={{ marginLeft: 'auto', width: '20px', height: '20px' }}
                />
              </div>
            ))}
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
              { label: 'New Booking Notifications', description: 'Get notified when a new booking is made' },
              { label: 'Payment Notifications', description: 'Receive alerts for successful payments' },
              { label: 'Review Notifications', description: 'Be notified of new customer reviews' },
              { label: 'Email Notifications', description: 'Receive email summaries of daily activity' },
              { label: 'SMS Notifications', description: 'Get text messages for urgent updates' },
            ].map((setting, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? 'white' : '#1A1A1A' }}>
                    {setting.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: darkMode ? '#A3A3A3' : '#737373' }}>
                    {setting.description}
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                  <input
                    type="checkbox"
                    defaultChecked={index < 3}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: index < 3 ? '#FF4275' : (darkMode ? '#404040' : '#E5E5E5'),
                    transition: '0.4s',
                    borderRadius: '24px',
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '18px',
                      width: '18px',
                      left: index < 3 ? '28px' : '3px',
                      bottom: '3px',
                      background: 'white',
                      transition: '0.4s',
                      borderRadius: '50%',
                    }} />
                  </span>
                </label>
              </div>
            ))}
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
              <Button variant="outline" leftIcon={<Lock size={18} />} fullWidth>
                Change Password
              </Button>
              <Button variant="outline" leftIcon={<Shield size={18} />} fullWidth>
                Two-Factor Auth
              </Button>
              <Button variant="outline" leftIcon={<Activity size={18} />} fullWidth>
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
              <Button variant="outline" leftIcon={<Key size={18} />} fullWidth>
                Generate API Key
              </Button>
              <Button variant="outline" leftIcon={<Globe size={18} />} fullWidth>
                Webhooks
              </Button>
              <Button variant="outline" leftIcon={<Wifi size={18} />} fullWidth>
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
      `}</style>
    </>
  );
}
