import { DateTime } from 'luxon'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      validateTimezone: (timezone: string): boolean => {
        try {
          // Attempt to create a DateTime object with the timezone
          const now = DateTime.now().setZone(timezone)
          return now.isValid
        } catch (error) {
          return false
        }
      },
      
      formatTimezoneError: (timezone: string): string => {
        try {
          const now = DateTime.now().setZone(timezone)
          if (!now.isValid) {
            return `Invalid timezone: ${timezone}`
          }
          return ''
        } catch (error) {
          return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    }
  }
})