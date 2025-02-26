<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Time Zone Converter</h1>
    
    <div class="space-y-8 text-gray-600 dark:text-gray-400">
      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
        <p class="mb-4">
          Time Zone Converter was created to simplify the challenge of coordinating across different time zones. 
          Whether you're scheduling international meetings, planning travel, or connecting with friends and family worldwide, 
          our tool makes time zone conversion quick and intuitive.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>Instant time conversion between any two time zones</li>
          <li>User-friendly interface with dark mode support</li>
          <li>Automatic local time zone detection</li>
          <li>Real-time updates of current time</li>
          <li>Time difference calculation</li>
          <li>Support for all major time zones</li>
        </ul>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Technology</h2>
        <p class="mb-4">
          Built with modern web technologies including Nuxt.js 3, Vue.js, and Tailwind CSS. 
          We use the Luxon library for precise and reliable time zone calculations.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you. 
          Please review our <NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</NuxtLink> 
          and <NuxtLink to="/terms" class="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</NuxtLink> 
          for more information about how we handle your data.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Time Zone Converter',
  meta: [
    {
      name: 'description',
      content: 'Learn about Time Zone Converter - a modern tool for converting time across different time zones. Discover our features, mission, and technology stack.'
    }
  ]
})
</script>