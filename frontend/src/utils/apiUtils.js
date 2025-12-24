// frontend/src/utils/apiUtils.js
export const handleApiCall = async (apiFunction, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);
    const response = await apiFunction();
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getServiceCategoryName = (category) => {
  const categoryNames = {
    'wig-installation': 'Wig Installation',
    'braiding': 'Braiding',
    'barbering': 'Barbering',
    'nails': 'Nails',
    'massage': 'Massage',
    'tattooing': 'Tattooing',
  };
  return categoryNames[category] || category;
};

export const getServiceCategoryColor = (category) => {
  const categoryColors = {
    'hair': '#FF9F1C',
    'wig-installation': '#FF9F1C',
    'braiding': '#FF9F1C',
    'barber': '#3B82F6',
    'barbering': '#3B82F6',
    'nails': '#EC4899',
    'massage': '#10B981',
    'tattoo': '#6366F1',
    'tattooing': '#6366F1',
  };
  return categoryColors[category] || '#8B5CF6';
};

export const getUserRoleColor = (role) => {
  const roleColors = {
    'admin': '#5A2D82',      // Purple
    'provider': '#FF6B6B',   // Red
    'beautician': '#4ECDC4', // Teal
    'client': '#45B7D1',     // Blue
  };
  return roleColors[role] || '#5A2D82';
};