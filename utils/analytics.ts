// Google Analytics tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track navbar clicks
export const trackNavbarClick = (linkText: string, deviceType: 'desktop' | 'mobile') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navbar_click', {
      link_text: linkText,
      device_type: deviceType,
      event_category: 'navigation',
    });
  }
};

// Track footer clicks
export const trackFooterClick = (linkText: string, section: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'footer_click', {
      link_text: linkText,
      section: section,
      event_category: 'navigation',
    });
  }
};

// Track social media clicks
export const trackSocialClick = (platform: string, location: string = 'footer') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_media_click', {
      platform: platform,
      location: location,
      event_category: 'social_engagement',
    });
  }
};

// Track product page views
export const trackProductPageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'product_page_view', {
      page_location: window.location.pathname,
      event_category: 'page_engagement',
    });
  }
};

// Track scroll depth on product page
export const trackScrollDepth = (percentage: number, page: string = 'product') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      scroll_percentage: percentage,
      page_type: page,
      event_category: 'page_engagement',
    });
  }
};

// Track schedule/demo page views
export const trackSchedulePageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'schedule_page_view', {
      page_location: window.location.pathname,
      event_category: 'conversion_funnel',
    });
  }
};

// Track demo form submissions
export const trackDemoFormSubmission = (deviceType: 'desktop' | 'mobile') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_form_submit', {
      device_type: deviceType,
      event_category: 'conversion',
      value: 1, // Conversion value
    });
  }
};

// Track contact form start (when user focuses on first field)
export const trackDemoFormStart = (deviceType: 'desktop' | 'mobile') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_form_start', {
      device_type: deviceType,
      event_category: 'conversion_funnel',
    });
  }
};

// Track CTA button clicks
export const trackCTAClick = (
  buttonText: string, 
  sourcePage: string, 
  deviceType: 'desktop' | 'mobile',
  destination: string = '/schedule'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      button_text: buttonText,
      source_page: sourcePage,
      device_type: deviceType,
      destination: destination,
      event_category: 'cta_engagement',
      value: 1, // CTA conversion value
    });
  }
};

// Track newsletter subscriptions
export const trackNewsletterSignup = (
  sourcePage: string, 
  deviceType: 'desktop' | 'mobile',
  email: string = ''
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      source_page: sourcePage,
      device_type: deviceType,
      event_category: 'lead_generation',
      value: 1, // Newsletter subscription value
      // Note: Don't send actual email for privacy
      has_email: email.length > 0
    });
  }
};

// YouTube Video Interaction Tracking
export const trackYouTubePlay = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  videoTitle: string = 'Hero Video'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_play', {
      video_id: videoId,
      video_title: videoTitle,
      source_page: sourcePage,
      device_type: deviceType,
      event_category: 'video_engagement',
      value: 1
    });
  }
};

export const trackYouTubePause = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  currentTime: number = 0
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_pause', {
      video_id: videoId,
      source_page: sourcePage,
      device_type: deviceType,
      video_current_time: Math.round(currentTime),
      event_category: 'video_engagement'
    });
  }
};

export const trackYouTubeComplete = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  duration: number = 0
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_complete', {
      video_id: videoId,
      source_page: sourcePage,
      device_type: deviceType,
      video_duration: Math.round(duration),
      event_category: 'video_engagement',
      value: 2 // Higher value for completion
    });
  }
};

export const trackYouTubeSeek = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  fromTime: number = 0,
  toTime: number = 0
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_seek', {
      video_id: videoId,
      source_page: sourcePage,
      device_type: deviceType,
      seek_from: Math.round(fromTime),
      seek_to: Math.round(toTime),
      event_category: 'video_engagement'
    });
  }
};

export const trackYouTubeMute = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  isMuted: boolean
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_mute_toggle', {
      video_id: videoId,
      source_page: sourcePage,
      device_type: deviceType,
      mute_state: isMuted ? 'muted' : 'unmuted',
      event_category: 'video_engagement'
    });
  }
};

export const trackYouTubeProgress = (
  videoId: string,
  sourcePage: string,
  deviceType: 'desktop' | 'mobile',
  percentage: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_progress', {
      video_id: videoId,
      source_page: sourcePage,
      device_type: deviceType,
      progress_percentage: percentage,
      event_category: 'video_engagement'
    });
  }
}; 