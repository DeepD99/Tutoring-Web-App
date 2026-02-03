# Design System Quick Start

## 📚 Documentation Files

This project includes comprehensive design documentation:

1. **[UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)** - Complete design system guide
   - Color palette and usage guidelines
   - Typography system
   - Component library with code examples
   - Layout patterns and responsive design
   - Animations and effects
   - Best practices and accessibility

2. **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)** - Performance optimization guide
   - CSS and React optimizations applied
   - Development vs production performance
   - Benchmarking and testing tips
   - Common performance issues and solutions

## 🎨 Quick Reference

### Color Palette

![Color Palette](../artifacts/design_system_colors.png)

**Primary Colors:**
- `#0A1628` - Navy Deep (backgrounds)
- `#162642` - Navy Mid (secondary backgrounds)
- `#FF6B35` - Orange Vibrant (CTAs, accents)
- `#FF8F66` - Orange Soft (hover states)

**Status Colors:**
- `#00D4AA` - Green Success
- `#FFB800` - Yellow Warning
- `#FF4757` - Red Alert

### Typography

- **Headings:** Outfit (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Base Size:** 16px
- **Scale:** 0.75rem → 3rem

### Spacing

All spacing uses 8px grid system:
- `0.5rem` (8px) - Tight
- `1rem` (16px) - Default
- `1.5rem` (24px) - Comfortable
- `2rem` (32px) - Spacious
- `3rem` (48px) - Sections

## 🚀 Using the Design System

### 1. Import Fonts (Already configured in `layout.tsx`)

```typescript
import { Outfit, DM_Sans } from 'next/font/google';
```

### 2. Use CSS Variables

```css
.my-component {
  background: var(--navy-deep);
  color: var(--white);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
}
```

### 3. Follow Component Patterns

See `UI_DESIGN_SYSTEM.md` for complete component examples including:
- Cards (stat cards, grade cards, section cards)
- Buttons (primary, secondary, success)
- Badges and labels
- Input fields
- Weekly calendar layout
- Grade displays
- Session timelines

### 4. Performance Best Practices

Always use GPU-accelerated animations:

```css
/* ✅ Good - GPU accelerated */
.element {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.element:hover {
  transform: translate3d(0, -5px, 0);
}

/* ❌ Avoid - CPU only */
.element:hover {
  transform: translateY(-5px);
}
```

## 📋 New Page Checklist

When creating a new page:

- [ ] Use `--navy-deep` or gradient background
- [ ] Import and use Outfit for headings
- [ ] Import and use DM Sans for body text
- [ ] Follow 8px spacing grid
- [ ] Use defined color variables (no hardcoded colors)
- [ ] Add hover states with GPU acceleration
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Ensure accessibility (contrast, focus states)
- [ ] Add animations with `will-change` hints
- [ ] Follow component patterns from design system

## 🎯 Component Examples

### Creating a New Card

```tsx
<div className="section-card">
  <div className="section-header">
    <h2 className="section-title">My Section</h2>
    <a href="#" className="section-action">View All →</a>
  </div>
  <div className="content">
    {/* Your content here */}
  </div>
</div>
```

### Creating a Stat Display

```tsx
<div className="stat-card">
  <div className="stat-label">Current GPA</div>
  <div className="stat-value">
    3.2
    <span className="stat-trend trend-up">↑</span>
  </div>
</div>
```

## 📖 Full Documentation

For complete details, code examples, and guidelines, see:
- **[UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)** - Full design system
- **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)** - Performance tips

## 🔄 Updates

**Last Updated:** February 2, 2026  
**Version:** 1.0

When making design changes, please update the design system documentation to keep it current.
