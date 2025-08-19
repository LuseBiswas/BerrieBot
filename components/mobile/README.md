# Mobile Components

This directory contains mobile-specific components for the BerriBot application.

## Structure

Each subfolder corresponds to a page or section of the application:

- `about/` - About page mobile components
- `admin/` - Admin dashboard mobile components  
- `cookies/` - Cookies page mobile components
- `explore/` - Resource exploration mobile components
- `home/` - Homepage mobile components
- `policy/` - Policy page mobile components
- `product/` - Product page mobile components
- `resources/` - Resources page mobile components
- `schedule/` - Schedule page mobile components
- `solutions/` - Solutions page mobile components
- `user/` - User page mobile components

## Development Guidelines

1. **Mobile-First Design**: Components should be optimized for touch interactions and small screens
2. **Component Naming**: Use the same naming convention as desktop components for consistency
3. **Responsive**: Components should work across mobile and tablet screen sizes (320px - 1023px)
4. **Performance**: Optimize for mobile networks and lower-powered devices

## Current Status

🚧 **Under Development** - Mobile components are not yet implemented. 

When viewing the site on mobile and tablet devices (< 1024px width), users will see the mobile-optimized experience.

## Getting Started

To add a mobile component:

1. Create the component file in the appropriate subfolder
2. Follow the same component structure as desktop components
3. Import and use in the conditional rendering logic in `DeviceWrapper.tsx`
4. Test on various mobile screen sizes

## Device Detection

Mobile components are automatically loaded when the screen width is less than 1024px, handled by:
- `hooks/useDeviceType.ts` - Device detection hook
- `components/DeviceWrapper.tsx` - Conditional rendering wrapper 