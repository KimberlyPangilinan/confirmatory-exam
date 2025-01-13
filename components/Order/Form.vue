<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";
import { useCartStore } from "~/store/Cart";

const cartStore = useCartStore();
const authStore = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);
const { auth } = storeToRefs(authStore);

// checkoutForm.value = {
//   id: cartStore.cart.length || 1,
//   userId: Number(auth.value && auth.value.user?.id),
//   total: cartStore.total,
//   cart: cartStore.cart,
//   changeFor: 0,
//   address: auth.value && auth.value.user?.homeAddress || "",
//   paymentMethod: "CASH ON DELIVERY",
//   deliveryMethod: "STANDARD",
//   deliveryInstructions: "",
// };
</script>
<template>
  <div class="space-y-6" v-if="checkoutForm">
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
      <BaseCardSelect v-model="checkoutForm.paymentMethod" value="CARD">
        <template #header> Card </template>
        <p class="w-[16em] text-sm text-neutral-500">
          Choose paynamics services available from you
        </p>
      </BaseCardSelect>

      <div
        v-if="checkoutForm.paymentMethod == 'CASH ON DELIVERY'"
        class="block w-full"
      >
        <BaseFormInput
          class="w-1/2"
          color="bg-white"
          label="Change For"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
      </div>
      <div
        v-if="checkoutForm.paymentMethod == 'CARD'"
        class="flex w-1/2 flex-wrap gap-2"
      >
        <BaseFormInput
          class="w-full"
          color="bg-white"
          label="Card Number"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
        <BaseFormInput
          class="w-1/2"
          color="bg-white"
          label="Exp. Date"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
        <BaseFormInput
          color="bg-white"
          label="CCV"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
        <BaseFormInput
          class="w-full"
          color="bg-white"
          label="Card Holder"
          placeholder="Enter Cash Amount"
          v-model="checkoutForm.changeFor"
        />
      </div>
    </div>
    <h2 class="font-bold">Delivery Method</h2>
    <div class="flex flex-wrap gap-4">
      <BaseCardSelect
        v-model="checkoutForm.paymentMethod"
        value="CASH ON DELIVERY"
      >
        <template #header>Standard </template>
        <p class="w-[16em] text-sm text-neutral-500">
          Pay when you received the order
        </p>
      </BaseCardSelect>
      <BaseCardSelect v-model="checkoutForm.paymentMethod" value="PAYPAL">
        <template #header> Express </template>
        <p class="w-[16em] text-sm text-neutral-500">
          A new tab will open to access your account
        </p>
      </BaseCardSelect>
    </div>
    <h2 class="font-bold">Delivery Instruction</h2>
    <textarea
      v-model="checkoutForm.deliveryInstructions"
      rows="10"
      class="w-full rounded-xl border bg-white p-4 outline-none focus:outline-red-700"
    ></textarea>
  </div>
</template>
