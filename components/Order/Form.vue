<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import { useCheckoutStore } from "~/store/Checkout";

const authStore = useAuthStore();
const useCheckout = useCheckoutStore();

const { checkoutForm } = storeToRefs(useCheckout);
const { auth } = storeToRefs(authStore);
const billingSameWithShipping = ref(false);
const shippingAddress = ref("HOME");
watch([billingSameWithShipping, shippingAddress], () => {
  if (checkoutForm.value?.paymentDetails && billingSameWithShipping.value) {
    checkoutForm.value.paymentDetails.billingDetails =
      checkoutForm.value.address;
  }
});
</script>
<template>
  <div>
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
          @click="checkoutForm.address = auth.user.homeAddress"
          v-model="shippingAddress"
          value="HOME"
        >
          <template #header> My Home Address </template>
          <p class="w-[16em] text-sm text-neutral-500">
            {{ formatAddress(auth.user.homeAddress) }}
          </p>
        </BaseCardSelect>
        <BaseCardSelect
          @click="checkoutForm.address = auth.user.workAddress"
          v-model="shippingAddress"
          value="WORK"
        >
          <template #header> Work/Office </template>
          <p class="w-[16em] text-sm text-neutral-500">
            {{ formatAddress(auth.user.workAddress) }}
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
          <template #header
            ><img
              src="/images/payment/PayPal-Logo.png"
              class="max-h-10 max-w-24"
          /></template>
          <p class="w-[16em] text-sm text-neutral-500">
            A new tab will open to access your account
          </p>
        </BaseCardSelect>
        <BaseCardSelect v-model="checkoutForm.paymentMethod" value="PAYNAMICS">
          <template #header>
            <img
              src="/images/payment/paynamics_rgb.png"
              class="max-h-10 max-w-24"
            />
          </template>
          <p class="w-[16em] text-sm text-neutral-500">
            Choose paynamics services available from you
          </p>
        </BaseCardSelect>
        <BaseCardSelect v-model="checkoutForm.paymentMethod" value="CARD">
          <template #header>
            <img
              src="/images/payment/Mastercard-Emblem.png"
              class="max-h-10 max-w-24"
            />
          </template>
          <p class="w-[16em] text-sm text-neutral-500">
            Choose Mastercard savings for you
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
          v-if="
            checkoutForm.paymentMethod == 'CARD' && checkoutForm.paymentDetails
          "
          class="flex w-1/2 flex-wrap gap-2"
        >
          {{ checkoutForm.paymentDetails.billingDetails }}
          <h3 class="w-full font-semibold text-neutral-500">Card Details</h3>
          <BaseFormInput
            required
            color="bg-white"
            label="Card Number"
            placeholder="Enter Card Number"
            v-model="checkoutForm.paymentDetails.cardNumber"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="Exp. Date"
            placeholder="MM/YY"
            v-model="checkoutForm.paymentDetails.expirationDate"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="CCV"
            placeholder="Enter CVV"
            v-model="checkoutForm.paymentDetails.cvv"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="Card Holder"
            placeholder="Enter card holder name"
            v-model="checkoutForm.paymentDetails.cardHolderName"
          />
          <h3 class="w-full font-semibold text-neutral-500">Billing Details</h3>
          <label for="billingCheckbox" class="flex w-full items-center gap-2">
            <input
              id="billingCheckbox"
              type="checkbox"
              v-model="billingSameWithShipping"
            />
            Same as Shipping Address
          </label>
          <BaseFormInput
            required
            color="bg-white"
            label="Street"
            placeholder="Enter Street"
            v-model="checkoutForm.paymentDetails.billingDetails.street"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="City"
            placeholder="Enter City"
            v-model="checkoutForm.paymentDetails.billingDetails.city"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="state"
            placeholder="Enter state "
            v-model="checkoutForm.paymentDetails.billingDetails.state"
          />
          <BaseFormInput
            required
            color="bg-white"
            label="zipCode"
            placeholder="Enter ZipCode "
            v-model="checkoutForm.paymentDetails.billingDetails.zipCode"
          />
        </div>
      </div>
      <h2 class="font-bold">Delivery Method</h2>
      <div class="flex flex-wrap gap-4">
        <BaseCardSelect v-model="checkoutForm.deliveryMethod" value="STANDARD">
          <template #header>Standard </template>
          <p class="w-[16em] text-sm text-neutral-500">
            Pay when you received the order
          </p>
        </BaseCardSelect>
        <BaseCardSelect v-model="checkoutForm.deliveryMethod" value="EXPRESS">
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
  </div>
</template>
