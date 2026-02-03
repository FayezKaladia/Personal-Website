# 🌓 Theme Switcher - Quick Start Guide

## Where to Find It

### Desktop View
The cinematic theme switcher button is located in the **top navigation bar**, right side:

```
┌─────────────────────────────────────────────────────────────────┐
│  [Home] [Experience] [Education] [Skills] [Projects] [...] | [Ⓞ] │
│                                                              ↑    │
│                                            Theme Switcher Button  │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile View
The theme switcher appears in the mobile menu:

```
┌──────────────────────────┐
│ Navigation          | [Ⓞ] │  ← Theme Switcher
├──────────────────────────┤
│ [Home] [Experience]      │
│ [Education] [Skills]     │
│ [Projects] [Achievements]│
│ [Contact]                │
└──────────────────────────┘
```

## How It Works

### Light Mode (Default)
- **Appearance**: Bright white button with amber/gold accents
- **Background**: White/light gray
- **Text**: Dark colors
- **Icons**: ☀️ Sun and 🌙 Moon displayed

### Dark Mode
- **Appearance**: Dark slate button with blue/yellow accents
- **Background**: Deep dark charcoal (#040404)
- **Text**: Light colors
- **Icons**: ☀️ Sun and 🌙 Moon displayed

## Interaction

1. **Click the button** to toggle between light and dark modes
2. **Visual feedback**:
   - The toggle thumb slides smoothly (spring physics)
   - Particle burst effect emanates from the center
   - Colors transition smoothly
   - Entire site theme changes instantly

3. **Persistence**:
   - Your preference is automatically saved
   - Theme restores when you revisit the site
   - System preference is respected if no saved preference exists

## Features

✨ **Cinematic Design**
- Glossy neumorphism aesthetic
- Professional depth effects
- Film grain texture overlay

🎬 **Premium Animations**
- Spring physics for smooth motion (stiffness: 300, damping: 20)
- Multi-layer particle effects on toggle
- Smooth color transitions across entire site

🎯 **Smart Functionality**
- Saves preference to localStorage
- Detects system color scheme preference
- No page reload required
- Instant theme application

## Technical Implementation

### Component
- **File**: `src/components/ui/cinematic-theme-switcher.tsx`
- **Library**: React + Framer Motion
- **Size**: ~2KB minified

### Integration Points
- **Navigation**: `src/components/layout/Navigation.tsx`
- **Theme Variables**: `src/index.css`
- **Initialization**: `src/main.tsx`

### CSS Variables Changed
When you toggle the theme, these CSS variables update:

```
Light Mode:
- --background: #ffffff
- --foreground: #0f1419
- --card: #f2f7ff
- --primary: #00d4ff (cyan)

Dark Mode:
- --background: #040404
- --foreground: #fafbfc
- --card: #0f1419
- --primary: #00d4ff (cyan)
```

## Browser Compatibility

✅ Works on:
- Chrome/Chromium (88+)
- Firefox (87+)
- Safari (14+)
- Edge (88+)
- Mobile browsers

## Customization

To customize the theme colors, edit the CSS variables in `src/index.css`:

```css
html {
  --background: 0 0% 100%;      /* Change light mode background */
  --foreground: 240 10% 4%;     /* Change light mode text */
  /* ... other variables ... */
}

.dark {
  --background: 240 10% 4%;     /* Change dark mode background */
  --foreground: 0 0% 98%;       /* Change dark mode text */
  /* ... other variables ... */
}
```

## Troubleshooting

**Theme not persisting?**
- Check if localStorage is enabled in your browser
- Clear browser cache and refresh

**Animation too fast/slow?**
- Edit `stiffness` and `damping` in the component file
- Current: `stiffness: 300, damping: 20`

**Colors not matching?**
- Verify CSS variables are set correctly in `src/index.css`
- Check if dark class is applied to `<html>` element
- Inspect element and verify computed styles

---

**Enjoy your new cinematic theme switcher! 🎬✨**
