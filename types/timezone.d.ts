declare module 'timezone' {
  export interface TimezoneState {
    recentTimezones: string[]
    maxRecent: number
  }

  export interface TimezoneDifference {
    hours: number
    minutes: number
    isNegative: boolean
  }

  export interface TimezoneValidationResult {
    isValid: boolean
    error?: string
  }

  export interface TimezonePlugins {
    validateTimezone: (timezone: string) => boolean
    formatTimezoneError: (timezone: string) => string
  }
}