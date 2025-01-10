<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import type { CartItemType } from "~/types/Cart";

const isLoginModalOpen = ref<boolean>();
const isRemoving = ref(false);
const isRemovingAll = ref(false);
const currentItem = ref();

const useCart = useCartStore();

const updateQuantity = (cartItem: CartItemType, increment = true) => {
  currentItem.value = cartItem;
  if (increment) {
    cartItem.quantity++;
  } else {
    if (cartItem.quantity <= 1) {
      isRemoving.value = true;
      return;
    }
    cartItem.quantity--;
  }
};

const removeAllItems = () => {
  useCart.clearCart();
  isRemovingAll.value = false;
};
const removeItem = () => {
  useCart.removeItem(currentItem.value);
  isRemoving.value = false;
};
</script>
<template>
  <BaseSection>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          My Cart
          <div
            class="mt-4 block space-x-2 text-sm font-semibold text-neutral-400"
          >
            <NuxtLink to="/">Home</NuxtLink>
            <span> > </span>
            <NuxtLink>My Cart</NuxtLink>
          </div>
        </div>
        <button
          v-if="useCart.cart.length"
          @click="isRemovingAll = true"
          class="cursor-pointer text-base font-semibold text-primary hover:underline"
        >
          Remove All
        </button>
      </div>
    </template>

    <div v-if="useCart.cart.length" class="flex justify-between gap-4">
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
                  @click="updateQuantity(item, false)"
                  >-
                </BaseFormButton>
                <span class="bg-neutral-50 px-6 py-2">{{ item.quantity }}</span>
                <BaseFormButton
                  class="rounded-none rounded-r-md bg-neutral-50 text-black"
                  @click="updateQuantity(item, true)"
                  >+
                </BaseFormButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderSummary :step="1" />
    </div>
    <div
      v-else
      class="flex h-[60vh] w-full flex-col items-center justify-center gap-2"
    >
      <img src="/images/cart.png" class="w-40" />
      <h2 class="mt-2 text-2xl">Your Cart is empty</h2>
      <p class="w-[50vh] text-center text-neutral-400">
        Looks like you have not yed added any in your cart. Go ahead and
        <NuxtLink
          to="/products"
          class="cursor-pointer font-bold text-primary hover:underline"
          >explore</NuxtLink
        >
        popular products
      </p>
    </div>
  </BaseSection>
  <Teleport to="#teleports">
    <BaseModal
      @closeModal="isRemovingAll = false"
      :modalVisible="isRemovingAll"
      size="w-[30vw]"
    >
      <template #header><h2>Removing all items</h2></template>
      <template #default
        ><p class="pb-4">Are you sure to remove all items?</p></template
      >
      <template #footer>
        <BaseFormButton @click="removeAllItems()">Remove</BaseFormButton>
        <BaseFormButton
          class="btn-secondary bg-secondary text-neutral-600"
          @click="isRemovingAll = false"
          >Cancel</BaseFormButton
        >
      </template>
    </BaseModal>
  </Teleport>
  <Teleport to="#teleports">
    <BaseModal
      @closeModal="isRemoving = false"
      :modalVisible="isRemoving"
      size="w-[30vw]"
    >
      <template #header><h2>Removing item</h2></template>
      <template #default
        ><p class="pb-4">Are you sure to remove the item?</p></template
      >
      <template #footer>
        <BaseFormButton @click="removeItem()">Remove</BaseFormButton>
        <BaseFormButton
          class="btn-secondary bg-secondary text-neutral-600"
          @click="isRemoving = false"
          >Cancel</BaseFormButton
        >
      </template>
    </BaseModal>
  </Teleport>
  <Teleport to="#teleports">
    <Login v-if="isLoginModalOpen" @closeModal="isLoginModalOpen = false" />
  </Teleport>
</template>
