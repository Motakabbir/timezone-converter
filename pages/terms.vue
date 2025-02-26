<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms and Conditions</h1>
    
    <div class="space-y-8 prose dark:prose-invert max-w-none">
      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
        <p class="text-gray-600 dark:text-gray-400">
          By accessing and using the Time Zone Converter application, you acknowledge that you have read, 
          understood, and agree to be bound by these Terms and Conditions.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">2. Use License</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We grant you a personal, non-exclusive, non-transferable license to use the Time Zone Converter 
          application for your personal or business needs.
        </p>
        <ul class="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
          <li>The service is provided "as is" without warranties</li>
          <li>You may not modify or copy the application's code</li>
          <li>You may not use the service for illegal purposes</li>
        </ul>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">3. Disclaimer</h2>
        <p class="text-gray-600 dark:text-gray-400">
          While we strive for accuracy in time zone conversions, we cannot guarantee that the service will 
          be error-free or uninterrupted. Users should verify critical time conversions through multiple sources.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">4. Limitations</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We shall not be liable for any direct, indirect, incidental, or consequential damages resulting 
          from the use or inability to use our service.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">5. Changes to Terms</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We reserve the right to modify these terms at any time. Continued use of the service after changes 
          constitutes acceptance of the new terms.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">6. Governing Law</h2>
        <p class="text-gray-600 dark:text-gray-400">
          These terms shall be governed by and construed in accordance with applicable laws, without regard 
          to its conflict of law provisions.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Terms and Conditions - Time Zone Converter',
  meta: [
    {
      name: 'description',
      content: 'Read our Terms and Conditions to understand your rights and responsibilities when using the Time Zone Converter tool.'
    }
  ]
})
</script>