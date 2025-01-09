<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";

const { step = 1 } = defineProps({
  step: Number,
});
const useCart = useCartStore();
const useAuth = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);

const isLoginModalOpen = ref<boolean>();
const { auth } = storeToRefs(useAuth);

checkoutForm.value = {
  userId: Number(auth.value && auth.value.user?.id),
  total: useCart.total,
  cart: useCart.cart,
};

const {
  data,
  status,
  error,
  execute: handleValidate,
} = useAsyncData("validate", () => useCart.validate(checkoutForm.value), {
  immediate: false,
});

const {
  data: checkout,
  error: e,
  execute: handleProcess,
} = useAsyncData("checkout", () => useCheckout.process(checkoutForm.value), {
  immediate: false,
});

const {
  data: order,
  error: errorOrder,
  execute: handleOrder,
} = useAsyncData("order", () => useCheckout.checkout(checkoutForm.value), {
  immediate: false,
});
const validate = async () => {
  await handleValidate();
  status.value == "success" && data.value && navigateTo("/order/checkout");
};

watch(order, () => {
  if (order.value) {
    navigateTo("/order/success");
    useCart.clearCart();
  }
});
</script>
<template>
  <div
    v-if="useCart && useCart.cart"
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
    <span class="text-primary" v-if="step == 1">{{ error && error.data }}</span>
    <span class="text-primary" v-if="step == 2">{{ e && e.data }}</span>
    <div class="flex flex-col gap-1 pt-6">
      <BaseFormButton
        :loading="status == 'pending'"
        v-if="step == 1"
        @handleClick="auth ? validate() : (isLoginModalOpen = true)"
        >Continue</BaseFormButton
      >
      <BaseFormButton v-if="step == 2" @handleClick="handleProcess"
        >Checkout</BaseFormButton
      >
      <BaseFormButton v-if="checkout" @handleClick="handleOrder"
        >Submit Order</BaseFormButton
      >
      <BaseFormButton to="/products" class="bg-secondary text-neutral-600"
        >Return to Shopping</BaseFormButton
      >
    </div>
  </div>
  <Teleport to="#teleports">
    <Login v-if="isLoginModalOpen" @closeModal="isLoginModalOpen = false" />
  </Teleport>
</template>
