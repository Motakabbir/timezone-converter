<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click="close">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="fixed inset-0 bg-black opacity-30"></div>
        <div 
          class="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-xl"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
            <button 
              @click="close"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <!-- Export Settings -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Export Settings</h3>
              <button
                @click="exportSettings"
                class="w-full px-4 py-2 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-md hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                Download Settings
              </button>
            </div>

            <!-- Import Settings -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Import Settings</h3>
              <label class="block">
                <span class="sr-only">Choose settings file</span>
                <input
                  type="file"
                  accept=".json"
                  @change="handleFileUpload"
                  class="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-primary-100 file:text-primary-700
                    dark:file:bg-primary-900 dark:file:text-primary-300
                    hover:file:bg-primary-200 dark:hover:file:bg-primary-800
                    transition-colors"
                />
              </label>
            </div>

            <!-- Analytics Preference -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Analytics</h3>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="analyticsEnabled"
                  class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Enable analytics to help improve the application
                </span>
              </label>
            </div>

            <!-- Clear Data -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Clear Data</h3>
              <button
                @click="clearData"
                class="w-full px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useTimezoneSettings } from '~/composables/useTimezoneSettings'
import { useTimezoneStore } from '~/stores/timezones'
import { useTimezoneCache } from '~/composables/useTimezoneCache'
import { useAnalytics } from '~/composables/useAnalytics'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>()

const { exportSettings, importSettings } = useTimezoneSettings()
const { clearCache } = useTimezoneCache()
const store = useTimezoneStore()
const { addToast } = useToast()
const { isAnalyticsEnabled } = useAnalytics()

const analyticsEnabled = computed({
  get: () => isAnalyticsEnabled.value,
  set: (value) => {
    localStorage.setItem('analytics-preference', value ? 'accepted' : 'rejected')
    isAnalyticsEnabled.value = value
  }
})

const close = () => {
  emit('close')
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  const success = await importSettings(file)
  if (success) {
    emit('update')
    close()
  }
  input.value = '' // Reset input
}

const clearData = async () => {
  if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return

  try {
    await clearCache()
    store.$reset()
    localStorage.clear()
    addToast('All data cleared successfully', 'success')
    emit('update')
    close()
  } catch (error) {
    addToast('Failed to clear data', 'error')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>