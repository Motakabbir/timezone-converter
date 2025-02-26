<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <header class="bg-primary-600 text-white shadow-lg">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold">TimeZone Converter</NuxtLink>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="hover:text-primary-200">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-primary-200">About</NuxtLink>
          <DarkModeToggle />
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8 animate-fade-in">
      <slot />
    </main>

    <footer class="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <p class="text-gray-600 dark:text-gray-300">&copy; {{ new Date().getFullYear() }} TimeZone Converter. All rights reserved.</p>
          </div>
          <div class="flex space-x-4">
            <NuxtLink to="/privacy" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Terms & Conditions</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>