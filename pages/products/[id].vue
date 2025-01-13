<script setup lang="ts">
import { useCartStore } from "~/store/Cart";
import type { CartItemType } from "~/types/Cart";
import type { ProductType } from "~/types/Product";
const { $formatCurrency, $toast } = useNuxtApp();
const route = useRoute();
const cartStore = useCartStore();

const { cart } = storeToRefs(cartStore);
const { data, status } = useCustomFetch<ProductType>(
  `/products/${route.params.id}`,
  {
    lazy: true,
  },
);
const variations: any = [{ size: ["SMALL", "MEDIUM", "LARGE"] }];
const selectedVariations = ref<Record<string, string>>({ size: "SMALL" });

const cartItem = ref<CartItemType>({
  id: 0,
  productID: 0,
  productName: "",
  image: "",
  price: 0,
  quantity: 1,
  variations: selectedVariations.value,
});

const handleAddToCart = () => {
  if (data.value) {
    cartItem.value = {
      id: cart.value?.length + 1 || 0,
      productID: data.value?.id,
      productName: data.value.title,
      image: data.value.images[0],
      price: data.value.price,
      quantity: cartItem.value.quantity,
      variations: selectedVariations.value,
    };
  }

  cartStore.add(cartItem.value);
  $toast.success("Added to cart");
};
</script>
<template>
  <div
    v-if="status == 'pending'"
    class="m-auto h-screen w-[80vw] animate-pulse rounded-md bg-neutral-100"
  ></div>

  <LazyProductDetails v-if="status == 'success' && data" :product="data">
    <div class="my-6 space-y-6">
      <div
        v-if="variations"
        v-for="(variation, index) in variations"
        :key="index"
      >
        <div class="space-y-2">
          <h3 class="font-bold">Choose {{ Object.keys(variation)[0] }}</h3>
          <div class="flex flex-col gap-2">
            <label
              v-for="option in variation[Object.keys(variation)[0]]"
              :key="option"
            >
              <input
                type="radio"
                :name="'variation-' + index"
                :value="option"
                v-model="selectedVariations[Object.keys(variation)[0]]"
              />
              {{ option }}
            </label>
          </div>
        </div>
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
