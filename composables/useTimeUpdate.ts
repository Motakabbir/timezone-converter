import { ref, onMounted, onUnmounted } from 'vue'

export function useTimeUpdate(intervalMs = 1000) {
  const currentTime = ref(new Date())
  let intervalId: NodeJS.Timeout | null = null

  const updateTime = () => {
    currentTime.value = new Date()
  }

  onMounted(() => {
    updateTime()
    intervalId = setInterval(updateTime, intervalMs)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    currentTime
  }
}