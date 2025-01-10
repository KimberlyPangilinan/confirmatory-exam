<script setup lang="ts">
const menuLinks = [
  { text: "Burgers", to: "/menu/burgers" },
  { text: "Pizzas", to: "/menu/pizzas" },
  { text: "Drinks", to: "/menu/drinks" },
  { text: "Desserts", to: "/menu/desserts" },
  { text: "Combos", to: "/menu/combos" },
  { text: "Special Offers", to: "/menu/offers" },
];

const quickLinks = [
  { text: "Home", to: "/" },
  { text: "About Us", to: "/about" },
  { text: "Contact", to: "/contact" },
  { text: "Careers", to: "/careers" },
  { text: "FAQ", to: "/faq" },
  { text: "Locations", to: "/locations" },
  { text: "Feedback", to: "/feedback" },
  { text: "Support", to: "/support" },
];
</script>

<template>
  <footer class="border-t bg-white text-black">
    <!-- First Row -->
    <div class="container mx-auto grid grid-cols-12 gap-6 px-4 py-8">
      <!-- Logo Column -->
      <div class="col-span-12 sm:col-span-3 md:col-span-2">
        <div class="flex items-center justify-center">
          <img src="/images/Logo.png" alt="Company Logo" class="w-[40%]" />
        </div>
      </div>

      <!-- Company Info Column -->
      <div class="col-span-12 sm:col-span-3 md:col-span-3">
        <h3 class="mb-3 font-bold">Fast Food</h3>
        <p class="text-sm">
          3G Symphony Towers 1 Sgt. Esguerra Ave.<br />
          Brgy. South Triangle, Quezon City <br />
          Phone: (123) 456-7890
        </p>
      </div>

      <!-- Menu Column -->
      <div class="col-span-12 sm:col-span-3 md:col-span-3">
        <h3 class="mb-3 font-bold">Menu</h3>
        <div class="grid grid-cols-2 gap-2">
          <NuxtLink
            v-for="(link, index) in menuLinks"
            :key="`menu-${index}`"
            :to="link.to"
            class="text-sm hover:underline"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Links Column -->
      <div class="col-span-12 sm:col-span-3 md:col-span-3">
        <h3 class="mb-3 font-bold">Quick Links</h3>
        <div class="grid grid-cols-2 gap-2">
          <NuxtLink
            v-for="(link, index) in quickLinks"
            :key="`quick-${index}`"
            :to="link.to"
            class="text-sm hover:underline"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Second Row -->
    <div class="border-t py-4">
      <div class="container mx-auto flex items-center justify-between px-4">
        <!-- Social Media and Logo -->
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="https://facebook.com"
            class="text-black hover:text-gray-700"
          >
            <i class="fab fa-facebook-f"></i>
          </NuxtLink>
          <NuxtLink
            to="https://twitter.com"
            class="text-black hover:text-gray-700"
          >
            <i class="fab fa-twitter"></i>
          </NuxtLink>
          <NuxtLink
            to="https://instagram.com"
            class="text-black hover:text-gray-700"
          >
            <i class="fab fa-instagram"></i>
          </NuxtLink>
          <NuxtLink
            to="https://linkedin.com"
            class="text-black hover:text-gray-700"
          >
            <i class="fab fa-linkedin"></i>
          </NuxtLink>
          <img src="/images/Logo.png" alt="Small Logo" class="ml-4 h-8 w-8" />
        </div>

        <!-- Terms and Privacy -->
        <div class="space-x-4 text-sm text-gray-600">
          <NuxtLink to="/terms" class="hover:underline">Terms of Use</NuxtLink>
          <NuxtLink to="/privacy" class="hover:underline"
            >Privacy Policy</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>
