<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useWebVitals } from '~/composables/useWebVitals'

// Initialize web vitals tracking
if (process.client) {
  const { init } = useWebVitals()
  onMounted(() => {
    init()
  })
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  @apply antialiased;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>