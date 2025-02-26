interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export function useAnalytics() {
  const isAnalyticsEnabled = useLocalStorage('analytics-enabled', true)

  const trackEvent = (event: AnalyticsEvent) => {
    if (!isAnalyticsEnabled.value) return

    // Use web vitals to track performance
    if (process.client) {
      const eventData = {
        ...event,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
      }
      
      // Store events locally for now
      const events = JSON.parse(localStorage.getItem('analytics-events') || '[]')
      events.push(eventData)
      localStorage.setItem('analytics-events', JSON.stringify(events.slice(-100))) // Keep last 100 events
    }
  }

  const trackPerformance = () => {
    if (!isAnalyticsEnabled.value || !process.client) return

    // Track key performance metrics
    if ('performance' in window) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationTiming) {
        trackEvent({
          category: 'Performance',
          action: 'PageLoad',
          value: navigationTiming.loadEventEnd - navigationTiming.startTime
        })
      }
    }
  }

  // Track timezone conversions
  const trackConversion = (from: string, to: string) => {
    trackEvent({
      category: 'Conversion',
      action: 'TimezoneConvert',
      label: `${from} -> ${to}`
    })
  }

  // Opt out of analytics
  const optOut = () => {
    isAnalyticsEnabled.value = false
    localStorage.removeItem('analytics-events')
  }

  return {
    trackEvent,
    trackPerformance,
    trackConversion,
    optOut,
    isAnalyticsEnabled
  }
}