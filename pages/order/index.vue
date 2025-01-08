<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import { useAuthStore } from "~/store/Auth";
const useCart = useCartStore();
const useAuth = useAuthStore();
const isLoginModalOpen = ref<boolean>();
const { auth } = storeToRefs(useAuth);
</script>
<template>
  <BaseSection>
    <template #header>
      My Cart
      <div class="mt-4 block space-x-2 text-xs font-semibold text-neutral-400">
        <NuxtLink to="/">Home</NuxtLink>
        <span> > </span>
        <NuxtLink>My Cart</NuxtLink>
      </div>
    </template>

    <div class="flex justify-between gap-4">
      <div class="flex w-2/3 flex-col gap-4">
        <div
          v-for="item in useCart.cart"
          class="flex rounded-xl bg-secondary p-4"
        >
          <div class="w-24">
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
      </div>
      <div
        class="flex max-h-[30rem] flex-1 flex-col justify-between gap-6 rounded-xl bg-secondary p-6 text-sm"
      >
        <div class="flex justify-between">
          <h3 class="font-bold">Summary</h3>
          <span class="font-normal leading-[18.2px] text-neutral-600">
            ({{ 3 }} items)
          </span>
        </div>
        <div>
          <ul class="space-y-2">
            <li class="flex justify-between">
              <span class="font-normal">Subtotal:</span>
              <span class="font-semibold">P 120.00</span>
            </li>
            <li class="flex justify-between">
              <span class="font-normal">Shipping:</span>
              <span class="font-semibold">Calculated at checkout</span>
            </li>
            <hr class="my-4" />
            <li class="flex justify-between">
              <span class="font-normal">Total:</span>
              <span class="font-semibold">P 120.00</span>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-1 pt-6">
          <BaseFormButton
            @handleClick="
              auth ? navigateTo('/order/checkout') : (isLoginModalOpen = true)
            "
            >Checkout</BaseFormButton
          >
          <BaseFormButton to="/products" class="bg-secondary text-neutral-600"
            >Return to Shopping</BaseFormButton
          >
        </div>
      </div>
    </div>
  </BaseSection>
  <Teleport to="#teleports">
    <Login v-if="isLoginModalOpen" @closeModal="isLoginModalOpen = false" />
  </Teleport>
</template>
