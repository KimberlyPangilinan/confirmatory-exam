<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";
import { useCartStore } from "~/store/Cart";

definePageMeta({
  middleware: ["authenticated"],
});

const useCart = useCartStore();
const useAuth = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);
checkoutForm.value = {
  id: 1,
  userId: 1,
  cart: useCart.cart || [],
  changeFor: 0,
};

const { auth } = storeToRefs(useAuth);
</script>
<template>
  <BaseSection v-if="auth && auth.user">
    <template #header>
      My Cart
      <div class="mt-4 block space-x-2 text-xs font-semibold text-neutral-400">
        <NuxtLink to="/">Home</NuxtLink>
        <span> > </span>
        <NuxtLink>My Cart</NuxtLink>
      </div>
    </template>
    <div class="flex gap-6">
      <OrderForm class="w-2/3" />
      <OrderSummary :step="2" class="w-1/3" />
    </div>
    <button @click="checkoutForm = { cartId: 1, userId: 1, date: new Date() }">
      Add
    </button>
  </BaseSection>
</template>
