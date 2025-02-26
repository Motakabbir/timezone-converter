<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
    
    <div class="space-y-8 prose dark:prose-invert max-w-none">
      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Information Collection</h2>
        <p class="text-gray-600 dark:text-gray-400">
          The Time Zone Converter application collects minimal user information. We automatically detect your time zone 
          to provide a better user experience, but this information is processed locally and is not stored on our servers.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Usage of Information</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Any information collected is used solely for the purpose of providing the time zone conversion service. 
          We do not share, sell, or distribute your information to third parties.
        </p>
        <ul class="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
          <li>Local timezone detection for automatic configuration</li>
          <li>Temporary storage of your preferences (e.g., dark mode setting)</li>
          <li>Anonymous usage statistics to improve our service</li>
        </ul>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Cookies and Local Storage</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We use local storage to remember your preferences, such as dark mode settings and recently used time zones. 
          This data remains on your device and is not transmitted to our servers.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Updates to Privacy Policy</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We may update this privacy policy from time to time. Any changes will be posted on this page, 
          and if significant changes are made, we will provide a more prominent notice.
        </p>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
        <p class="text-gray-600 dark:text-gray-400">
          If you have any questions about our privacy policy or how we handle your data, 
          please contact us through the provided channels on our About page.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Time Zone Converter',
  meta: [
    {
      name: 'description',
      content: 'Our privacy policy explains how we handle your information and protect your privacy while using our Time Zone Converter tool.'
    }
  ]
})
</script>