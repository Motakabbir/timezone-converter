<template>
  <ErrorBoundary>
    <div class="relative max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-slide-in">
      <!-- Settings Button -->
      <button
        @click="showSettings = true"
        class="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        title="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <!-- Analytics consent banner -->
      <div v-if="showAnalyticsConsent" class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div class="flex items-center justify-between">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            We use analytics to improve your experience. Your data stays on your device.
          </p>
          <div class="flex space-x-2">
            <button 
              @click="acceptAnalytics" 
              class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              Accept
            </button>
            <button 
              @click="rejectAnalytics" 
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Recent Timezones -->
        <div v-if="timezoneStore.recentTimezones.length > 0" class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Timezones</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tz in timezoneStore.recentTimezones"
              :key="tz"
              @click="setTargetZone(tz)"
              class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              {{ formatTimeZoneName(tz) }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Source Time Zone -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">From Time Zone</label>
            <select 
              v-model="sourceZone" 
              @change="handleSourceZoneChange"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': sourceZoneError }"
            >
              <option v-for="zone in timeZones" :key="zone" :value="zone">
                {{ formatTimeZoneName(zone) }}
              </option>
            </select>
            <p v-if="sourceZoneError" class="text-sm text-red-500">{{ sourceZoneError }}</p>
            <div class="space-y-2">
              <input 
                type="datetime-local" 
                v-model="sourceDateTime"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
            </div>
          </div>

          <!-- Target Time Zone -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">To Time Zone</label>
            <select 
              v-model="targetZone"
              @change="handleTargetZoneChange"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': targetZoneError }"
            >
              <option v-for="zone in timeZones" :key="zone" :value="zone">
                {{ formatTimeZoneName(zone) }}
              </option>
            </select>
            <p v-if="targetZoneError" class="text-sm text-red-500">{{ targetZoneError }}</p>
            <div class="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
              <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ convertedTime }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ timezoneDifference }}</p>
            </div>
          </div>
        </div>

        <!-- Current Time -->
        <div class="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400">Current time in {{ targetZone }}:</p>
          <p class="text-xl font-bold text-primary-600 dark:text-primary-400">{{ currentTargetTime }}</p>
        </div>
      </div>

      <!-- Keyboard Shortcuts Help -->
      <KeyboardShortcutsHelp
        :show="showKeyboardHelp"
        :shortcuts="shortcuts"
        @close="showKeyboardHelp = false"
      />

      <!-- Keyboard shortcut indicator -->
      <div class="absolute bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
        Press <kbd class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">?</kbd> for shortcuts
      </div>

      <!-- Settings Modal -->
      <SettingsModal
        :show="showSettings"
        @close="showSettings = false"
        @update="handleSettingsUpdate"
      />
    </div>
    <Toast />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { useTimezoneStore } from '~/stores/timezones'
import { useTimeUpdate } from '~/composables/useTimeUpdate'
import { useAnalytics } from '~/composables/useAnalytics'
import { useKeyboardShortcuts } from '~/composables/useKeyboardShortcuts'
import { useToast } from '~/composables/useToast'
import { useTimezoneCache } from '~/composables/useTimezoneCache'
import type { TimezoneState } from '~/types/timezone'
import type { KeyboardShortcut } from '~/types/keyboard'

const { $validateTimezone, $formatTimezoneError } = useNuxtApp()
const timeZones = DateTime.ZONE_NAMES
const timezoneStore = useTimezoneStore()
const { currentTime } = useTimeUpdate()
const { trackConversion, isAnalyticsEnabled } = useAnalytics()
const { registerShortcut, shortcuts } = useKeyboardShortcuts()
const { addToast } = useToast()
const { getCachedTimezone, cacheTimezone } = useTimezoneCache()

const sourceZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)
const targetZone = ref('UTC')
const sourceDateTime = ref(DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"))
const sourceZoneError = ref('')
const targetZoneError = ref('')
const showAnalyticsConsent = ref(!localStorage.getItem('analytics-preference'))
const showKeyboardHelp = ref(false)

// Add settings state
const showSettings = ref(false)

// Analytics consent handlers
const acceptAnalytics = () => {
  isAnalyticsEnabled.value = true
  localStorage.setItem('analytics-preference', 'accepted')
  showAnalyticsConsent.value = false
}

const rejectAnalytics = () => {
  isAnalyticsEnabled.value = false
  localStorage.setItem('analytics-preference', 'rejected')
  showAnalyticsConsent.value = false
}

// Add initial zones to recent list
onMounted(async () => {
  validateAndAddTimezone(sourceZone.value)
  validateAndAddTimezone(targetZone.value)

  registerShortcut({
    key: 'c',
    ctrl: true,
    handler: copyConvertedTime,
    description: 'Copy converted time'
  })

  registerShortcut({
    key: 's',
    ctrl: true,
    handler: swapTimezones,
    description: 'Swap timezones'
  })

  registerShortcut({
    key: 'n',
    ctrl: true,
    handler: setCurrentTime,
    description: 'Set to current time'
  })

  registerShortcut({
    key: '/',
    handler: () => {
      sourceZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
      handleSourceZoneChange()
    },
    description: 'Set source to local timezone'
  })

  // Cache initial timezones
  await Promise.all([
    cacheTimezone(sourceZone.value),
    cacheTimezone(targetZone.value),
    cacheTimezone('UTC') // Cache UTC as it's commonly used
  ])
})

const validateAndAddTimezone = (timezone: string) => {
  if ($validateTimezone(timezone)) {
    timezoneStore.addRecentTimezone(timezone)
    return true
  }
  return false
}

const handleSourceZoneChange = async () => {
  sourceZoneError.value = $formatTimezoneError(sourceZone.value)
  if (!sourceZoneError.value) {
    validateAndAddTimezone(sourceZone.value)
    localStorage.setItem('last-source-zone', sourceZone.value)
    if (!targetZoneError.value) {
      await cacheTimezone(sourceZone.value)
      trackConversion(sourceZone.value, targetZone.value)
      addToast('Source timezone updated', 'info')
    }
  } else {
    addToast(sourceZoneError.value, 'error')
  }
}

const handleTargetZoneChange = async () => {
  targetZoneError.value = $formatTimezoneError(targetZone.value)
  if (!targetZoneError.value) {
    validateAndAddTimezone(targetZone.value)
    localStorage.setItem('last-target-zone', targetZone.value)
    if (!sourceZoneError.value) {
      await cacheTimezone(targetZone.value)
      trackConversion(sourceZone.value, targetZone.value)
      addToast('Target timezone updated', 'info')
    }
  } else {
    addToast(targetZoneError.value, 'error')
  }
}

const handleSettingsUpdate = () => {
  // Reload recent timezones
  timezoneStore.$reset()
  
  // Update source and target zones from saved preferences
  const savedSourceZone = localStorage.getItem('last-source-zone')
  const savedTargetZone = localStorage.getItem('last-target-zone')
  
  if (savedSourceZone && sourceZone.value !== savedSourceZone) {
    sourceZone.value = savedSourceZone
    handleSourceZoneChange()
  }
  
  if (savedTargetZone && targetZone.value !== savedTargetZone) {
    targetZone.value = savedTargetZone
    handleTargetZoneChange()
  }
}

const convertedTime = computed(() => {
  try {
    const dt = DateTime.fromISO(sourceDateTime.value, { zone: sourceZone.value })
    if (!dt.isValid) return 'Invalid date/time'
    return dt.setZone(targetZone.value).toFormat('MMMM dd, yyyy HH:mm:ss')
  } catch (error) {
    return 'Conversion error'
  }
})

const currentTargetTime = computed(() => {
  try {
    return DateTime.fromJSDate(currentTime.value).setZone(targetZone.value).toFormat('MMMM dd, yyyy HH:mm:ss')
  } catch (error) {
    return 'Invalid timezone'
  }
})

const timezoneDifference = computed(async () => {
  try {
    const sourceCached = await getCachedTimezone(sourceZone.value)
    const targetCached = await getCachedTimezone(targetZone.value)

    if (sourceCached && targetCached) {
      // Use cached offsets for quick calculation
      const diff = targetCached.offset - sourceCached.offset
      const hours = Math.abs(Math.floor(diff / 60))
      const mins = Math.abs(diff % 60)
      const sign = diff < 0 ? '-' : '+'
      return `${sign}${hours}:${mins.toString().padStart(2, '0')} hours`
    }

    // Fallback to direct calculation if cache missed
    const sourceDt = DateTime.now().setZone(sourceZone.value)
    const targetDt = DateTime.now().setZone(targetZone.value)
    if (!sourceDt.isValid || !targetDt.isValid) return 'Invalid timezone'
    const diff = targetDt.offset - sourceDt.offset
    const hours = Math.abs(Math.floor(diff / 60))
    const mins = Math.abs(diff % 60)
    const sign = diff < 0 ? '-' : '+'
    return `${sign}${hours}:${mins.toString().padStart(2, '0')} hours`
  } catch (error) {
    return 'Calculation error'
  }
})

const formatTimeZoneName = (zone: string) => {
  return zone.replace(/_/g, ' ')
}

const setTargetZone = async (zone: string) => {
  if (validateAndAddTimezone(zone)) {
    targetZone.value = zone
    targetZoneError.value = ''
    await cacheTimezone(zone)
  } else {
    targetZoneError.value = $formatTimezoneError(zone)
  }
}

// Copy converted time to clipboard
const copyConvertedTime = async () => {
  try {
    await navigator.clipboard.writeText(convertedTime.value)
    addToast('Time copied to clipboard', 'success')
  } catch (error) {
    addToast('Failed to copy time', 'error')
  }
}

// Swap source and target timezones
const swapTimezones = () => {
  const temp = sourceZone.value
  sourceZone.value = targetZone.value
  targetZone.value = temp
  handleSourceZoneChange()
  handleTargetZoneChange()
  addToast('Timezones swapped', 'success')
}

// Set current time
const setCurrentTime = () => {
  sourceDateTime.value = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm")
  addToast('Set to current time', 'success')
}
</script>