// Image optimization utilities for PageSpeed performance

export const RESPONSIVE_SIZES = {
  // Company logos - optimized for 96x24 display
  COMPANY_LOGO: '96px',
  
  // Mobile background images - optimized for mobile screens
  MOBILE_BACKGROUND: '(max-width: 768px) 412px, (max-width: 1024px) 750px, 1200px',
  
  // Desktop background images
  DESKTOP_BACKGROUND: '(max-width: 1024px) 768px, (max-width: 1440px) 1200px, 1920px',
  
  // Product card images
  PRODUCT_CARD: '(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px',
  
  // Profile images
  PROFILE_IMAGE: '(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px',
  
  // Icon images
  ICON_SMALL: '32px',
  ICON_MEDIUM: '48px',
  ICON_LARGE: '64px',
};

export const OPTIMIZED_DIMENSIONS = {
  // Company logos - actual display sizes to prevent oversizing
  COMPANY_LOGO: { width: 120, height: 32 },
  
  // Mobile background images - optimized for actual display
  MOBILE_BG_LARGE: { width: 750, height: 1184 }, // For 5.png
  MOBILE_BG_PORTRAIT: { width: 978, height: 1386 }, // For 3.1.png
  
  // Profile images
  PROFILE_SMALL: { width: 64, height: 64 },
  PROFILE_MEDIUM: { width: 96, height: 96 },
  PROFILE_LARGE: { width: 128, height: 128 },
  
  // Icon dimensions
  ICON_SMALL: { width: 24, height: 24 },
  ICON_MEDIUM: { width: 32, height: 32 },
  ICON_LARGE: { width: 48, height: 48 },
};

export const IMAGE_QUALITY = {
  HIGH: 90,
  MEDIUM: 80,
  LOW: 70,
  BACKGROUND: 75, // Good balance for background images
  LOGO: 85, // Higher quality for brand logos
};

// Helper function to get responsive image props
export const getResponsiveImageProps = (
  type: keyof typeof OPTIMIZED_DIMENSIONS,
  quality: keyof typeof IMAGE_QUALITY = 'MEDIUM'
) => ({
  ...OPTIMIZED_DIMENSIONS[type],
  sizes: RESPONSIVE_SIZES[type as keyof typeof RESPONSIVE_SIZES] || RESPONSIVE_SIZES.MOBILE_BACKGROUND,
  quality: IMAGE_QUALITY[quality],
});

// Optimized company logo props
export const getCompanyLogoProps = () => ({
  ...OPTIMIZED_DIMENSIONS.COMPANY_LOGO,
  sizes: RESPONSIVE_SIZES.COMPANY_LOGO,
  className: "object-contain filter brightness-0 invert w-24 h-6",
  style: { maxHeight: '24px', width: 'auto' },
  quality: IMAGE_QUALITY.LOGO,
});

// Optimized mobile background props
export const getMobileBackgroundProps = (variant: 'LARGE' | 'PORTRAIT' = 'LARGE') => ({
  ...(variant === 'LARGE' ? OPTIMIZED_DIMENSIONS.MOBILE_BG_LARGE : OPTIMIZED_DIMENSIONS.MOBILE_BG_PORTRAIT),
  sizes: RESPONSIVE_SIZES.MOBILE_BACKGROUND,
  priority: false,
  quality: IMAGE_QUALITY.BACKGROUND,
});

export default {
  RESPONSIVE_SIZES,
  OPTIMIZED_DIMENSIONS,
  IMAGE_QUALITY,
  getResponsiveImageProps,
  getCompanyLogoProps,
  getMobileBackgroundProps,
}; 