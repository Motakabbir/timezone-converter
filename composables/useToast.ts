interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout?: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
  const addToast = (message: string, type: Toast['type'] = 'info', timeout = 3000) => {
    const id = nextId++
    const toast: Toast = {
      id,
      message,
      type,
      timeout
    }
    toasts.value.push(toast)

    if (timeout) {
      setTimeout(() => {
        removeToast(id)
      }, timeout)
    }
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearToasts
  }
}