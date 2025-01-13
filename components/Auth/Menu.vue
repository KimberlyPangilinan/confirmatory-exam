<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";

const { $toast } = useNuxtApp();
const authStore = useAuthStore();
const isDropdownMenuOpen = ref(false);
const { auth } = storeToRefs(authStore);

const handleLogout = () => {
  authStore.logout();
  $toast.success("Successfully logged out");
};
</script>
<template>
  <div v-if="auth" class="relative z-[90] inline-block text-left">
    <button
      @click="isDropdownMenuOpen = !isDropdownMenuOpen"
      class="flex items-center justify-center gap-2"
    >
      <img class="h-10 w-10 rounded-full" :src="auth.user?.avatar" />
      <span
        class="cursor-pointer capitalize text-white hover:font-bold"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {{ auth.user?.name }}
      </span>
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isDropdownMenuOpen"
        @mouseleave="isDropdownMenuOpen = false"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right cursor-pointer rounded-md bg-white capitalize shadow-lg ring-1 ring-black/5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <ul class="py-1" role="none">
          <li
            @click="navigateTo('/order/all')"
            class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            My Orders
          </li>
          <li
            @click="handleLogout"
            class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            Logout
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
