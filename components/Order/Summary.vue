<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import { useAuthStore } from "~/store/Auth";
const useCart = useCartStore();
const useAuth = useAuthStore();
const isLoginModalOpen = ref<boolean>();
const { auth } = storeToRefs(useAuth);
</script>
<template>
  <div
    class="flex max-h-[20rem] flex-1 flex-col justify-between gap-6 rounded-xl bg-secondary p-6 text-sm"
  >
    <div class="flex justify-between">
      <h3 class="font-bold">Summary</h3>
      <span class="font-normal leading-[18.2px] text-neutral-600">
        ({{ useCart.cart.length }} items)
      </span>
    </div>
    <div>
      <ul class="space-y-2">
        <li class="flex justify-between">
          <span class="font-normal">Subtotal:</span>
          <span class="font-semibold">{{
            $formatCurrency(useCart.total, "PHP")
          }}</span>
        </li>
        <li class="flex justify-between">
          <span class="font-normal">Shipping:</span>
          <span class="font-semibold">Calculated at checkout</span>
        </li>
        <hr class="my-4" />
        <li class="flex justify-between">
          <span class="font-normal">Total:</span>
          <span class="font-semibold">{{
            $formatCurrency(useCart.total, "PHP")
          }}</span>
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
</template>
