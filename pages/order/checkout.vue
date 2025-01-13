<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";
import { useCartStore } from "~/store/Cart";

definePageMeta({
  middleware: ["authenticated"],
});

const cartStore = useCartStore();
const authStore = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);
checkoutForm.value = {
  id: 1,
  userId: 1,
  cart: cartStore.cart || [],
  changeFor: 0,
};

const { auth } = storeToRefs(authStore);
</script>
<template>
  <BaseSection v-if="auth && auth.user">
    <template #header>
      My Cart
      <div class="mt-4 block space-x-2 text-sm font-semibold text-neutral-400">
        <NuxtLink to="/">Home</NuxtLink>
        <span> > </span>
        <NuxtLink to="/order">My Cart</NuxtLink>
        <span> > </span>
        <NuxtLink>Checkout</NuxtLink>
      </div>
    </template>
    <div class="flex gap-6">
      <OrderForm class="w-2/3" />
      <OrderSummary :step="2" class="w-1/3" />
    </div>
  </BaseSection>
</template>
