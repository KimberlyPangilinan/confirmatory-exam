<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
const useCart = useCartStore();
</script>
<template>
  <BaseSection>
    <template #header>
      My Cart
      <div class="block space-x-2 text-xs font-semibold text-neutral-400">
        <NuxtLink to="/">Home</NuxtLink>
        <span> > </span>
        <NuxtLink>My Cart</NuxtLink>
      </div>
    </template>

    <div v-for="item in useCart.cart" class="flex rounded-xl bg-secondary p-4">
      <div class="w-20">
        <img :src="item.image" />
      </div>
      <div class="flex flex-1 flex-col justify-between px-4">
        <div class="flex justify-between">
          <h3 class="text-sm font-bold" v-html="item.productName"></h3>
          <div class="text-lg font-semibold text-green-700">
            P {{ item.price }}
          </div>
        </div>
        <div>
          <div class="inline-flex items-center font-semibold">
            <BaseFormButton
              class="rounded-none rounded-l-md bg-neutral-50 text-black"
              @click="item.quantity--"
              >-
            </BaseFormButton>
            <span class="bg-neutral-50 px-6 py-2">{{ item.quantity }}</span>
            <BaseFormButton
              class="rounded-none rounded-r-md bg-neutral-50 text-black"
              @click="item.quantity++"
              >+
            </BaseFormButton>
          </div>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
