<template>
  <div class="py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Time Zone Converter</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert time between any two time zones instantly. Perfect for scheduling meetings, planning travel, or coordinating across different regions.
      </p>
    </div>
    <TimeZoneConverter />
    <div class="mt-12 max-w-3xl mx-auto">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to Use</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="text-primary-600 dark:text-primary-400 mb-2">1. Select Source</div>
          <p class="text-gray-600 dark:text-gray-400">Choose your starting time zone and enter the date and time</p>
        </div>
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="text-primary-600 dark:text-primary-400 mb-2">2. Select Target</div>
          <p class="text-gray-600 dark:text-gray-400">Pick the time zone you want to convert to</p>
        </div>
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="text-primary-600 dark:text-primary-400 mb-2">3. Get Result</div>
          <p class="text-gray-600 dark:text-gray-400">See the converted time and time difference instantly</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Time Zone Converter',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  description: 'Convert time between any two time zones instantly. Perfect for scheduling meetings, planning travel, or coordinating across different regions.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  features: [
    'Instant time zone conversion',
    'Dark mode support',
    'Recent timezone history',
    'Real-time updates',
    'PWA support'
  ]
}

useHead({
  title: 'Time Zone Converter - Convert Time Across Zones Instantly',
  meta: [
    {
      name: 'description',
      content: 'Free online time zone converter tool. Convert time between any two time zones instantly. Perfect for scheduling meetings and coordinating across different regions.'
    },
    {
      name: 'keywords',
      content: 'time zone converter, timezone calculator, time difference, world clock, international time'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schemaData)
    }
  ]
})
</script>