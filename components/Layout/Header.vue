<script setup>
import { useAuth } from "~/store/useAuth";

const isLoginModalOpen = ref(false);
const authStorage = useAuth();
const { token, auth } = storeToRefs(authStorage);
// const { data, status, error } = useCustomFetch('/auth/profile')
</script>
<template>
  <header
    class="flex h-[111px] items-center justify-between rounded-b-lg bg-primary px-[49px] py-[10px]"
  >
    <img src="/images/Logo Inverted.png" class="w-[67px]" />
    <div class="flex items-center justify-center gap-4">
      <nav class="flex gap-4 text-sm text-white">
        <NuxtLink to="/products" class="whitespace-nowrap">Order Now</NuxtLink>
        <NuxtLink to="/" class="whitespace-nowrap">Store Locator</NuxtLink>
        <NuxtLink class="whitespace-nowrap">FAQs</NuxtLink>
        <div class="flex gap-2">
          <Icon name="bx:bxs-shopping-bag-alt" class="w-7" size="1.75rem" />
          <div
            class="notification flex h-7 w-7 items-center justify-center rounded-full bg-white font-bold text-primary"
          >
            0
          </div>
        </div>
      </nav>
      <span
        v-if="auth"
        @handleClick="isLoginModalOpen = true"
        class="text-white"
        >{{ token.slice(0, 6) }} dd
      </span>
      <BaseFormButton
        v-else
        @handleClick="isLoginModalOpen = true"
        class="btn-secondary"
        >Login</BaseFormButton
      >
    </div>
    <Login v-if="isLoginModalOpen" @closeModal="isLoginModalOpen = false" />
  </header>
</template>
