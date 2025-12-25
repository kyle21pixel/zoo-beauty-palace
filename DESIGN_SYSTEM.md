# 🎨 Design System Documentation

## Color Palette

### Primary - Soft Rose / Blush Pink
Used for primary actions, links, and brand elements.

```
50:  #FFF5F7
100: #FFE3E8
200: #FFC7D1
300: #FF9BB0
400: #FF6E8F
500: #FF4275  ← Main
600: #E63B69
700: #CC2D5A
800: #B3214B
900: #99153C
```

### Secondary - Deep Plum / Royal Purple
Used for secondary actions and complementary elements.

```
50:  #F5F3F7
100: #E8E1EF
200: #D1C3DF
300: #B39CCF
400: #9575BF
500: #774EAF  ← Main
600: #6A459D
700: #5C3B8B
800: #4F3279
900: #412867
```

### Accent - Gold / Champagne
Used for highlights, success states, and premium features.

```
50:  #FFFBF5
100: #FFF4E0
200: #FFE8C2
300: #FFD699
400: #FFC470
500: #FFB347  ← Main
600: #E6A13F
700: #CC8F37
800: #B37D2F
900: #996B27
```

### Neutrals
```
Ivory:    #FAF8F6
50:       #FAFAFA
100:      #F5F5F5
200:      #E5E5E5
300:      #D4D4D4
400:      #A3A3A3
500:      #737373
600:      #525252
700:      #404040
800:      #262626
Charcoal: #1A1A1A
900:      #0A0A0A
```

## Typography

### Font Families
- **Headings**: Playfair Display (serif) - Elegant and luxurious
- **Body**: Inter (sans-serif) - Clean and readable
- **Mono**: JetBrains Mono - For code and technical content

### Font Sizes
```typescript
xs:   0.75rem   (12px)
sm:   0.875rem  (14px)
base: 1rem      (16px)
lg:   1.125rem  (18px)
xl:   1.25rem   (20px)
2xl:  1.5rem    (24px)
3xl:  1.875rem  (30px)
4xl:  2.25rem   (36px)
5xl:  3rem      (48px)
6xl:  3.75rem   (60px)
```

### Font Weights
```typescript
light:     300
normal:    400
medium:    500
semibold:  600
bold:      700
extrabold: 800
```

## Components

### Button

**Variants:**
- `primary` - Main actions (gradient rose)
- `secondary` - Secondary actions (gradient purple)
- `accent` - Special actions (gradient gold)
- `outline` - Tertiary actions (outlined)
- `ghost` - Subtle actions (transparent)

**Sizes:**
- `sm` - 36px height
- `md` - 44px height (default)
- `lg` - 52px height

**Usage:**
```tsx
import { Button } from '@zoo/ui';

<Button variant="primary" size="lg" fullWidth>
  Book Now
</Button>

<Button 
  variant="secondary" 
  leftIcon={<span>✨</span>}
  onClick={handleClick}
>
  View Details
</Button>

<Button variant="outline" loading>
  Processing...
</Button>
```

### Card

**Variants:**
- `default` - Standard white card
- `glass` - Glassmorphism effect
- `elevated` - Card with strong shadow
- `outlined` - Bordered card

**Usage:**
```tsx
import { Card } from '@zoo/ui';

<Card variant="glass" padding="6" hoverable>
  <h3>Service Name</h3>
  <p>Description here</p>
</Card>

<Card 
  variant="elevated" 
  onClick={handleClick}
>
  Clickable card content
</Card>
```

### Input

**Features:**
- Label support
- Error states
- Helper text
- Left/right icons
- Full width option

**Usage:**
```tsx
import { Input } from '@zoo/ui';

<Input
  label="Email Address"
  placeholder="Enter your email"
  leftIcon={<span>📧</span>}
  fullWidth
/>

<Input
  label="Password"
  type="password"
  error="Password is required"
  rightIcon={<span>👁️</span>}
/>

<Input
  placeholder="Search services..."
  helperText="Try 'hair' or 'makeup'"
/>
```

## Gradients

### Primary Gradient
```css
linear-gradient(135deg, #FF6E8F 0%, #E63B69 100%)
```

### Secondary Gradient
```css
linear-gradient(135deg, #9575BF 0%, #6A459D 100%)
```

### Accent Gradient
```css
linear-gradient(135deg, #FFC470 0%, #E6A13F 100%)
```

### Premium Gradient
```css
linear-gradient(135deg, #5C3B8B 0%, #FF4275 100%)
```

### Sunset Gradient (Multi-color)
```css
linear-gradient(135deg, #FF6E8F 0%, #774EAF 50%, #FFB347 100%)
```

## Shadows

```typescript
sm:    '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
base:  '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
md:    '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
lg:    '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
xl:    '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
2xl:   '0 25px 50px -12px rgba(0, 0, 0, 0.25)'

// Special effects
glass: '0 8px 32px 0 rgba(255, 66, 117, 0.15)'
```

## Border Radius

```typescript
sm:   0.25rem  (4px)
base: 0.5rem   (8px)
md:   0.75rem  (12px)
lg:   1rem     (16px)
xl:   1.5rem   (24px)
2xl:  2rem     (32px)
full: 9999px   (circle)
```

## Spacing

```typescript
0:  0
1:  0.25rem  (4px)
2:  0.5rem   (8px)
3:  0.75rem  (12px)
4:  1rem     (16px)
5:  1.25rem  (20px)
6:  1.5rem   (24px)
8:  2rem     (32px)
10: 2.5rem   (40px)
12: 3rem     (48px)
16: 4rem     (64px)
20: 5rem     (80px)
24: 6rem     (96px)
```

## Breakpoints

```typescript
xs:  320px   // Small phones
sm:  640px   // Large phones
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large screens
```

## Animations

### Keyframes

**Spin:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

### Transitions

```typescript
fast:   '150ms cubic-bezier(0.4, 0, 0.2, 1)'
base:   '300ms cubic-bezier(0.4, 0, 0.2, 1)'
slow:   '500ms cubic-bezier(0.4, 0, 0.2, 1)'
bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
```

## Design Principles

### 1. Luxury & Elegance
- Use soft gradients
- Rounded corners (12px+)
- Generous spacing
- Glassmorphism effects

### 2. Visual Hierarchy
- Clear heading/body distinction
- Bold primary actions
- Subtle secondary elements
- Consistent spacing rhythm

### 3. Micro-interactions
- Hover states on all clickable elements
- Smooth transitions (300ms)
- Loading states with animations
- Success/error feedback

### 4. Responsiveness
- Mobile-first approach
- Fluid typography
- Flexible grids
- Touch-friendly targets (44px min)

### 5. Accessibility
- High contrast ratios
- Clear focus states
- Semantic HTML
- Screen reader support

## Usage Examples

### Hero Section
```tsx
<section style={{
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(12px)',
  borderRadius: '2rem',
  padding: '4rem 3rem',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(255, 66, 117, 0.15)',
}}>
  <h2 style={{
    fontSize: '3rem',
    fontFamily: 'var(--font-heading)',
    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}>
    Premium Beauty Services
  </h2>
</section>
```

### Stat Card
```tsx
<Card variant="elevated">
  <div style={{
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: '#FF427515',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
  }}>
    📊
  </div>
  <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#FF4275' }}>
    $1,840
  </h3>
  <p style={{ color: '#737373' }}>Today's Revenue</p>
</Card>
```

### Status Badge
```tsx
<span style={{
  padding: '0.5rem 1rem',
  borderRadius: '1rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  background: '#22C55E15',
  color: '#22C55E',
}}>
  Confirmed
</span>
```

---

**Design System Version**: 1.0.0  
**Last Updated**: December 25, 2025
