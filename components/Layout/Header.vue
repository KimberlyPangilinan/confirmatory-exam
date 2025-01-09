<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCartStore } from "~/store/Cart";

const isLoginModalOpen = ref(false);
const useAuth = useAuthStore();
const useCart = useCartStore();
const { auth, error } = storeToRefs(useAuth);
const { cart } = storeToRefs(useCart);
</script>
<template>
  <header
    class="flex h-[111px] items-center justify-between rounded-b-lg bg-primary px-[49px] py-[10px]"
  >
    <NuxtLink to="/"
      ><img src="/images/Logo Inverted.png" class="w-[67px]"
    /></NuxtLink>
    <div class="flex items-center justify-center gap-4">
      <nav class="flex gap-4 text-sm text-white">
        <NuxtLink
          to="/products"
          class="cursor-pointer whitespace-nowrap hover:font-bold"
          >Order Now</NuxtLink
        >
        <NuxtLink
          to="/"
          class="cursor-pointer whitespace-nowrap hover:font-bold"
          >Store Locator</NuxtLink
        >
        <NuxtLink class="cursor-pointer whitespace-nowrap hover:font-bold"
          >FAQs</NuxtLink
        >
        <NuxtLink to="/order" class="flex cursor-pointer gap-2 hover:font-bold">
          <Icon name="bx:bxs-shopping-bag-alt" class="w-7" size="1.75rem" />
          <div
            class="notification flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white font-bold text-primary"
          >
            {{ cart ? cart.length : 0 }}
          </div>
        </NuxtLink>
      </nav>

      <span
        :title="'Logout'"
        v-if="auth"
        @click="useAuth.logout"
        class="cursor-pointer text-white hover:font-bold"
      >
        {{ auth.user?.name }}
      </span>
      <BaseFormButton
        v-else
        @handleClick="isLoginModalOpen = true"
        class="btn-secondary"
        >Login</BaseFormButton
      >
    </div>
    <Teleport to="#teleports">
      <Login
        v-if="isLoginModalOpen"
        @closeModal="
          isLoginModalOpen = false;
          error = null;
        "
      />
    </Teleport>
  </header>
</template>
