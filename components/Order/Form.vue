<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";
import { useCartStore } from "~/store/Cart";

const useCart = useCartStore();
const useAuth = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);
checkoutForm.value = {
  id: useAuth.auth && useAuth.auth.user ? useAuth.auth.user.id : 0,
  userId: 1,
  cart: useCart.cart || [],
  changeFor: 0,
};

const { auth } = storeToRefs(useAuth);
</script>
<template>
  <div class="space-y-6">
    <div v-if="auth && auth.user" class="space-y-4">
      <BaseCardSelect>
        <h3 class="text-sm font-bold capitalize text-black">
          {{ auth.user.name }}
        </h3>
        <p class="w-[16em] text-sm text-neutral-500">
          +63 912 345 6789 <br />
          chou.tzu-yu@email.com
        </p>
      </BaseCardSelect>
      <BaseCardSelect
        v-model="checkoutForm.address"
        :value="auth.user.homeAddress"
      >
        <template #header> My Home Address </template>
        <p class="w-[16em] text-sm text-neutral-500">
          {{ auth.user.homeAddress }}
        </p>
      </BaseCardSelect>
      <BaseCardSelect
        v-model="checkoutForm.address"
        :value="auth.user.workAddress"
      >
        <template #header> Work/Office </template>
        <p class="w-[16em] text-sm text-neutral-500">
          {{ auth.user.workAddress }}
        </p>
      </BaseCardSelect>
    </div>
    <h2 class="font-bold">Payment Option</h2>
    <div class="flex flex-wrap gap-4">
      <BaseCardSelect
        v-model="checkoutForm.paymentMethod"
        value="CASH ON DELIVERY"
      >
        <template #header>Cash on Delivery </template>
        <p class="w-[16em] text-sm text-neutral-500">
          Pay when you received the order
        </p>
      </BaseCardSelect>
      <BaseCardSelect v-model="checkoutForm.paymentMethod" value="PAYPAL">
        <template #header> PayPal </template>
        <p class="w-[16em] text-sm text-neutral-500">
          A new tab will open to access your account
        </p>
      </BaseCardSelect>
      <BaseCardSelect
        v-model="checkoutForm.paymentMethod"
        value="LOYALTY POINTS"
      >
        <template #header> Loyalty Points </template>
        <p class="w-[16em] text-sm text-neutral-500">
          Pay using your earned loyalty points
        </p>
      </BaseCardSelect>
      <BaseCardSelect v-model="checkoutForm.paymentMethod" value="PAYNAMICS">
        <template #header> Paynamics </template>
        <p class="w-[16em] text-sm text-neutral-500">
          Choose paynamics services available from you
        </p>
      </BaseCardSelect>

      <div class="block w-full">
        <BaseFormInput
          v-if="checkoutForm.paymentMethod == 'CASH ON DELIVERY'"
          class="w-1/2"
          color="bg-white"
          label="Change For"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
        <BaseFormInput
          class="flex !flex-row-reverse items-center justify-end"
          type="checkbox"
          label="Request Cutlery"
          v-model="checkoutForm.requestCutlery"
          :checked="checkoutForm.requestCutlery"
        />
      </div>
    </div>
    <h2 class="font-bold">Delivery Instruction</h2>
    <textarea
      v-model="checkoutForm.delivery"
      rows="10"
      class="w-full rounded-xl border bg-white p-4 outline-none focus:outline-red-700"
    ></textarea>
  </div>
</template>
