import { useAnalytics } from '~/composables/useAnalytics'

export default defineNuxtPlugin(() => {
  const { trackEvent, isAnalyticsEnabled } = useAnalytics()

  // Monitor Core Web Vitals
  if (process.client && isAnalyticsEnabled.value) {
    // First Input Delay
    const onFID = (metric: any) => {
      trackEvent({
        category: 'WebVitals',
        action: 'FID',
        value: Math.round(metric.value)
      })
    }

    // Largest Contentful Paint
    const onLCP = (metric: any) => {
      trackEvent({
        category: 'WebVitals',
        action: 'LCP',
        value: Math.round(metric.value)
      })
    }

    // Cumulative Layout Shift
    const onCLS = (metric: any) => {
      trackEvent({
        category: 'WebVitals',
        action: 'CLS',
        value: Math.round(metric.value * 1000) / 1000
      })
    }

    if ('web-vital' in window) {
      // @ts-ignore
      window.webVitals.onFID(onFID)
      // @ts-ignore
      window.webVitals.onLCP(onLCP)
      // @ts-ignore
      window.webVitals.onCLS(onCLS)
    }

    // Monitor route changes
    const router = useRouter()
    router.afterEach((to) => {
      trackEvent({
        category: 'Navigation',
        action: 'RouteChange',
        label: to.path
      })
    })
  }
})