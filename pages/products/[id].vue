<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import type { CartItemType } from "~/types/Cart";
import type { ProductType } from "~/types/Product";
const { $formatCurrency } = useNuxtApp();
const route = useRoute();
const useCart = useCartStore();

const { cart } = storeToRefs(useCart);
const { data } = useCustomFetch<ProductType>(`/products/${route.params.id}`, {
  lazy: true,
});

const cartItem = ref<CartItemType>({
  id: 0,
  productID: 0,
  productName: "",
  image: "",
  userId: 0,
  price: 0,
  quantity: 1,
  total: 0,
});

const handleAddToCart = () => {
  if (data.value) {
    cartItem.value = {
      id: cart.value?.length + 1 || 0,
      productID: data.value?.id,
      productName: data.value.title,
      image: data.value.images[0],
      userId: 1,
      price: data.value.price,
      quantity: cartItem.value.quantity,
      total: cartItem.value.price * cartItem.value.quantity,
    };
  }

  useCart.add(cartItem.value);
};
</script>
<template>
  <LazyProductDetails v-if="data" :product="data">
    <div class="my-6 space-y-6">
      <div v-if="data.category?.name == 'Food'" class="space-y-2">
        <h3 class="font-bold">Choose Beverage</h3>
        <select
          class="w-full rounded-sm border bg-white px-4 py-2 text-xs outline-none"
        >
          <option>Select option</option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label><input type="radio" /> Regular</label>
        <label><input type="radio" /> Large</label>
        <label><input type="radio" /> X-large</label>
      </div>
      <div class="inline-flex items-center font-semibold">
        <BaseFormButton
          class="rounded-none rounded-l-md bg-secondary text-black"
          @click="cartItem.quantity--"
          >-
        </BaseFormButton>
        <span class="bg-secondary px-6 py-2">{{ cartItem.quantity }}</span>
        <BaseFormButton
          class="rounded-none rounded-r-md bg-secondary text-black"
          @click="cartItem.quantity++"
          >+
        </BaseFormButton>
      </div>
    </div>
    <BaseFormButton @handleClick="handleAddToCart" class="btn-primary py-4"
      >Add to Bag ({{
        $formatCurrency(data.price * cartItem.quantity, "PHP")
      }})</BaseFormButton
    >
  </LazyProductDetails>
</template>
