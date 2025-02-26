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
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
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
          <div class="space-y-4">
            <div v-for="shortcut in shortcuts" :key="shortcut.key" class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">{{ shortcut.description }}</span>
              <kbd class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">
                {{ formatShortcut(shortcut) }}
              </kbd>
            </div>
            <div class="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Press <kbd class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">?</kbd> to toggle this help dialog
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { KeyboardShortcut } from '~/types/keyboard'

const props = defineProps<{
  show: boolean
  shortcuts: KeyboardShortcut[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}

const formatShortcut = (shortcut: KeyboardShortcut) => {
  const parts: string[] = []
  if (shortcut.ctrl) parts.push('Ctrl')
  if (shortcut.alt) parts.push('Alt')
  if (shortcut.shift) parts.push('Shift')
  parts.push(shortcut.key.toUpperCase())
  return parts.join(' + ')
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