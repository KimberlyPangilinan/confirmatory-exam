<script setup lang="ts">
import { useCartStore } from "~/store/Cart";

const useCart = useCartStore();
const { cart } = storeToRefs(useCart);

const menuLinks = [
  { title: "Order Now", link: "/products" },
  { title: "Store Locator", link: "/" },
  { title: "FAQs", link: "/faq" },
  { title: "Cart", link: "/order" },
];
</script>
<template>
  <nav class="flex gap-4 text-base text-white">
    <NuxtLink
      v-for="(item, key) in menuLinks.slice(0, -1)"
      :key="key"
      :to="item.link"
      class="cursor-pointer whitespace-nowrap hover:font-bold"
      >{{ item.title }}</NuxtLink
    >
    <!-- Cart -->
    <div class="flex cursor-pointer gap-2 hover:font-bold">
      <NuxtLink to="/order" class="relative">
        <Icon name="bx:bxs-shopping-bag-alt" class="w-7" size="1.75rem" />
        <div
          v-if="cart"
          class="absolute right-[-4px] top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[8px]"
        >
          {{ cart.length }}
        </div>
      </NuxtLink>
      <div
        class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white font-bold text-primary"
      >
        0
      </div>
    </div>
  </nav>
</template>
