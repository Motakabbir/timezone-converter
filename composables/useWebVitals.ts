import { useAnalytics } from './useAnalytics'

export function useWebVitals() {
  const { trackEvent } = useAnalytics()

  const reportWebVital = ({ name, value, delta }: any) => {
    trackEvent({
      category: 'WebVitals',
      action: name,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta)
    })
  }

  const init = () => {
    if (process.client) {
      import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
        getCLS(reportWebVital)
        getFID(reportWebVital)
        getLCP(reportWebVital)
      })
    }
  }

  return {
    init
  }
}