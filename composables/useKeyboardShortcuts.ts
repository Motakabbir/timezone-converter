import { useEventListener } from '@vueuse/core'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  handler: () => void
  description: string
}

export function useKeyboardShortcuts() {
  const shortcuts = ref<KeyboardShortcut[]>([])
  const showShortcuts = ref(false)

  const registerShortcut = (shortcut: KeyboardShortcut) => {
    shortcuts.value.push(shortcut)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    // Show shortcuts help when pressing '?'
    if (event.key === '?' && !event.ctrlKey && !event.altKey) {
      showShortcuts.value = !showShortcuts.value
      return
    }

    // Find and execute matching shortcut
    const matchingShortcut = shortcuts.value.find(
      (s) =>
        s.key.toLowerCase() === event.key.toLowerCase() &&
        !!s.ctrl === event.ctrlKey &&
        !!s.alt === event.altKey &&
        !!s.shift === event.shiftKey
    )

    if (matchingShortcut) {
      event.preventDefault()
      matchingShortcut.handler()
    }
  }

  onMounted(() => {
    useEventListener(document, 'keydown', handleKeydown)
  })

  return {
    registerShortcut,
    shortcuts,
    showShortcuts
  }
}