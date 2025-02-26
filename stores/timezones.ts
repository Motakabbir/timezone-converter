import { defineStore } from 'pinia'

interface TimezoneState {
  recentTimezones: string[]
  maxRecent: number
}

export const useTimezoneStore = defineStore('timezones', {
  state: (): TimezoneState => ({
    recentTimezones: [],
    maxRecent: 5
  }),

  actions: {
    addRecentTimezone(timezone: string) {
      if (!this.recentTimezones.includes(timezone)) {
        this.recentTimezones.unshift(timezone)
        if (this.recentTimezones.length > this.maxRecent) {
          this.recentTimezones.pop()
        }
      } else {
        // Move to front if already exists
        this.recentTimezones = [
          timezone,
          ...this.recentTimezones.filter(tz => tz !== timezone)
        ]
      }
    },

    clearRecentTimezones() {
      this.recentTimezones = []
    }
  },

  persist: {
    storage: persistedState.localStorage
  }
})