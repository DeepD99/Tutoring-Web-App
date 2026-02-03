# UI/UX Design System
**Tutoring Web App - Design Guidelines**

> This document defines the visual language, components, and design patterns for the Tutoring Web App. Follow these guidelines to maintain consistency across all pages.

---

## 🎨 Color Palette

### Primary Colors

```css
--navy-deep: #0A1628;      /* Primary background, headers */
--navy-mid: #162642;       /* Secondary backgrounds */
--orange-vibrant: #FF6B35; /* Primary accent, CTAs, highlights */
--orange-soft: #FF8F66;    /* Hover states, gradients */
```

### Neutral Colors

```css
--white: #FFFFFF;          /* Primary text, card backgrounds */
--gray-light: #F5F7FA;     /* Subtle backgrounds */
--gray-mid: #8B95A5;       /* Secondary text, labels */
```

### Status Colors

```css
--green-success: #00D4AA;  /* Success states, improvements, "today" indicators */
--yellow-warn: #FFB800;    /* Warning states, B grades */
--red-alert: #FF4757;      /* Alert states, urgent items */
```

### Color Usage Guidelines

| Color | Use For | Don't Use For |
|-------|---------|---------------|
| Navy Deep | Page backgrounds, main containers | Text (too dark) |
| Orange Vibrant | Buttons, badges, links, time indicators | Large backgrounds |
| Green Success | Grade improvements, completed items, today's sessions | Error messages |
| Yellow Warn | B grades, caution states | Success messages |
| Red Alert | Urgent homework, grade drops, alerts | Primary buttons |

---

## 📐 Spacing System

Use consistent spacing based on 8px grid:

```css
--space-xs: 0.5rem;   /* 8px  - Tight spacing */
--space-sm: 0.8rem;   /* 12px - Small gaps */
--space-md: 1rem;     /* 16px - Default spacing */
--space-lg: 1.5rem;   /* 24px - Section spacing */
--space-xl: 2rem;     /* 32px - Large gaps */
--space-2xl: 3rem;    /* 48px - Major sections */
```

### Spacing Examples

```css
/* Card padding */
padding: 1.5rem;              /* 24px */

/* Grid gaps */
gap: 1rem;                    /* 16px */

/* Section margins */
margin-bottom: 3rem;          /* 48px */

/* Element margins */
margin-bottom: 0.5rem;        /* 8px */
```

---

## 🔤 Typography

### Font Families

```css
--font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
```

### Font Sizes

```css
--text-xs: 0.75rem;    /* 12px - Tiny labels */
--text-sm: 0.85rem;    /* 13.6px - Small text */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.1rem;     /* 17.6px - Emphasized text */
--text-xl: 1.5rem;     /* 24px - Section titles */
--text-2xl: 2rem;      /* 32px - Stats, grades */
--text-3xl: 3rem;      /* 48px - Page headers */
```

### Font Weights

```css
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-extrabold: 800;
```

### Typography Examples

```css
/* Page Header */
font-family: var(--font-heading);
font-size: 3rem;
font-weight: 800;
background: linear-gradient(135deg, #FFFFFF 0%, #FF8F66 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Section Title */
font-family: var(--font-heading);
font-size: 1.5rem;
font-weight: 700;
color: var(--white);

/* Body Text */
font-family: var(--font-body);
font-size: 1rem;
font-weight: 400;
color: var(--white);

/* Label/Meta Text */
font-size: 0.85rem;
text-transform: uppercase;
letter-spacing: 1px;
color: var(--gray-mid);
```

---

## 🎴 Component Library

### 1. Cards

#### Standard Card
```css
.card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}
```

#### Stat Card (Small)
```css
.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.stat-card:hover {
  transform: translate3d(0, -5px, 0);
  border-color: var(--orange-vibrant);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
}
```

#### Grade Card
```css
.grade-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.grade-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--orange-vibrant);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  will-change: transform;
}

.grade-card:hover {
  transform: translate3d(0, -8px, 0);
  border-color: var(--orange-vibrant);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3);
}

.grade-card:hover::before {
  transform: scaleX(1);
}
```

### 2. Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--orange-vibrant);
  color: var(--white);
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-primary:hover {
  background: var(--orange-soft);
  transform: translateX(3px);
}
```

#### Success Button
```css
.btn-success {
  background: var(--green-success);
  color: var(--navy-deep);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background: #00f5c4;
  transform: scale(1.05);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

### 3. Badges

#### Status Badge
```css
.badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.badge-primary {
  background: var(--orange-vibrant);
  color: var(--white);
}

.badge-success {
  background: var(--green-success);
  color: var(--navy-deep);
}

.badge-subtle {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
}
```

### 4. Input Fields

```css
.input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--orange-vibrant);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input::placeholder {
  color: var(--gray-mid);
}
```

---

## 🎭 Effects & Animations

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Shadows

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.3);

/* Colored shadows for hover states */
--shadow-orange: 0 10px 30px rgba(255, 107, 53, 0.2);
--shadow-green: 0 10px 30px rgba(0, 212, 170, 0.3);
```

### Transitions

```css
/* Standard transition */
transition: all 0.3s ease;

/* Smooth cubic bezier */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Quick transition */
transition: all 0.2s ease;
```

### Animations

```css
/* Slide down (for headers) */
@keyframes slideDown {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-down {
  animation: slideDown 0.8s ease-out;
}

/* Slide up (for content) */
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

### Hover Effects

```css
/* Standard lift */
.hover-lift {
  transition: all 0.3s ease;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.hover-lift:hover {
  transform: translate3d(0, -5px, 0);
}

/* Lift with shadow */
.hover-lift-shadow:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3);
}

/* Scale */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Slide right */
.hover-slide-right:hover {
  transform: translateX(5px);
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Examples

```css
/* Mobile (default) */
.grid {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### Mobile-Specific Adjustments

```css
@media (max-width: 768px) {
  /* Reduce font sizes */
  .welcome-text {
    font-size: 2rem;
  }
  
  /* Stack grids */
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  /* Reduce padding */
  .dashboard-container {
    padding: 1rem;
  }
  
  /* Smaller cards */
  .stat-card {
    padding: 1rem;
  }
}
```

---

## 🏗️ Layout Patterns

### Page Container

```css
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #0A1628 0%, #1a2842 100%);
  min-height: 100vh;
  color: var(--white);
}
```

### Section Header

```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
}
```

### Grid Layouts

```css
/* Auto-fit grid (responsive) */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

/* Two column layout */
.grid-2col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

/* Four column stats */
.grid-4col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
```

---

## 🎯 Component Patterns

### Weekly Calendar Pattern

```html
<div class="weekly-calendar">
  <div class="day-box day-today">
    <div class="day-header">
      <div class="day-initial">M</div>
      <div class="day-date">3</div>
    </div>
    <div class="day-sessions">
      <div class="session-time-slot">4:00 PM</div>
      <div class="session-subject-mini">Mathematics</div>
      <div class="session-tutor-mini">with Mr. Johnson</div>
    </div>
  </div>
  <!-- Repeat for T, W, TH, F -->
</div>
```

```css
.weekly-calendar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.day-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.2rem;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.day-today {
  border-color: var(--green-success);
  background: rgba(0, 212, 170, 0.08);
}
```

### Grade Display Pattern

```html
<div class="grade-card">
  <div class="subject-name">Mathematics</div>
  <div class="grade-display">
    <div class="grade-letter grade-warn">B</div>
    <div class="grade-trend-indicator trend-up">↑</div>
  </div>
  <div class="grade-status">
    <span class="status-icon status-improving"></span>
    <span>Improved from C+</span>
  </div>
</div>
```

### Session Timeline Pattern

```html
<div class="session-item session-today">
  <div class="session-time">4:00 PM</div>
  <div class="session-details">
    <div>
      <div class="session-subject">Mathematics</div>
      <div class="session-tutor">with Mr. Johnson</div>
    </div>
    <span class="session-badge badge-today">Today</span>
  </div>
</div>
```

---

## ✨ Best Practices

### Performance

1. **Always use GPU acceleration for animations**
   ```css
   transform: translate3d(0, -5px, 0); /* ✅ Good */
   transform: translateY(-5px);        /* ❌ Avoid */
   ```

2. **Add will-change for animated elements**
   ```css
   .animated-element {
     will-change: transform;
     transform: translate3d(0, 0, 0);
   }
   ```

3. **Limit backdrop-filter usage**
   - Use sparingly (expensive operation)
   - Prefer `blur(10px)` over `blur(20px)`

### Accessibility

1. **Color Contrast**
   - White text on navy background: ✅ WCAG AAA
   - Gray text on navy background: ✅ WCAG AA
   - Orange on white: ✅ WCAG AA

2. **Interactive Elements**
   - Minimum touch target: 44x44px
   - Visible focus states
   - Keyboard navigation support

3. **Text Sizing**
   - Base font size: 16px minimum
   - Line height: 1.5 for body text
   - Avoid text smaller than 12px

### Consistency

1. **Spacing**: Always use 8px grid system
2. **Border Radius**: Use 12px, 16px, or 20px (no odd numbers)
3. **Transitions**: Stick to 0.2s, 0.3s, or 0.4s durations
4. **Colors**: Only use defined color variables

---

## 📋 Quick Reference

### Common CSS Classes

```css
/* Containers */
.container-full    /* Full width container */
.container-max     /* Max 1400px container */
.section-card      /* Standard section card */

/* Typography */
.text-heading      /* Outfit font, large */
.text-body         /* DM Sans, regular */
.text-label        /* Small, uppercase, spaced */
.text-muted        /* Gray color */

/* Colors */
.text-primary      /* Orange */
.text-success      /* Green */
.text-warning      /* Yellow */
.text-danger       /* Red */

/* Backgrounds */
.bg-glass          /* Glassmorphism effect */
.bg-gradient       /* Navy gradient */

/* Utilities */
.hover-lift        /* Lift on hover */
.animate-fade      /* Fade in animation */
.rounded-lg        /* Large border radius */
```

---

## 🎨 Design Tokens (CSS Variables)

Copy this into your CSS files:

```css
:root {
  /* Colors */
  --navy-deep: #0A1628;
  --navy-mid: #162642;
  --orange-vibrant: #FF6B35;
  --orange-soft: #FF8F66;
  --white: #FFFFFF;
  --gray-light: #F5F7FA;
  --gray-mid: #8B95A5;
  --green-success: #00D4AA;
  --yellow-warn: #FFB800;
  --red-alert: #FF4757;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.8rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.15);
  --shadow-orange: 0 10px 30px rgba(255, 107, 53, 0.2);
  --shadow-green: 0 10px 30px rgba(0, 212, 170, 0.3);
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

---

## 📦 Component Checklist

When creating a new component, ensure:

- [ ] Uses design system colors (no hardcoded colors)
- [ ] Follows spacing system (8px grid)
- [ ] Has hover states for interactive elements
- [ ] Uses GPU-accelerated animations (`translate3d`)
- [ ] Includes `will-change` for animated elements
- [ ] Responsive on mobile (tested at 375px width)
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Consistent with existing components
- [ ] Documented in this design system

---

**Last Updated**: February 2, 2026  
**Version**: 1.0  
**Maintained by**: Development Team
