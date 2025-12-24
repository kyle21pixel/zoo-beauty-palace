# UI Component Library - Zoo Beauty Palace

## 🎨 New Components Created

### 1. **Toast Notification System** (`ToastContext.jsx`)
Elegant toast notifications with auto-dismiss and smooth animations.

**Usage:**
```jsx
import { useToast } from './context/ToastContext';

const Component = () => {
  const toast = useToast();
  
  toast.success('Booking confirmed!');
  toast.error('Payment failed');
  toast.warning('Session expiring soon');
  toast.info('New message received');
};
```

**Features:**
- 4 variants: success, error, warning, info
- Auto-dismiss with customizable duration
- Smooth slide-in animations
- Gradient backgrounds
- Close button
- Fixed top-right positioning

---

### 2. **Loading Skeletons** (`Skeleton.jsx`)
Shimmer loading states for better perceived performance.

**Components:**
- `<Skeleton />` - Basic skeleton with customizable size
- `<SkeletonCard />` - Card-shaped skeleton
- `<SkeletonStat />` - Statistics card skeleton
- `<SkeletonList />` - Multiple card skeletons
- `<SkeletonTable />` - Table skeleton with rows/columns

**Usage:**
```jsx
import { Skeleton, SkeletonCard, SkeletonList } from './components/Skeleton';

{loading ? <SkeletonList count={3} /> : <BookingList />}
```

---

### 3. **Modal & Confirmation Dialogs** (`Modal.jsx`)
Accessible modal dialogs with backdrop blur and smooth animations.

**Components:**
- `<Modal />` - Base modal with header, body, footer
- `<ConfirmModal />` - Pre-built confirmation dialog

**Usage:**
```jsx
import { Modal, ConfirmModal } from './components/Modal';

// Basic Modal
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Edit Profile"
  footer={<button>Save</button>}
>
  <FormContent />
</Modal>

// Confirm Modal
<ConfirmModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Delete Booking"
  message="Are you sure? This cannot be undone."
  type="danger"
/>
```

---

### 4. **Avatar Components** (`Avatar.jsx`)
Professional avatar with initials fallback and status indicators.

**Components:**
- `<Avatar />` - Single avatar
- `<AvatarGroup />` - Overlapping avatar stack

**Props:**
- `size`: xs, sm, md, lg, xl
- `shape`: circle, rounded, square
- `status`: online, offline, busy, away
- `src`: Image URL
- `name`: For initials fallback

**Usage:**
```jsx
import { Avatar, AvatarGroup } from './components/Avatar';

<Avatar 
  name="John Doe" 
  size="lg" 
  status="online" 
/>

<AvatarGroup 
  avatars={users} 
  max={3} 
/>
```

---

### 5. **Badge Components** (`Badge.jsx`)
Colored badges for status and labels.

**Components:**
- `<Badge />` - Generic badge
- `<StatusBadge />` - Pre-styled status badges
- `<CountBadge />` - Notification counter

**Usage:**
```jsx
import { Badge, StatusBadge, CountBadge } from './components/Badge';

<Badge variant="success" icon="✓">Verified</Badge>
<StatusBadge status="confirmed" />
<CountBadge count={5} />
```

**Status Values:**
- pending, confirmed, in-progress, completed, cancelled
- paid, unpaid, refunded

---

### 6. **Empty State Components** (`EmptyState.jsx`)
Friendly empty states with actions.

**Components:**
- `<EmptyState />` - Generic empty state
- `<ErrorState />` - Error state with retry
- `<LoadingState />` - Centered loading spinner

**Usage:**
```jsx
import { EmptyState, ErrorState } from './components/EmptyState';

<EmptyState
  icon="📭"
  title="No bookings yet"
  description="Start booking services now"
  action={handleBrowse}
  actionLabel="Browse Services"
/>

<ErrorState
  title="Failed to load"
  onRetry={refetch}
/>
```

---

### 7. **Form Input Components** (`FormInputs.jsx`)
Fully styled form inputs with validation states.

**Components:**
- `<Input />` - Text input with icon support
- `<TextArea />` - Multi-line text input
- `<Select />` - Dropdown select
- `<Checkbox />` - Styled checkbox

**Features:**
- Real-time validation states
- Focus animations
- Helper text support
- Required field indicators
- Icon support (Input only)
- Disabled states

**Usage:**
```jsx
import { Input, TextArea, Select, Checkbox } from './components/FormInputs';

<Input
  label="Email"
  type="email"
  icon="📧"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>

<Select
  label="Category"
  options={[
    { value: 'hair', label: 'Hair Services' },
    { value: 'nails', label: 'Nail Care' }
  ]}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>
```

---

### 8. **Enhanced BookingCard** (`BookingCard.jsx`)
Complete redesign with luxury styling.

**New Features:**
- Status badges instead of colored text
- Avatar with online status
- Confirmation modal for cancellations
- Color-coded accent bar
- Hover animations
- Responsive grid layout
- Better action buttons

---

### 9. **Enhanced ServiceCard** (`ServiceCard.jsx`)
Modern service cards with better UX.

**New Features:**
- Gradient accent bar
- Popular badge
- Better hover effects
- Animated CTA button
- Rating display
- Category badges
- Truncated descriptions

---

## 🎯 Implementation Guide

### Step 1: Add ToastProvider to App
```jsx
import { ToastProvider } from './context/ToastContext';

<ToastProvider>
  <App />
</ToastProvider>
```

### Step 2: Use Components in Pages
```jsx
// In any component
import { useToast } from './context/ToastContext';
import { SkeletonList } from './components/Skeleton';
import { EmptyState } from './components/EmptyState';

const MyComponent = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const handleAction = async () => {
    try {
      await api.doSomething();
      toast.success('Success!');
    } catch (error) {
      toast.error('Failed!');
    }
  };
  
  if (loading) return <SkeletonList count={3} />;
  if (!data.length) return <EmptyState title="No data" />;
  
  return <DataList data={data} />;
};
```

---

## 🎨 Design System

All components use CSS variables from `App.css`:

### Colors
- `--primary-color`: Deep Royal Purple #5A2D82
- `--secondary-color`: Soft Blush Pink #F1C0E8
- `--accent-color`: Gold #FF9F1C
- `--text-primary`: Dark text
- `--text-secondary`: Muted text
- `--surface`: Card backgrounds
- `--background`: Page backgrounds
- `--border-color`: Borders

### Spacing
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 24px
- `--spacing-2xl`: 32px
- `--spacing-3xl`: 48px

### Border Radius
- `--radius-sm`: 6px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px

### Typography
- `--font-heading`: 'Playfair Display', serif
- `--font-body`: 'Inter', sans-serif

---

## 📱 Component Showcase

Visit `/showcase` to see all components in action (add route to App.jsx):

```jsx
import ComponentShowcase from './pages/ComponentShowcase';

<Route path="/showcase" element={<ComponentShowcase />} />
```

---

## ✨ Best Practices

1. **Always use CSS variables** for colors/spacing
2. **Wrap async operations** with try/catch and toast notifications
3. **Show loading states** with skeletons, not spinners
4. **Use empty states** instead of blank screens
5. **Confirm destructive actions** with ConfirmModal
6. **Validate forms** with error states on inputs
7. **Show status** with StatusBadge components
8. **Use avatars** for user representation

---

## 🚀 Next Steps

**Recommended implementations:**
1. Add route for `/showcase` to test components
2. Replace old loading spinners with Skeleton components
3. Add toast notifications to all API calls
4. Use EmptyState in dashboard sections
5. Add ConfirmModal to all delete/cancel actions
6. Update forms to use new Input components
7. Add Avatar to user menus and profiles

---

## 📦 Component Checklist

- ✅ Toast Notifications
- ✅ Loading Skeletons
- ✅ Modal Dialogs
- ✅ Avatar Components
- ✅ Badge Components
- ✅ Empty States
- ✅ Form Inputs
- ✅ Enhanced BookingCard
- ✅ Enhanced ServiceCard

**Total:** 9 new component systems created!
