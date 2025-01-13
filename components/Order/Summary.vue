<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";

const { step = 1 } = defineProps({
  step: Number,
});
const cartStore = useCartStore();
const authStore = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);

const isLoginModalOpen = ref<boolean>();
const { auth } = storeToRefs(authStore);

checkoutForm.value = {
  id: cartStore.cart.length || 1,
  userId: Number(auth.value && auth.value.user?.id),
  total: cartStore.total,
  cart: cartStore.cart,
  changeFor: 0,
  address: (auth.value && auth.value.user?.homeAddress) || "",
  paymentMethod: "CASH ON DELIVERY",
  deliveryMethod: "STANDARD",
  deliveryInstructions: "",
};

const {
  data,
  status,
  error,
  execute: handleValidate,
} = useAsyncData(
  "validate",
  () => {
    if (!checkoutForm.value) {
      throw new Error("Checkout form is undefined.");
    }
    return useCheckout.validate(checkoutForm.value);
  },
  {
    immediate: false,
  },
);

const {
  data: checkout,
  status: processStatus,
  error: processError,
  execute: handleProcess,
} = useAsyncData(
  "checkout",
  () => {
    return useCheckout.process({
      ...checkoutForm.value,
      changeFor: checkoutForm.value && Number(checkoutForm.value.changeFor),
    });
  },
  {
    immediate: false,
  },
);

const {
  data: order,
  status: orderStatus,
  error: orderError,
  execute: handleOrder,
} = useAsyncData(
  "order",
  () => {
    if (!checkoutForm.value) {
      throw new Error("Checkout form is undefined.");
    }
    return useCheckout.checkout(checkoutForm.value);
  },
  {
    immediate: false,
  },
);
const validate = async () => {
  await handleValidate();
  status.value == "success" && data.value && navigateTo("/order/checkout");
};

watch(order, () => {
  if (order.value) {
    navigateTo("/order/success");
    cartStore.clearCart();
  }
});
</script>
<template>
  <div
    v-if="cartStore && cartStore.cart"
    class="flex max-h-[24rem] flex-1 flex-col justify-between gap-6 rounded-xl bg-secondary p-6 text-sm"
  >
    {{ checkoutForm }}
    <div class="flex justify-between">
      <h3 class="font-bold">Summary</h3>
      <span class="font-normal leading-[18.2px] text-neutral-600">
        ({{ cartStore.cart.length }} items)
      </span>
    </div>
    <div>
      <ul class="space-y-2">
        <li class="flex justify-between">
          <span class="font-normal">Subtotal:</span>
          <span class="font-semibold">{{
            $formatCurrency(cartStore.total, "PHP")
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
            $formatCurrency(cartStore.total, "PHP")
          }}</span>
        </li>
      </ul>
    </div>

    <!-- TODO: return validation messages  -->
    <span class="text-primary" v-if="step == 1">{{ error && error.data }}</span>
    <span class="text-primary" v-if="step == 2">{{
      processError && processError.message
    }}</span>
    <span class="text-primary" v-if="checkout">{{
      orderError && orderError.data
    }}</span>

    <div class="flex flex-col gap-1 pt-6">
      <BaseFormButton
        v-if="step == 1"
        :loading="status == 'pending'"
        @handleClick="auth ? validate() : (isLoginModalOpen = true)"
        >Continue</BaseFormButton
      >
      <BaseFormButton
        v-if="step == 2"
        :loading="processStatus == 'pending'"
        @handleClick="handleProcess"
        >Checkout
      </BaseFormButton>
      <BaseFormButton
        v-if="checkout"
        :loading="orderStatus == 'pending'"
        @handleClick="handleOrder"
        >Submit Order
      </BaseFormButton>
      <BaseFormButton to="/products" class="bg-secondary text-neutral-600"
        >Return to Shopping</BaseFormButton
      >
    </div>
  </div>
  <Teleport to="#teleports">
    <Login v-if="isLoginModalOpen" @closeModal="isLoginModalOpen = false" />
  </Teleport>
</template>
