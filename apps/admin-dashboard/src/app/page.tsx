'use client';

import { Button, Card, Input } from '@zoo/ui';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { 
  BarChart3, 
  Users, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Bell,
  Moon,
  Sun,
  Store,
  ChevronRight,
  Activity,
  Shield,
  UserCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Star,
  Package,
  CreditCard,
  RefreshCw,
  AlertCircle,
  Info,
  MessageSquare,
  Send,
  X,
  Check,
  Zap,
  Target,
  Gift,
  BarChart,
  PieChart,
  FileText,
  Upload,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronDown,
  Wifi,
  WifiOff,
  Globe,
  Command,
  Lock,
  Unlock,
  Flag,
  ThumbsUp,
  ThumbsDown,
  TrendingDown,
  Copy,
  ExternalLink,
  Layers,
  Sliders,
  Database,
  Key
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBar,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Real-time features
  const [liveBookings, setLiveBookings] = useState<any[]>([]);
  const [activeUsers, setActiveUsers] = useState(1247);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Bulk actions
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Command palette
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  // Support tickets
  const [tickets, setTickets] = useState<any[]>([]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  
  // Promo codes
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  
  // Reviews
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  
  // Additional modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedServiceEdit, setSelectedServiceEdit] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBookingEdit, setSelectedBookingEdit] = useState<any>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('admin-darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
    
    // Initialize notifications
    initializeNotifications();
    
    // Simulate real-time updates
    simulateRealTimeUpdates();
    
    // Initialize sample data
    initializeSampleData();
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowNotifications(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const initializeNotifications = () => {
    const initialNotifications = [
      { id: '1', type: 'booking', message: 'New booking from Sarah Johnson', time: '2 min ago', read: false },
      { id: '2', type: 'payment', message: 'Payment of $120 received', time: '5 min ago', read: false },
      { id: '3', type: 'review', message: 'New review from Michael Brown', time: '12 min ago', read: true },
      { id: '4', type: 'support', message: 'Support ticket #1234 updated', time: '25 min ago', read: true },
    ];
    setNotifications(initialNotifications);
  };
  
  const initializeSampleData = () => {
    // Support tickets
    setTickets([
      { id: 'TK-001', customer: 'Sarah Johnson', subject: 'Payment Issue', priority: 'high', status: 'open', created: '2024-12-25 09:30' },
      { id: 'TK-002', customer: 'Michael Brown', subject: 'Booking Cancellation', priority: 'medium', status: 'in-progress', created: '2024-12-25 08:15' },
      { id: 'TK-003', customer: 'Emma Wilson', subject: 'Service Quality', priority: 'low', status: 'resolved', created: '2024-12-24 16:45' },
    ]);
    
    // Promo codes
    setPromoCodes([
      { code: 'WELCOME20', discount: '20%', uses: 145, limit: 500, expires: '2025-01-31', status: 'active' },
      { code: 'NEWYEAR50', discount: '$50', uses: 89, limit: 200, expires: '2025-01-15', status: 'active' },
      { code: 'FIRST10', discount: '10%', uses: 523, limit: 1000, expires: '2025-12-31', status: 'active' },
    ]);
    
    // Pending reviews
    setPendingReviews([
      { id: 'RV-001', customer: 'Sarah Johnson', provider: 'Glamour Studio', rating: 5, comment: 'Amazing service! Highly recommend.', date: '2024-12-25' },
      { id: 'RV-002', customer: 'Michael Brown', provider: 'Beauty Paradise', rating: 4, comment: 'Good experience overall.', date: '2024-12-25' },
    ]);
  };
  
  const simulateRealTimeUpdates = () => {
    const interval = setInterval(() => {
      // Simulate new booking notification
      const newBooking = {
        customer: ['Emma Wilson', 'James Taylor', 'Olivia Davis'][Math.floor(Math.random() * 3)],
        service: ['Hair Styling', 'Facial', 'Manicure'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 100) + 50,
      };
      
      setLiveBookings(prev => [newBooking, ...prev].slice(0, 5));
      
      // Show toast notification
      if (Math.random() > 0.7) {
        toast.success(`New booking: ${newBooking.customer} - ${newBooking.service}`, {
          icon: '🎉',
          duration: 3000,
        });
        
        // Add to notifications
        setNotifications(prev => [{
          id: Date.now().toString(),
          type: 'booking',
          message: `New booking from ${newBooking.customer}`,
          time: 'Just now',
          read: false
        }, ...prev]);
      }
      
      // Update active users count
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 8000);
    
    return () => clearInterval(interval);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('admin-darkMode', JSON.stringify(newMode));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  // Chart data for analytics
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 450, users: 1200 },
    { month: 'Feb', revenue: 52000, bookings: 520, users: 1350 },
    { month: 'Mar', revenue: 48000, bookings: 480, users: 1420 },
    { month: 'Apr', revenue: 61000, bookings: 610, users: 1580 },
    { month: 'May', revenue: 58000, bookings: 580, users: 1650 },
    { month: 'Jun', revenue: 70000, bookings: 700, users: 1820 },
    { month: 'Jul', revenue: 68000, bookings: 680, users: 1900 },
    { month: 'Aug', revenue: 75000, bookings: 750, users: 2100 },
    { month: 'Sep', revenue: 82000, bookings: 820, users: 2250 },
    { month: 'Oct', revenue: 78000, bookings: 780, users: 2380 },
    { month: 'Nov', revenue: 91000, bookings: 910, users: 2580 },
    { month: 'Dec', revenue: 96000, bookings: 960, users: 2750 },
  ];
  
  const categoryData = [
    { name: 'Hair', value: 38, color: '#FF4275' },
    { name: 'Skincare', value: 27, color: '#774EAF' },
    { name: 'Nails', value: 21, color: '#FFB347' },
    { name: 'Makeup', value: 14, color: '#22C55E' },
  ];
  
  const performanceData = [
    { day: 'Mon', bookings: 125, revenue: 5200 },
    { day: 'Tue', bookings: 142, revenue: 5800 },
    { day: 'Wed', bookings: 138, revenue: 5500 },
    { day: 'Thu', bookings: 156, revenue: 6200 },
    { day: 'Fri', bookings: 178, revenue: 7100 },
    { day: 'Sat', bookings: 195, revenue: 7800 },
    { day: 'Sun', bookings: 165, revenue: 6600 },
  ];
  
  // Helper functions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  
  const selectAll = (items: any[]) => {
    setSelectedItems(items.map(item => item.id));
  };
  
  const clearSelection = () => {
    setSelectedItems([]);
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
    toast.success('Data exported successfully!');
  };
  
  const handleBulkAction = (action: string) => {
    toast.success(`${action} applied to ${selectedItems.length} items`);
    clearSelection();
  };
  
  const approveReview = (id: string) => {
    setPendingReviews(prev => prev.filter(r => r.id !== id));
    toast.success('Review approved and published!');
  };
  
  const rejectReview = (id: string) => {
    setPendingReviews(prev => prev.filter(r => r.id !== id));
    toast.error('Review rejected');
  };
  
  const createPromoCode = () => {
    toast.success('Promo code created successfully!');
  };
  
  const assignTicket = (id: string) => {
    toast.success('Ticket assigned to support team');
  };
  
  const resolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
    toast.success('Ticket resolved!');
  };
  
  const handleUserAction = (userId: string, action: 'approve' | 'suspend' | 'delete' | 'edit') => {
    switch(action) {
      case 'approve':
        toast.success('User approved successfully!', { icon: '✅' });
        break;
      case 'suspend':
        toast.success('User suspended', { icon: '⛔' });
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this user?')) {
          toast.success('User deleted', { icon: '🗑️' });
        }
        break;
      case 'edit':
        setShowUserModal(true);
        toast.success('Opening user details...');
        break;
    }
  };
  
  const handleServiceEdit = (serviceId: string) => {
    toast.success('Opening service editor...');
    setShowServiceModal(true);
  };
  
  const handleBookingAction = (bookingId: string, action: 'view' | 'edit' | 'cancel' | 'refund') => {
    switch(action) {
      case 'view':
        setShowBookingModal(true);
        toast.success('Opening booking details...');
        break;
      case 'edit':
        toast.success('Edit booking functionality');
        break;
      case 'cancel':
        if (confirm('Cancel this booking?')) {
          toast.success('Booking cancelled', { icon: '❌' });
        }
        break;
      case 'refund':
        toast.success('Processing refund...', { icon: '💰' });
        break;
    }
  };
  
  const handleTransactionAction = (txId: string, action: 'view' | 'refund' | 'dispute') => {
    switch(action) {
      case 'view':
        toast.success('Viewing transaction details');
        break;
      case 'refund':
        if (confirm('Process refund for this transaction?')) {
          toast.success('Refund initiated', { icon: '💵' });
        }
        break;
      case 'dispute':
        toast('Opening dispute resolution...', { icon: '⚠️' });
        break;
    }
  };
  
  // Form data states
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active'
  });
  
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    category: '',
    priceMin: '',
    priceMax: '',
    description: ''
  });
  
  const [promoFormData, setPromoFormData] = useState({
    code: '',
    discount: '',
    limit: '',
    expires: ''
  });
  
  const [ticketFormData, setTicketFormData] = useState({
    customer: '',
    subject: '',
    priority: 'medium',
    description: ''
  });
  
  const handleSaveUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`User ${userFormData.name} saved successfully!`, { icon: '✅' });
    setShowUserModal(false);
    setUserFormData({ name: '', email: '', phone: '', role: 'customer', status: 'active' });
  };
  
  const handleSaveService = () => {
    if (!serviceFormData.name || !serviceFormData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Service "${serviceFormData.name}" updated successfully!`, { icon: '✨' });
    setShowServiceModal(false);
    setServiceFormData({ name: '', category: '', priceMin: '', priceMax: '', description: '' });
  };
  
  const handleCreatePromo = () => {
    if (!promoFormData.code || !promoFormData.discount) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Promo code "${promoFormData.code}" created!`, { icon: '🎉' });
    setShowPromoModal(false);
    setPromoFormData({ code: '', discount: '', limit: '', expires: '' });
  };
  
  const handleCreateTicket = () => {
    if (!ticketFormData.subject || !ticketFormData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Support ticket created successfully!', { icon: '🎫' });
    setShowTicketModal(false);
    setTicketFormData({ customer: '', subject: '', priority: 'medium', description: '' });
  };

  const platformStats = [
    { label: 'Total Users', value: '12,453', change: '+12.5%', trend: 'up', icon: Users, color: '#FF4275' },
    { label: 'Total Bookings', value: '8,921', change: '+8.3%', trend: 'up', icon: Calendar, color: '#774EAF' },
    { label: 'Total Revenue', value: '$284,592', change: '+15.2%', trend: 'up', icon: DollarSign, color: '#FFB347' },
    { label: 'Active Providers', value: '234', change: '+5.7%', trend: 'up', icon: Store, color: '#22C55E' },
  ];

  const recentUsers = [
    { id: '1', name: 'Sarah Johnson', role: 'customer', email: 'sarah@example.com', status: 'active', joined: '2024-12-20', phone: '+1 234 567 8900' },
    { id: '2', name: 'Glamour Studio', role: 'provider', email: 'contact@glamour.com', status: 'active', joined: '2024-12-18', phone: '+1 234 567 8901' },
    { id: '3', name: 'Emily Chen', role: 'beautician', email: 'emily@example.com', status: 'active', joined: '2024-12-15', phone: '+1 234 567 8902' },
    { id: '4', name: 'Beauty Paradise', role: 'provider', email: 'info@paradise.com', status: 'pending', joined: '2024-12-22', phone: '+1 234 567 8903' },
    { id: '5', name: 'Michael Brown', role: 'customer', email: 'michael@example.com', status: 'active', joined: '2024-12-10', phone: '+1 234 567 8904' },
    { id: '6', name: 'Sophia Davis', role: 'beautician', email: 'sophia@example.com', status: 'active', joined: '2024-12-08', phone: '+1 234 567 8905' },
  ];

  const allServices = [
    { id: '1', name: 'Hair Styling', category: 'Hair', price: '$45-$120', providers: 24, bookings: 1234, rating: 4.8 },
    { id: '2', name: 'Manicure & Pedicure', category: 'Nails', price: '$30-$80', providers: 18, bookings: 892, rating: 4.9 },
    { id: '3', name: 'Facial Treatment', category: 'Skincare', price: '$60-$150', providers: 15, bookings: 678, rating: 4.7 },
    { id: '4', name: 'Makeup Application', category: 'Makeup', price: '$50-$200', providers: 22, bookings: 543, rating: 4.8 },
    { id: '5', name: 'Massage Therapy', category: 'Wellness', price: '$70-$180', providers: 12, bookings: 456, rating: 4.9 },
    { id: '6', name: 'Hair Coloring', category: 'Hair', price: '$80-$250', providers: 19, bookings: 789, rating: 4.6 },
  ];

  const allBookings = [
    { id: 'BK-1001', customer: 'Sarah Johnson', service: 'Hair Styling', provider: 'Glamour Studio', date: '2024-12-26', time: '10:00 AM', status: 'confirmed', amount: '$85' },
    { id: 'BK-1002', customer: 'Michael Brown', service: 'Facial Treatment', provider: 'Beauty Paradise', date: '2024-12-26', time: '2:00 PM', status: 'confirmed', amount: '$120' },
    { id: 'BK-1003', customer: 'Emma Wilson', service: 'Manicure', provider: 'Nail Studio', date: '2024-12-27', time: '11:00 AM', status: 'pending', amount: '$45' },
    { id: 'BK-1004', customer: 'James Taylor', service: 'Massage', provider: 'Spa Center', date: '2024-12-27', time: '3:00 PM', status: 'completed', amount: '$95' },
    { id: 'BK-1005', customer: 'Olivia Davis', service: 'Makeup', provider: 'Glam Squad', date: '2024-12-28', time: '9:00 AM', status: 'confirmed', amount: '$150' },
  ];

  const allTransactions = [
    { id: 'TX-5001', customer: 'Sarah Johnson', amount: '$85.00', type: 'booking', status: 'completed', date: '2024-12-25 10:45 AM', method: 'Credit Card' },
    { id: 'TX-5002', customer: 'Michael Brown', amount: '$120.00', type: 'booking', status: 'completed', date: '2024-12-25 09:30 AM', method: 'PayPal' },
    { id: 'TX-5003', customer: 'Emma Wilson', amount: '$45.00', type: 'booking', status: 'pending', date: '2024-12-25 08:15 AM', method: 'Credit Card' },
    { id: 'TX-5004', customer: 'Glamour Studio', amount: '$425.00', type: 'payout', status: 'completed', date: '2024-12-24 04:00 PM', method: 'Bank Transfer' },
    { id: 'TX-5005', customer: 'Beauty Paradise', amount: '$680.00', type: 'payout', status: 'processing', date: '2024-12-24 02:30 PM', method: 'Bank Transfer' },
  ];

  const roleColors: Record<string, string> = {
    customer: '#3B82F6',
    provider: '#774EAF',
    beautician: '#FF4275',
    admin: '#1A1A1A',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#0F0F0F' : '#F5F5F5',
      transition: 'background 0.3s ease',
    }}>
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? '#1A1A1A' : '#fff',
            color: darkMode ? '#fff' : '#1A1A1A',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
          },
          success: {
            iconTheme: {
              primary: '#22C55E',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF4275',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Command Palette */}
      {showCommandPalette && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '15vh',
        }}
        onClick={() => setShowCommandPalette(false)}
        >
          <div 
            style={{
              width: '600px',
              maxWidth: '90vw',
              background: darkMode ? '#1A1A1A' : 'white',
              borderRadius: '1rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1.5rem', borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5' }}>
              <div style={{ position: 'relative' }}>
                <Command size={18} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: darkMode ? '#737373' : '#A3A3A3',
                }} />
                <Input
                  placeholder="Type a command or search..."
                  style={{
                    paddingLeft: '2.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: 'none',
                    fontSize: '1rem',
                  }}
                  autoFocus
                />
              </div>
            </div>
            <div style={{ padding: '0.5rem' }}>
              {[
                { label: 'Go to Users', icon: Users, action: () => setActiveTab('users') },
                { label: 'Go to Bookings', icon: Calendar, action: () => setActiveTab('bookings') },
                { label: 'Go to Analytics', icon: TrendingUp, action: () => setActiveTab('analytics') },
                { label: 'Toggle Dark Mode', icon: darkMode ? Sun : Moon, action: toggleDarkMode },
                { label: 'View Notifications', icon: Bell, action: () => setShowNotifications(true) },
              ].map((command, index) => {
                const IconComponent = command.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      command.action();
                      setShowCommandPalette(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'none',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: darkMode ? 'white' : '#1A1A1A',
                      cursor: 'pointer',
                      fontSize: '0.9375rem',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    <IconComponent size={18} style={{ color: '#FF4275' }} />
                    {command.label}
                  </button>
                );
              })}
            </div>
            <div style={{ 
              padding: '0.75rem 1rem',
              borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
              fontSize: '0.75rem',
              color: darkMode ? '#737373' : '#A3A3A3',
              display: 'flex',
              gap: '1rem',
            }}>
              <span>⌘K to open</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Bar */}
      <header style={{
        background: darkMode 
          ? 'rgba(26, 26, 26, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1.5rem 2rem',
        color: darkMode ? 'white' : '#1A1A1A',
        boxShadow: darkMode 
          ? '0 4px 24px rgba(0, 0, 0, 0.4)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <Image 
              src="/logo.png" 
              alt="Zoo Beauty" 
              width={45} 
              height={45}
              style={{ 
                borderRadius: '50%',
                border: `2px solid ${darkMode ? 'rgba(255, 66, 117, 0.3)' : '#E91E8C'}`,
              }}
            />
            Zoo Beauty Admin
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={toggleDarkMode}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                color: darkMode ? '#FFB347' : '#774EAF',
              }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Notification Bell with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: darkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  color: darkMode ? 'white' : '#1A1A1A',
                  position: 'relative',
                }}
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FF4275',
                    border: '2px solid ' + (darkMode ? '#1A1A1A' : 'white'),
                    boxShadow: '0 0 8px rgba(255, 66, 117, 0.5)',
                  }} />
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  right: 0,
                  width: '380px',
                  maxHeight: '500px',
                  background: darkMode ? '#1A1A1A' : 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                  overflow: 'hidden',
                  zIndex: 1000,
                }}>
                  <div style={{
                    padding: '1rem 1.5rem',
                    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}>
                      Notifications
                    </h3>
                    <button
                      onClick={markAllAsRead}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'none',
                        border: 'none',
                        color: '#FF4275',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: darkMode ? '#737373' : '#A3A3A3',
                      }}>
                        <Bell size={48} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          style={{
                            padding: '1rem 1.5rem',
                            borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F5F5F5',
                            cursor: 'pointer',
                            background: notif.read ? 'transparent' : darkMode ? 'rgba(255, 66, 117, 0.05)' : 'rgba(255, 66, 117, 0.03)',
                            transition: 'background 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = notif.read ? 'transparent' : darkMode ? 'rgba(255, 66, 117, 0.05)' : 'rgba(255, 66, 117, 0.03)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: darkMode ? 'rgba(255, 66, 117, 0.2)' : 'rgba(255, 66, 117, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FF4275',
                              flexShrink: 0,
                            }}>
                              {notif.type === 'booking' && <Calendar size={18} />}
                              {notif.type === 'payment' && <DollarSign size={18} />}
                              {notif.type === 'review' && <Star size={18} />}
                              {notif.type === 'support' && <MessageSquare size={18} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{
                                fontSize: '0.875rem',
                                color: darkMode ? 'white' : '#1A1A1A',
                                marginBottom: '0.25rem',
                                fontWeight: notif.read ? 400 : 600,
                              }}>
                                {notif.message}
                              </p>
                              <p style={{
                                fontSize: '0.75rem',
                                color: darkMode ? '#737373' : '#A3A3A3',
                              }}>
                                {notif.time}
                              </p>
                            </div>
                            {!notif.read && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#FF4275',
                                flexShrink: 0,
                              }} />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: 'white',
              fontSize: '1.125rem',
              boxShadow: '0 4px 12px rgba(255, 66, 117, 0.3)',
            }}>
              A
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        background: darkMode 
          ? 'rgba(26, 26, 26, 0.6)'
          : 'white',
        backdropFilter: 'blur(10px)',
        borderBottom: darkMode 
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '2px solid #E5E5E5',
        padding: '0 2rem',
        position: 'sticky',
        top: '85px',
        zIndex: 90,
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
        }}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id 
                    ? '3px solid #FF4275' 
                    : '3px solid transparent',
                  color: activeTab === tab.id 
                    ? '#FF4275' 
                    : darkMode ? '#A3A3A3' : '#737373',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {platformStats.map((stat, index) => {
                const IconComponent = stat.icon;
                const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
                return (
                  <Card 
                    key={index} 
                    variant="elevated" 
                    padding="6"
                    style={{
                      background: darkMode 
                        ? 'rgba(26, 26, 26, 0.8)'
                        : 'white',
                      border: darkMode 
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = darkMode
                        ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                        : '0 8px 24px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = darkMode
                        ? '0 4px 16px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: darkMode
                          ? `linear-gradient(135deg, ${stat.color}40 0%, ${stat.color}20 100%)`
                          : `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                      }}>
                        <IconComponent size={28} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          color: darkMode ? '#A3A3A3' : '#737373', 
                          fontSize: '0.875rem', 
                          marginBottom: '0.25rem' 
                        }}>
                          {stat.label}
                        </p>
                        <h3 style={{
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          color: darkMode ? 'white' : stat.color,
                        }}>
                          {stat.value}
                        </h3>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.875rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: darkMode
                        ? 'rgba(34, 197, 94, 0.15)'
                        : '#D1FAE520',
                      color: '#22C55E',
                      width: 'fit-content',
                    }}>
                      <TrendIcon size={16} />
                      {stat.change} this month
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {/* Live Activity Feed & Active Users */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {/* Live Bookings Feed */}
              <Card
                variant="elevated"
                padding="6"
                style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }} />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}>
                    Live Bookings
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                    color: '#22C55E',
                  }}>
                    LIVE
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
                  {liveBookings.length === 0 ? (
                    <div style={{
                      padding: '2rem',
                      textAlign: 'center',
                      color: darkMode ? '#737373' : '#A3A3A3',
                    }}>
                      <Activity size={48} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                      <p>Waiting for bookings...</p>
                    </div>
                  ) : (
                    liveBookings.map((booking, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.75rem',
                          background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F5F5F5',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          animation: 'slideIn 0.3s ease-out',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}>
                            {booking.customer.charAt(0)}
                          </div>
                          <div>
                            <div style={{ 
                              fontWeight: 600,
                              color: darkMode ? 'white' : '#1A1A1A',
                              fontSize: '0.9375rem',
                            }}>
                              {booking.customer}
                            </div>
                            <div style={{ 
                              fontSize: '0.8125rem',
                              color: darkMode ? '#A3A3A3' : '#737373',
                            }}>
                              {booking.service}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          fontWeight: 700,
                          color: '#22C55E',
                          fontSize: '1rem',
                        }}>
                          ${booking.amount}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
              
              {/* Active Users Counter */}
              <Card
                variant="elevated"
                padding="6"
                style={{
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(255, 66, 117, 0.15) 0%, rgba(119, 78, 175, 0.15) 100%)'
                    : 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  border: darkMode ? '1px solid rgba(255, 66, 117, 0.3)' : 'none',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Wifi size={20} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                      Active Now
                    </h3>
                  </div>
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                  }}>
                    {activeUsers.toLocaleString()}
                  </div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    opacity: 0.9,
                    marginBottom: '1.5rem',
                  }}>
                    users online right now
                  </div>
                  <div style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.875rem' }}>Peak Today</span>
                      <span style={{ fontWeight: 600 }}>2,856</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem' }}>Avg. This Week</span>
                      <span style={{ fontWeight: 600 }}>1,542</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}>
          {/* Recent Users */}
          <Card 
            variant="elevated" 
            padding="0"
            style={{
              background: darkMode 
                ? 'rgba(26, 26, 26, 0.8)'
                : 'white',
              border: darkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : 'none',
            }}
          >
            <div style={{ 
              padding: '1.5rem', 
              borderBottom: darkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid #E5E5E5' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  color: darkMode ? 'white' : '#1A1A1A',
                }}>
                  Recent Users
                </h2>
                <Button variant="outline" size="sm">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Manage All
                    <ChevronRight size={16} />
                  </div>
                </Button>
              </div>
            </div>
            <div>
              {recentUsers.map((user, index) => (
                <div
                  key={user.id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: index < recentUsers.length - 1 
                      ? darkMode 
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid #E5E5E5' 
                      : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = darkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontWeight: 600, 
                      marginBottom: '0.25rem',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}>
                      {user.name}
                    </h4>
                    <p style={{ 
                      color: darkMode ? '#A3A3A3' : '#737373', 
                      fontSize: '0.875rem' 
                    }}>
                      {user.email}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: darkMode
                        ? `${roleColors[user.role]}30`
                        : `${roleColors[user.role]}15`,
                      color: roleColors[user.role],
                      textTransform: 'capitalize',
                    }}>
                      {user.role}
                    </span>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: user.status === 'active' ? '#22C55E' : '#F59E0B',
                      boxShadow: user.status === 'active' 
                        ? '0 0 8px rgba(34, 197, 94, 0.5)' 
                        : '0 0 8px rgba(245, 158, 11, 0.5)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card 
            variant="elevated" 
            padding="6"
            style={{
              background: darkMode 
                ? 'rgba(26, 26, 26, 0.8)'
                : 'white',
              border: darkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : 'none',
            }}
          >
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              marginBottom: '1.5rem',
              color: darkMode ? 'white' : '#1A1A1A',
            }}>
              Platform Management
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <Button fullWidth style={{
                padding: '1.5rem',
                height: 'auto',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Users size={32} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.875rem' }}>Manage Users</div>
                </div>
              </Button>
              <Button fullWidth variant="secondary" style={{
                padding: '1.5rem',
                height: 'auto',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Sparkles size={32} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.875rem' }}>Services</div>
                </div>
              </Button>
              <Button fullWidth variant="accent" style={{
                padding: '1.5rem',
                height: 'auto',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <TrendingUp size={32} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.875rem' }}>Analytics</div>
                </div>
              </Button>
              <Button fullWidth variant="outline" style={{
                padding: '1.5rem',
                height: 'auto',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Settings size={32} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.875rem' }}>Settings</div>
                </div>
              </Button>
            </div>

            <div style={{
              padding: '1.5rem',
              background: darkMode
                ? 'linear-gradient(135deg, rgba(255, 66, 117, 0.2) 0%, rgba(119, 78, 175, 0.2) 100%)'
                : 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              borderRadius: '1rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '150px',
                height: '150px',
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: '100px',
                height: '100px',
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Activity size={20} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                    Platform Health
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>98.5%</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Uptime</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>2.3s</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Avg Response</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>1.2k</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Active Now</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Log */}
        <Card 
          variant="elevated" 
          padding="6" 
          style={{ 
            marginTop: '2rem',
            background: darkMode 
              ? 'rgba(26, 26, 26, 0.8)'
              : 'white',
            border: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600,
              color: darkMode ? 'white' : '#1A1A1A',
            }}>
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} />
                View All
              </div>
            </Button>
          </div>
          <div style={{
            minHeight: '200px',
            background: darkMode
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
              : 'linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 100%)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: darkMode ? '#737373' : '#737373',
            border: darkMode ? '1px dashed rgba(255, 255, 255, 0.1)' : '1px dashed #E5E5E5',
          }}>
            <div style={{ textAlign: 'center' }}>
              <Activity size={48} style={{ 
                marginBottom: '1rem',
                color: darkMode ? '#404040' : '#D4D4D4',
              }} />
              <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>Activity log will be displayed here</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>
                Track all platform activities and user actions
              </p>
            </div>
          </div>
        </Card>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem' 
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '0.5rem',
                }}>
                  User Management
                </h2>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                  Manage all platform users, providers, and beauticians
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowUserModal(true);
                  toast.success('Opening user creation form...');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(119, 78, 175, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                style={{ transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} />
                  Add User
                </div>
              </Button>
            </div>

            <Card 
              variant="elevated" 
              padding="6"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                  <Search 
                    size={18} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: darkMode ? '#737373' : '#A3A3A3',
                    }} 
                  />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      paddingLeft: '2.5rem',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Button 
                    variant="outline"
                    onClick={() => toast.success('Filter panel would open here', { icon: '🔍' })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <Filter size={18} />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => exportToCSV(recentUsers, 'users-export')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <Download size={18} />
                  </Button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #E5E5E5' 
                    }}>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>User</th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>Role</th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>Contact</th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>Joined</th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>Status</th>
                      <th style={{ 
                        textAlign: 'center', 
                        padding: '1rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr 
                        key={user.id}
                        style={{ 
                          borderBottom: index < recentUsers.length - 1 
                            ? darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F5F5F5'
                            : 'none',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = darkMode 
                            ? 'rgba(255, 255, 255, 0.02)' 
                            : 'rgba(0, 0, 0, 0.01)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div>
                            <div style={{ 
                              fontWeight: 600, 
                              color: darkMode ? 'white' : '#1A1A1A',
                              marginBottom: '0.25rem',
                            }}>
                              {user.name}
                            </div>
                            <div style={{ 
                              fontSize: '0.875rem', 
                              color: darkMode ? '#A3A3A3' : '#737373',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                            }}>
                              <Mail size={14} />
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: darkMode
                              ? `${roleColors[user.role]}30`
                              : `${roleColors[user.role]}15`,
                            color: roleColors[user.role],
                            textTransform: 'capitalize',
                          }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}>
                            <Phone size={14} />
                            {user.phone}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: darkMode ? '#A3A3A3' : '#737373' 
                          }}>
                            {user.joined}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: user.status === 'active' ? '#22C55E' : '#F59E0B',
                              boxShadow: user.status === 'active' 
                                ? '0 0 8px rgba(34, 197, 94, 0.5)' 
                                : '0 0 8px rgba(245, 158, 11, 0.5)',
                            }} />
                            <span style={{ 
                              fontSize: '0.875rem',
                              color: user.status === 'active' ? '#22C55E' : '#F59E0B',
                              textTransform: 'capitalize',
                              fontWeight: 600,
                            }}>
                              {user.status}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button 
                              onClick={() => handleUserAction(user.id, 'edit')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                                color: darkMode ? '#A3A3A3' : '#737373',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                              }}>
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleUserAction(user.id, 'edit')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 179, 71, 0.2)' : '#FEF3C7';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                                color: darkMode ? '#A3A3A3' : '#737373',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                              }}>
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleUserAction(user.id, 'delete')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 66, 117, 0.2)' : 'rgba(255, 66, 117, 0.2)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 66, 117, 0.1)' : 'rgba(255, 66, 117, 0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: darkMode ? 'rgba(255, 66, 117, 0.1)' : 'rgba(255, 66, 117, 0.1)',
                                color: '#FF4275',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                              }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem' 
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '0.5rem',
                }}>
                  Services Management
                </h2>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                  Manage all beauty services available on the platform
                </p>
              </div>
              <Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} />
                  Add Service
                </div>
              </Button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem',
            }}>
              {allServices.map((service) => (
                <Card
                  key={service.id}
                  variant="elevated"
                  padding="6"
                  style={{
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'start',
                    marginBottom: '1rem',
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: darkMode ? 'white' : '#1A1A1A',
                        marginBottom: '0.5rem',
                      }}>
                        {service.name}
                      </h3>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: darkMode ? 'rgba(119, 78, 175, 0.2)' : 'rgba(119, 78, 175, 0.1)',
                        color: '#774EAF',
                      }}>
                        {service.category}
                      </span>
                    </div>
                    <button style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      color: darkMode ? '#A3A3A3' : '#737373',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F5F5F5',
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        marginBottom: '0.25rem',
                      }}>
                        Price Range
                      </div>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}>
                        {service.price}
                      </div>
                    </div>
                    <div style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F5F5F5',
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: darkMode ? '#A3A3A3' : '#737373',
                        marginBottom: '0.25rem',
                      }}>
                        Providers
                      </div>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}>
                        {service.providers}
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Star size={16} style={{ color: '#FFB347', fill: '#FFB347' }} />
                      <span style={{ 
                        fontWeight: 600,
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}>
                        {service.rating}
                      </span>
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: darkMode ? '#A3A3A3' : '#737373',
                      }}>
                        ({service.bookings} bookings)
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleServiceEdit(service.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      style={{
                        transition: 'all 0.2s',
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem' 
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '0.5rem',
                }}>
                  Bookings Management
                </h2>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                  Track and manage all service bookings
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button 
                  variant="outline"
                  onClick={() => exportToCSV(allBookings, 'bookings-export')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{ transition: 'all 0.2s' }}
                >
                  <Download size={18} />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.success('Filter panel would open here', { icon: '🔍' })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{ transition: 'all 0.2s' }}
                >
                  <Filter size={18} />
                </Button>
              </div>
            </div>

            <Card 
              variant="elevated" 
              padding="6"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #E5E5E5' 
                    }}>
                      {['Booking ID', 'Customer', 'Service', 'Provider', 'Date & Time', 'Amount', 'Status', 'Actions'].map((header) => (
                        <th key={header} style={{ 
                          textAlign: 'left', 
                          padding: '1rem', 
                          color: darkMode ? '#A3A3A3' : '#737373',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map((booking, index) => (
                      <tr 
                        key={booking.id}
                        style={{ 
                          borderBottom: index < allBookings.length - 1 
                            ? darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F5F5F5'
                            : 'none',
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: darkMode ? 'white' : '#1A1A1A',
                          }}>
                            {booking.id}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {booking.customer}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontWeight: 500,
                          }}>
                            {booking.service}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {booking.provider}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontSize: '0.875rem',
                          }}>
                            {booking.date}
                          </div>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.75rem',
                          }}>
                            {booking.time}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: '#22C55E',
                          }}>
                            {booking.amount}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: booking.status === 'confirmed' 
                              ? darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
                              : booking.status === 'pending'
                              ? darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'
                              : darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                            color: booking.status === 'confirmed' 
                              ? '#22C55E'
                              : booking.status === 'pending'
                              ? '#F59E0B'
                              : '#3B82F6',
                            textTransform: 'capitalize',
                          }}>
                            {booking.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => handleBookingAction(booking.id, 'view')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                                color: darkMode ? '#A3A3A3' : '#737373',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}>
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleBookingAction(booking.id, 'edit')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 179, 71, 0.2)' : '#FEF3C7';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                                color: darkMode ? '#A3A3A3' : '#737373',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}>
                              <Edit size={16} />
                            </button>
                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                              <button 
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#FEE2E2';
                                  e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                                style={{
                                  padding: '0.5rem',
                                  borderRadius: '0.5rem',
                                  border: 'none',
                                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                              }}>
                                <XCircle size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem' 
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '0.5rem',
                }}>
                  Transaction History
                </h2>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                  Monitor all financial transactions on the platform
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button 
                  variant="outline"
                  onClick={() => toast.success('Refreshing transaction data...', { icon: '🔄' })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) rotate(180deg)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{ transition: 'all 0.3s' }}
                >
                  <RefreshCw size={18} />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => exportToCSV(allTransactions, 'transactions-export')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{ transition: 'all 0.2s' }}
                >
                  <Download size={18} />
                </Button>
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {[
                { label: 'Total Volume', value: '$284,592', icon: DollarSign, color: '#22C55E' },
                { label: 'Completed', value: '$268,420', icon: CheckCircle, color: '#22C55E' },
                { label: 'Pending', value: '$12,172', icon: Clock, color: '#F59E0B' },
                { label: 'Refunded', value: '$4,000', icon: RefreshCw, color: '#FF4275' },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    variant="elevated"
                    padding="4"
                    style={{
                      background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: darkMode 
                          ? `${stat.color}20`
                          : `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div style={{ 
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.25rem',
                        }}>
                          {stat.label}
                        </div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: darkMode ? 'white' : '#1A1A1A',
                        }}>
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card 
              variant="elevated" 
              padding="6"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #E5E5E5' 
                    }}>
                      {['Transaction ID', 'User', 'Amount', 'Type', 'Method', 'Status', 'Date', 'Actions'].map((header) => (
                        <th key={header} style={{ 
                          textAlign: 'left', 
                          padding: '1rem', 
                          color: darkMode ? '#A3A3A3' : '#737373',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id}
                        style={{ 
                          borderBottom: index < allTransactions.length - 1 
                            ? darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F5F5F5'
                            : 'none',
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: darkMode ? 'white' : '#1A1A1A',
                          }}>
                            {transaction.id}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {transaction.customer}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: transaction.type === 'booking' ? '#22C55E' : '#3B82F6',
                          }}>
                            {transaction.amount}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: transaction.type === 'booking'
                              ? darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
                              : darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                            color: transaction.type === 'booking' ? '#22C55E' : '#3B82F6',
                            textTransform: 'capitalize',
                          }}>
                            {transaction.type}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}>
                            <CreditCard size={14} />
                            {transaction.method}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: transaction.status === 'completed'
                              ? darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
                              : transaction.status === 'pending'
                              ? darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'
                              : darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                            color: transaction.status === 'completed'
                              ? '#22C55E'
                              : transaction.status === 'pending'
                              ? '#F59E0B'
                              : '#3B82F6',
                            textTransform: 'capitalize',
                          }}>
                            {transaction.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {transaction.date}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button 
                            onClick={() => handleTransactionAction(transaction.id, 'view')}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '0.5rem',
                              border: 'none',
                              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                              color: darkMode ? '#A3A3A3' : '#737373',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}>
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
                marginBottom: '0.5rem',
              }}>
                Platform Analytics
              </h2>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                Comprehensive insights and performance metrics
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {[
                { title: 'Revenue Growth', value: '+32.5%', subtitle: 'vs last month', icon: TrendingUp, color: '#22C55E' },
                { title: 'Customer Retention', value: '87.3%', subtitle: 'Active users', icon: Users, color: '#3B82F6' },
                { title: 'Avg Booking Value', value: '$142', subtitle: '+$12 increase', icon: DollarSign, color: '#FFB347' },
                { title: 'Provider Rating', value: '4.8', subtitle: 'Platform average', icon: Star, color: '#FF4275' },
              ].map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card
                    key={index}
                    variant="elevated"
                    padding="6"
                    style={{
                      background: darkMode 
                        ? `linear-gradient(135deg, ${metric.color}15 0%, rgba(26, 26, 26, 0.8) 100%)`
                        : 'white',
                      border: darkMode ? `1px solid ${metric.color}30` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.5rem',
                        }}>
                          {metric.title}
                        </div>
                        <div style={{
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: darkMode ? 'white' : metric.color,
                          marginBottom: '0.25rem',
                        }}>
                          {metric.value}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                        }}>
                          {metric.subtitle}
                        </div>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: darkMode ? `${metric.color}20` : `${metric.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: metric.color,
                      }}>
                        <IconComponent size={24} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <Card
                variant="elevated"
                padding="6"
                style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '1.5rem',
                }}>
                  Revenue Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4275" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF4275" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#E5E5E5'} 
                    />
                    <XAxis 
                      dataKey="month" 
                      stroke={darkMode ? '#737373' : '#A3A3A3'}
                      style={{ fontSize: '0.75rem' }}
                    />
                    <YAxis 
                      stroke={darkMode ? '#737373' : '#A3A3A3'}
                      style={{ fontSize: '0.75rem' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: darkMode ? '#1A1A1A' : 'white',
                        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                        borderRadius: '0.5rem',
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#FF4275" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card
                variant="elevated"
                padding="6"
                style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '1.5rem',
                }}>
                  Top Categories
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPie>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: darkMode ? '#1A1A1A' : 'white',
                        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
                        borderRadius: '0.5rem',
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {[
                    { name: 'Hair', percentage: 38, color: '#FF4275' },
                    { name: 'Skincare', percentage: 27, color: '#774EAF' },
                    { name: 'Nails', percentage: 21, color: '#FFB347' },
                    { name: 'Makeup', percentage: 14, color: '#22C55E' },
                  ].map((category) => (
                    <div key={category.name}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}>
                        <span style={{ 
                          fontSize: '0.875rem',
                          color: darkMode ? 'white' : '#1A1A1A',
                          fontWeight: 500,
                        }}>
                          {category.name}
                        </span>
                        <span style={{ 
                          fontSize: '0.875rem',
                          color: category.color,
                          fontWeight: 600,
                        }}>
                          {category.percentage}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '4px',
                        background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${category.percentage}%`,
                          height: '100%',
                          background: category.color,
                          borderRadius: '4px',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
                marginBottom: '0.5rem',
              }}>
                Platform Settings
              </h2>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                Configure platform preferences and system settings
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                {
                  title: 'General Settings',
                  icon: Settings,
                  items: [
                    { label: 'Platform Name', value: 'Zoo Beauty Palace' },
                    { label: 'Support Email', value: 'support@zoobeauty.com' },
                    { label: 'Platform Currency', value: 'USD ($)' },
                    { label: 'Time Zone', value: 'UTC-5 (EST)' },
                  ]
                },
                {
                  title: 'Commission Settings',
                  icon: DollarSign,
                  items: [
                    { label: 'Platform Commission', value: '15%' },
                    { label: 'Payment Processing Fee', value: '2.9% + $0.30' },
                    { label: 'Minimum Payout', value: '$50.00' },
                    { label: 'Payout Schedule', value: 'Weekly' },
                  ]
                },
                {
                  title: 'Security & Privacy',
                  icon: Shield,
                  items: [
                    { label: 'Two-Factor Authentication', value: 'Enabled' },
                    { label: 'Session Timeout', value: '30 minutes' },
                    { label: 'Password Policy', value: 'Strong' },
                    { label: 'Data Retention', value: '90 days' },
                  ]
                },
                {
                  title: 'Notifications',
                  icon: Bell,
                  items: [
                    { label: 'Email Notifications', value: 'Enabled' },
                    { label: 'SMS Alerts', value: 'Enabled' },
                    { label: 'Push Notifications', value: 'Enabled' },
                    { label: 'Admin Alerts', value: 'Enabled' },
                  ]
                },
              ].map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <Card
                    key={index}
                    variant="elevated"
                    padding="6"
                    style={{
                      background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: darkMode 
                          ? 'rgba(255, 66, 117, 0.2)'
                          : 'rgba(255, 66, 117, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FF4275',
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: darkMode ? 'white' : '#1A1A1A',
                      }}>
                        {section.title}
                      </h3>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            background: darkMode 
                              ? 'rgba(255, 255, 255, 0.03)'
                              : '#F5F5F5',
                          }}
                        >
                          <span style={{
                            fontSize: '0.875rem',
                            color: darkMode ? '#A3A3A3' : '#737373',
                          }}>
                            {item.label}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: darkMode ? 'white' : '#1A1A1A',
                            }}>
                              {item.value}
                            </span>
                            <Button variant="ghost" size="sm">
                              <Edit size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}

              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                justifyContent: 'flex-end',
                paddingTop: '1rem',
              }}>
                <Button variant="outline">
                  Reset to Defaults
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === 'marketing' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
                marginBottom: '0.5rem',
              }}>
                Marketing & Promotions
              </h2>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                Manage promo codes, campaigns, and marketing activities
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Promo Codes */}
              <Card
                variant="elevated"
                padding="6"
                style={{
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}>
                    Active Promo Codes
                  </h3>
                  <Button 
                    onClick={() => {
                      setShowPromoModal(true);
                      createPromoCode();
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(119, 78, 175, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={18} />
                      Create Code
                    </div>
                  </Button>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {promoCodes.map((promo) => (
                    <div
                      key={promo.code}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F5F5F5',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.25rem',
                        }}>
                          Code
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#FF4275',
                          fontFamily: 'monospace',
                        }}>
                          {promo.code}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.25rem',
                        }}>
                          Discount
                        </div>
                        <div style={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: darkMode ? 'white' : '#1A1A1A',
                        }}>
                          {promo.discount}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.25rem',
                        }}>
                          Usage
                        </div>
                        <div style={{
                          fontSize: '0.9375rem',
                          color: darkMode ? 'white' : '#1A1A1A',
                        }}>
                          {promo.uses} / {promo.limit}
                        </div>
                        <div style={{
                          width: '100%',
                          height: '4px',
                          borderRadius: '2px',
                          background: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#E5E5E5',
                          marginTop: '0.5rem',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${(promo.uses / promo.limit) * 100}%`,
                            height: '100%',
                            background: '#FF4275',
                            borderRadius: '2px',
                          }} />
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#A3A3A3' : '#737373',
                          marginBottom: '0.25rem',
                        }}>
                          Expires
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: darkMode ? 'white' : '#1A1A1A',
                        }}>
                          {promo.expires}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(promo.code);
                            toast.success('Code copied to clipboard!', { icon: '📋' });
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5',
                            color: darkMode ? 'white' : '#1A1A1A',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}>
                          <Copy size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setShowPromoModal(true);
                            toast.success('Opening promo editor...');
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(255, 179, 71, 0.2)' : '#FEF3C7';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#E5E5E5',
                            color: darkMode ? 'white' : '#1A1A1A',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}>
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Campaign Performance */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Email Open Rate', value: '42.3%', icon: Mail, color: '#3B82F6' },
                  { label: 'Click Through Rate', value: '18.7%', icon: Target, color: '#FF4275' },
                  { label: 'Conversion Rate', value: '8.2%', icon: TrendingUp, color: '#22C55E' },
                ].map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card
                      key={index}
                      variant="elevated"
                      padding="4"
                      style={{
                        background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                        border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: darkMode ? `${metric.color}20` : `${metric.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: metric.color,
                        }}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: darkMode ? '#A3A3A3' : '#737373',
                            marginBottom: '0.25rem',
                          }}>
                            {metric.label}
                          </div>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: darkMode ? 'white' : '#1A1A1A',
                          }}>
                            {metric.value}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '0.5rem',
                }}>
                  Support Tickets
                </h2>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                  Manage customer support requests and issues
                </p>
              </div>
              <Button 
                onClick={() => {
                  setShowTicketModal(true);
                  toast.success('Opening new ticket form...');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(119, 78, 175, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                style={{ transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} />
                  New Ticket
                </div>
              </Button>
            </div>

            <Card
              variant="elevated"
              padding="6"
              style={{
                background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #E5E5E5' 
                    }}>
                      {['Ticket ID', 'Customer', 'Subject', 'Priority', 'Status', 'Created', 'Actions'].map((header) => (
                        <th key={header} style={{ 
                          textAlign: 'left', 
                          padding: '1rem', 
                          color: darkMode ? '#A3A3A3' : '#737373',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr 
                        key={ticket.id}
                        style={{ 
                          borderBottom: index < tickets.length - 1 
                            ? darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #F5F5F5'
                            : 'none',
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: darkMode ? 'white' : '#1A1A1A',
                          }}>
                            {ticket.id}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {ticket.customer}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? 'white' : '#1A1A1A',
                            fontWeight: 500,
                          }}>
                            {ticket.subject}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: ticket.priority === 'high'
                              ? darkMode ? 'rgba(255, 66, 117, 0.2)' : 'rgba(255, 66, 117, 0.1)'
                              : ticket.priority === 'medium'
                              ? darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'
                              : darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                            color: ticket.priority === 'high' ? '#FF4275' : ticket.priority === 'medium' ? '#F59E0B' : '#3B82F6',
                            textTransform: 'uppercase',
                          }}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.875rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: ticket.status === 'resolved'
                              ? darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
                              : ticket.status === 'in-progress'
                              ? darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'
                              : darkMode ? 'rgba(255, 66, 117, 0.2)' : 'rgba(255, 66, 117, 0.1)',
                            color: ticket.status === 'resolved' ? '#22C55E' : ticket.status === 'in-progress' ? '#F59E0B' : '#FF4275',
                            textTransform: 'capitalize',
                          }}>
                            {ticket.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ 
                            color: darkMode ? '#A3A3A3' : '#737373',
                            fontSize: '0.875rem',
                          }}>
                            {ticket.created}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => assignTicket(ticket.id)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{ transition: 'all 0.2s' }}
                            >
                              <UserCheck size={16} />
                            </Button>
                            {ticket.status !== 'resolved' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => resolveTicket(ticket.id)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = darkMode ? 'rgba(34, 197, 94, 0.2)' : '#D1FAE5';
                                  e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                                style={{ transition: 'all 0.2s' }}
                              >
                                <CheckCircle size={16} />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast.success('Opening ticket details...')}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = darkMode ? 'rgba(119, 78, 175, 0.2)' : '#EDE9FE';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              style={{ transition: 'all 0.2s' }}
                            >
                              <Eye size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
                marginBottom: '0.5rem',
              }}>
                Custom Reports
              </h2>
              <p style={{ color: darkMode ? '#A3A3A3' : '#737373' }}>
                Generate and download custom reports
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Revenue Report', description: 'Complete financial breakdown', icon: DollarSign, color: '#22C55E' },
                { title: 'User Analytics', description: 'User behavior and demographics', icon: Users, color: '#3B82F6' },
                { title: 'Booking Report', description: 'All bookings and trends', icon: Calendar, color: '#774EAF' },
                { title: 'Provider Performance', description: 'Provider ratings and earnings', icon: Store, color: '#FFB347' },
                { title: 'Marketing ROI', description: 'Campaign performance metrics', icon: Target, color: '#FF4275' },
                { title: 'Compliance Report', description: 'Regulatory and legal data', icon: Shield, color: '#1A1A1A' },
              ].map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <Card
                    key={index}
                    variant="elevated"
                    padding="6"
                    style={{
                      background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'white',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: darkMode ? `${report.color}20` : `${report.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: report.color,
                      marginBottom: '1rem',
                    }}>
                      <IconComponent size={28} />
                    </div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: darkMode ? 'white' : '#1A1A1A',
                      marginBottom: '0.5rem',
                    }}>
                      {report.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#A3A3A3' : '#737373',
                      marginBottom: '1.5rem',
                    }}>
                      {report.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Button 
                        fullWidth
                        onClick={() => toast.success('Report generated!', { icon: '📊' })}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        style={{ transition: 'all 0.2s' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FileText size={16} />
                          Generate
                        </div>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => toast.success('Report downloaded!', { icon: '💾' })}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{ transition: 'all 0.2s' }}
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
      
      {/* User Management Modal */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }} onClick={() => setShowUserModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              variant="elevated"
              padding={6}
              style={{
                maxWidth: '600px',
                width: '100%',
                background: darkMode ? '#1A1A1A' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
              }}>
                Add New User
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#A3A3A3' : '#737373',
                  padding: '0.5rem',
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Full Name *
                </label>
                <Input
                  placeholder="Enter full name"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Phone Number
                </label>
                <Input
                  placeholder="+1 234 567 8900"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Role
                </label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                  }}
                >
                  <option value="customer">Customer</option>
                  <option value="provider">Provider</option>
                  <option value="beautician">Beautician</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Status
                </label>
                <select
                  value={userFormData.status}
                  onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                  }}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={handleSaveUser}
                  style={{
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <UserCheck size={18} />
                    Save User
                  </div>
                </Button>
              </div>
            </div>
          </Card>
          </div>
        </div>
      )}
      
      {/* Service Edit Modal */
      {showServiceModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }} onClick={() => setShowServiceModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              variant="elevated"
              padding={6}
              style={{
                maxWidth: '600px',
                width: '100%',
                background: darkMode ? '#1A1A1A' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
              }}>
                Edit Service
              </h2>
              <button
                onClick={() => setShowServiceModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#A3A3A3' : '#737373',
                  padding: '0.5rem',
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Service Name *
                </label>
                <Input
                  placeholder="e.g., Hair Styling"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Category *
                </label>
                <select
                  value={serviceFormData.category}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select category</option>
                  <option value="Hair">Hair</option>
                  <option value="Nails">Nails</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Wellness">Wellness</option>
                </select>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: darkMode ? '#A3A3A3' : '#737373',
                    marginBottom: '0.5rem',
                  }}>
                    Min Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="45"
                    value={serviceFormData.priceMin}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, priceMin: e.target.value })}
                    style={{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: darkMode ? '#A3A3A3' : '#737373',
                    marginBottom: '0.5rem',
                  }}>
                    Max Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="120"
                    value={serviceFormData.priceMax}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, priceMax: e.target.value })}
                    style={{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe the service..."
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowServiceModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={handleSaveService}
                  style={{
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <Sparkles size={18} />
                    Save Service
                  </div>
                </Button>
              </div>
            </div>
          </Card>
          </div>
        </div>
      )}
      
      {/* Booking Details Modal */
      {showBookingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }} onClick={() => setShowBookingModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              variant="elevated"
              padding={6}
              style={{
                maxWidth: '700px',
                width: '100%',
                background: darkMode ? '#1A1A1A' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
              }}>
                Booking Details
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#A3A3A3' : '#737373',
                  padding: '0.5rem',
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#F5F5F5',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Booking ID
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      BK-1001
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Status
                    </div>
                    <span style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                      color: '#22C55E',
                    }}>
                      Confirmed
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Customer
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      Sarah Johnson
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Service
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      Hair Styling
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Provider
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      Glamour Studio
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Amount
                    </div>
                    <div style={{ fontWeight: 700, color: '#22C55E', fontSize: '1.25rem' }}>
                      $85.00
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Date
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      December 26, 2024
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem' }}>
                      Time
                    </div>
                    <div style={{ fontWeight: 600, color: darkMode ? 'white' : '#1A1A1A' }}>
                      10:00 AM
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: darkMode ? 'white' : '#1A1A1A',
                  marginBottom: '1rem',
                }}>
                  Actions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success('Sending confirmation email...');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <Mail size={16} />
                      Email Customer
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success('Opening edit mode...');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <Edit size={16} />
                      Edit Booking
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm('Cancel this booking?')) {
                        toast.success('Booking cancelled', { icon: '❌' });
                        setShowBookingModal(false);
                      }
                    }}
                    style={{
                      color: '#EF4444',
                      borderColor: '#EF4444',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <XCircle size={16} />
                      Cancel Booking
                    </div>
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success('Processing refund...', { icon: '💰' });
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <DollarSign size={16} />
                      Process Refund
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          </div>
        </div>
      )}
      
      {/* Promo Code Modal */
      {showPromoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }} onClick={() => setShowPromoModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              variant="elevated"
              padding={6}
              style={{
                maxWidth: '600px',
                width: '100%',
                background: darkMode ? '#1A1A1A' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
              }}>
                Create Promo Code
              </h2>
              <button
                onClick={() => setShowPromoModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#A3A3A3' : '#737373',
                  padding: '0.5rem',
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Promo Code *
                </label>
                <Input
                  placeholder="SUMMER2024"
                  value={promoFormData.code}
                  onChange={(e) => setPromoFormData({ ...promoFormData, code: e.target.value.toUpperCase() })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Discount *
                </label>
                <Input
                  placeholder="20% or $10"
                  value={promoFormData.discount}
                  onChange={(e) => setPromoFormData({ ...promoFormData, discount: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: darkMode ? '#A3A3A3' : '#737373',
                    marginBottom: '0.5rem',
                  }}>
                    Usage Limit
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={promoFormData.limit}
                    onChange={(e) => setPromoFormData({ ...promoFormData, limit: e.target.value })}
                    style={{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: darkMode ? '#A3A3A3' : '#737373',
                    marginBottom: '0.5rem',
                  }}>
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={promoFormData.expires}
                    onChange={(e) => setPromoFormData({ ...promoFormData, expires: e.target.value })}
                    style={{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                      color: darkMode ? 'white' : '#1A1A1A',
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowPromoModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={handleCreatePromo}
                  style={{
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <Gift size={18} />
                    Create Code
                  </div>
                </Button>
              </div>
            </div>
          </Card>
          </div>
        </div>
      )}
      
      {/* Support Ticket Modal */
      {showTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }} onClick={() => setShowTicketModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              variant="elevated"
              padding={6}
              style={{
                maxWidth: '600px',
                width: '100%',
                background: darkMode ? '#1A1A1A' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: darkMode ? 'white' : '#1A1A1A',
              }}>
                Create Support Ticket
              </h2>
              <button
                onClick={() => setShowTicketModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#A3A3A3' : '#737373',
                  padding: '0.5rem',
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Customer Name
                </label>
                <Input
                  placeholder="Enter customer name"
                  value={ticketFormData.customer}
                  onChange={(e) => setTicketFormData({ ...ticketFormData, customer: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Subject *
                </label>
                <Input
                  placeholder="Brief description of the issue"
                  value={ticketFormData.subject}
                  onChange={(e) => setTicketFormData({ ...ticketFormData, subject: e.target.value })}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Priority
                </label>
                <select
                  value={ticketFormData.priority}
                  onChange={(e) => setTicketFormData({ ...ticketFormData, priority: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: darkMode ? '#A3A3A3' : '#737373',
                  marginBottom: '0.5rem',
                }}>
                  Description *
                </label>
                <textarea
                  placeholder="Detailed description of the issue..."
                  value={ticketFormData.description}
                  onChange={(e) => setTicketFormData({ ...ticketFormData, description: e.target.value })}
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#F5F5F5',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E5E5E5',
                    color: darkMode ? 'white' : '#1A1A1A',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowTicketModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={handleCreateTicket}
                  style={{
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <MessageSquare size={18} />
                    Create Ticket
                  </div>
                </Button>
              </div>
            </div>
          </Card>
          </div>
        </div>
      )}
      
      {/* CSS Animations */
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
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
      `}</style>
    </div>
  );
}
