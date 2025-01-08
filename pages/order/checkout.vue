<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import { useAuthStore } from "~/store/Auth";

const useAuth = useAuthStore();
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

    <div class="flex justify-between gap-4">
      <div class="w-2/3 space-y-8">
        <div class="space-y-4">
          <BaseCard>
            <template #header>
              {{ auth.user.name }}
            </template>
            <p class="w-[16em] text-sm text-neutral-500">
              +63 912 345 6789 <br />
              chou.tzu-yu@email.com
            </p>
          </BaseCard>
          <BaseCard>
            <template #header> My Home Address </template>
            <p class="w-[16em] text-sm text-neutral-500">
              No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234
              Philippines
            </p>
          </BaseCard>
          <BaseCard>
            <template #header> Work/Office </template>
            <p class="w-[16em] text-sm text-neutral-500">
              3rd flr Anyeong Bldg. Seareal St. Joaqin City 3456 Philippines
            </p>
          </BaseCard>
        </div>
        <h2 class="font-bold">Payment Option</h2>
        <div class="flex flex-wrap gap-4">
          <BaseCard>
            <template #header> My Home Address </template>
            <p class="w-[16em] text-sm text-neutral-500">
              No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234
              Philippines
            </p>
          </BaseCard>
          <BaseCard>
            <template #header> My Home Address </template>
            <p class="w-[16em] text-sm text-neutral-500">
              No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234
              Philippines
            </p>
          </BaseCard>
          <BaseCard>
            <template #header> My Home Address </template>
            <p class="w-[16em] text-sm text-neutral-500">
              No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234
              Philippines
            </p>
          </BaseCard>
          <BaseCard>
            <template #header> My Home Address </template>
            <p class="w-[16em] text-sm text-neutral-500">
              No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234
              Philippines
            </p>
          </BaseCard>

          <div class="block w-full">
            <BaseFormInput
              class="w-1/2"
              color="bg-white"
              label="Change For"
              placeholder="Enter Cash Amount"
            />
            <BaseFormInput
              class="flex !flex-row-reverse items-center justify-end"
              type="checkbox"
              label="Request Cutlery"
            />
          </div>
        </div>
        <h2 class="font-bold">Delivery Instruction</h2>
        <textarea
          rows="10"
          class="w-full rounded-xl border bg-white p-4 outline-none focus:outline-red-700"
        ></textarea>
      </div>
      <OrderSummary />
    </div>
  </BaseSection>
</template>
