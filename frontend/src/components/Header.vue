<template>
  <nav
    class="flex items-center py-5 bg-ghibli-background shadow shadow-neutral-700/3"
  >
    <!-- Logo -->
    <RouterLink to="/" class="mb-4 md:mb-0">
      <img
        src="../assets/logo.png"
        alt="Totoro"
        class="h-20 md:h-24 transition-transform hover:scale-110 mr-6"
      />
    </RouterLink>

    <!-- Menu -->
    <div class="flex space-x-6 md:space-x-8">
      <RouterLink
        v-for="(link, index) in navLinks"
        :key="index"
        :to="link.to"
        class="text-lg md:text-xl text-neutral font-semibold hover:text-neutral-200 transition-colors"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
  { label: "Profile", to: "/profile" },
];
</script>
