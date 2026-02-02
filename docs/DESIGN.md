# Design System: 46-starter-ionic-react

## Visual Philosophy

The design follows **iOS Design Guidelines** with a mobile-first approach. It uses Apple's Human Interface Principles as the foundation, combining native Ionic components with Tailwind CSS utilities for a premium mobile app experience.

## Design Patterns

### 1. Bottom Tab Navigation

**Pattern**: Fixed bottom navigation bar with 5 tabs
- **Home**: Main content feed
- **Discover**: Search and explore
- **Post**: Create content (centered)
- **Activity**: Notifications
- **Profile**: User account

**Implementation**:
- Ionic `IonTabBar` component
- Safe area insets for notched devices
- Active state with primary color
- Lucide React icons

### 2. Story Circles

**Pattern**: Instagram-style story avatars
- Gradient ring for unread stories
- White border for visual separation
- Circular avatars
- Horizontal scrollable list

**Colors**:
- Gradient: `#ff2d55 → #ff9500 → #ff2d55`

### 3. Card-Based Content

**Pattern**: Rounded cards with subtle shadows
- Border radius: `16px` (rounded-2xl)
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.05)`
- White background
- Clear visual hierarchy

### 4. Touch Interactions

**Active States**:
- Scale down: `active:scale-95`
- Duration: `100ms`
- Easing: `ease-out`
- Haptic feedback integration

### 5. Typography

**Font Stack**:
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
             'Segoe UI', Roboto, sans-serif;
```

**Hierarchy**:
- Headers: `text-xl font-bold`
- Titles: `text-sm font-semibold`
- Body: `text-sm`
- Secondary: `text-xs text-[#8e8e93]`

## Color Palette

### Primary Colors

**iOS Blue (Primary)**
```css
--ion-color-primary: #007aff
--ion-color-primary-shade: #006be6
--ion-color-primary-tint: #1a87ff
```

**System Colors**
```css
Success: #34c759
Warning: #ff9500
Danger:  #ff3b30
```

### Background Colors

```css
--ion-background-color: #f2f2f7
--ion-card-background: #ffffff
--ion-toolbar-background: #ffffff
```

### Text Colors

```css
Primary:   #1c1c1e
Secondary: #8e8e93
```

### Dark Mode

Automatic color switching based on system preference:

```css
@media (prefers-color-scheme: dark) {
  --ion-background-color: #000000
  --ion-text-color: #ffffff
  --ion-card-background: #1c1c1e
}
```

## Spacing System

Based on 4px grid:

```css
4px  = 0.25rem = spacing-1
8px  = 0.5rem  = spacing-2
12px = 0.75rem = spacing-3
16px = 1rem    = spacing-4
24px = 1.5rem  = spacing-6
32px = 2rem    = spacing-8
```

**Ionic Padding**:
- `ion-padding`: `16px` all around
- Custom padding via Tailwind utilities

## Components

### Buttons

**Primary Button**
```css
background: #007aff
color: white
rounded-full
padding: 12px 24px
active: scale-95
```

**Secondary Button**
```css
background: white
border: 1px solid #e5e5ea
color: #1c1c1e
rounded-full
padding: 12px 24px
```

**Clear Button**
```css
background: transparent
color: #007aff
```

### Inputs

**Search Bar**
```css
background: #f2f2f7
rounded-full
padding: 10px 16px
icon: Search
placeholder: "Search"
```

### Cards

**Feed Card**
```css
background: white
rounded-2xl (16px)
shadow: subtle
margin: 0 16px
overflow: hidden
```

### Navigation

**Tab Bar**
```css
position: fixed
bottom: 0
background: white
border-top: 1px solid #e5e5ea
safe-area-inset-bottom
```

**Tab Button**
```css
flex column
icon: 24px
label: 12px
color: #8e8e93 (inactive)
color: #007aff (active)
```

## Animations

### Page Transitions

**Slide In Right**
```css
transform: translateX(100%) → translateX(0)
duration: 300ms
easing: cubic-bezier(0.4, 0.0, 0.2, 1)
```

**Slide Out Left**
```css
transform: translateX(0) → translateX(-30%)
duration: 300ms
easing: cubic-bezier(0.4, 0.0, 0.2, 1)
```

### Modal Animations

**Modal In**
```css
transform: translateY(100%) → translateY(0)
opacity: 0 → 1
duration: 300ms
easing: cubic-bezier(0.32, 0.72, 0, 1)
```

**Modal Out**
```css
transform: translateY(0) → translateY(100%)
opacity: 1 → 0
duration: 250ms
easing: cubic-bezier(0.4, 0.0, 1, 1)
```

### Touch Feedback

**Scale Down**
```css
transform: scale(1) → scale(0.95)
duration: 100ms
easing: ease-out
```

## Safe Areas

**Notch-Aware Design**:
```css
padding-top: env(safe-area-inset-top)
padding-bottom: env(safe-area-inset-bottom)
padding-left: env(safe-area-inset-left)
padding-right: env(safe-area-inset-right)
```

**Utility Classes**:
- `.pt-safe` - Top safe area
- `.pb-safe` - Bottom safe area
- `.pl-safe` - Left safe area
- `.pr-safe` - Right safe area

## Icons

**Icon Library**: Lucide React
**Size**: 24px (w-6 h-6) for most icons
**Color**: Inherit from text color
**Stroke Width**: 2px (default)

**Common Icons**:
- Home, Search, Plus, Heart, User (navigation)
- MessageCircle, Send, Bookmark (actions)
- MoreHorizontal (options)

## Responsive Design

**Mobile-First Approach**:
- Base styles: Mobile (375px+)
- Max width: `md` (448px) for main container
- Desktop: Centered with max width

**Viewport Configuration**:
```html
<meta name="viewport" content="
  viewport-fit=cover,
  width=device-width,
  initial-scale=1.0,
  minimum-scale=1.0,
  maximum-scale=1.0,
  user-scalable=no
">
```

## Accessibility

### Touch Targets
- Minimum size: `44px × 44px`
- Spacing: `8px` between targets
- Clear visual feedback

### Screen Reader Support
- Semantic HTML with Ionic components
- ARIA labels via Ionic
- Logical heading hierarchy

### Visual Accessibility
- High contrast ratios (WCAG AA)
- Clear focus states
- Sufficient color contrast

## Performance Considerations

### CSS Optimization
- Tailwind v4 native engine
- Purge unused styles in production
- Ionic component CSS tree-shaken

### Image Optimization
- Lazy loading for images
- WebP format support
- Responsive images

### Touch Optimization
```css
-webkit-tap-highlight-color: transparent
-webkit-touch-callout: none
overscroll-behavior-y: none
```

## Brand Guidelines

### App Name
**SocialApp** - Short, memorable, descriptive

### Logo
- Icon: Heart symbol
- Color: Primary blue (#007aff)
- Style: Minimal, outline

### Voice
- Casual but professional
- Concise labels
- Action-oriented buttons
- Clear messaging

## Implementation Examples

### Create a New Page

```tsx
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const MyPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>My Page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      {/* Content here */}
    </IonContent>
  </IonPage>
);
```

### Use Haptics

```tsx
import { useHaptics } from './hooks/useHaptics';

const MyComponent = () => {
  const { triggerClick } = useHaptics();

  return (
    <IonButton onClick={() => triggerClick()}>
      Click Me
    </IonButton>
  );
};
```

### Apply Mobile Styles

```tsx
<div className="touch-feedback active:scale-95">
  {/* Tappable content */}
</div>
```

## Design Tokens

### Border Radius
- Small: `8px` (rounded-lg)
- Medium: `12px` (rounded-xl)
- Large: `16px` (rounded-2xl)
- Full: `9999px` (rounded-full)

### Shadows
- Subtle: `0 1px 3px rgba(0, 0, 0, 0.05)`
- Medium: `0 4px 6px rgba(0, 0, 0, 0.1)`
- Strong: `0 10px 15px rgba(0, 0, 0, 0.2)`

### Z-Index
- Tab bar: `10`
- Header: `40`
- Modal: `100`
- Toast: `200`

## Design Resources

### Inspiration
- Apple Human Interface Guidelines
- Instagram (navigation pattern)
- iOS native apps

### Tools
- Figma (design mockups)
- Lucide (icons)
- Tailwind CSS (styling)
- Ionic Framework (components)

### Documentation
- [Ionic React Docs](https://ionicframework.com/docs/react)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
