<script setup lang="ts">
defineProps({
  product: Object,
});
</script>
<template>
  <div
    v-if="product"
    @click="navigateTo(`/products/${product.id}`)"
    class="flex cursor-pointer flex-col rounded-xl bg-secondary px-4 py-4 hover:border-2 hover:border-primary hover:bg-opacity-10"
  >
    <div class="min-h-[10em]">
      <img v-if="product" :src="product.images[0]" />
    </div>
    <div class="mt-2 flex flex-1 flex-col justify-between">
      <h3 class="flex flex-col text-lg font-semibold">
        {{ product.title }}
        <span class="text-sm font-normal">Meat</span>
      </h3>
      <div class="mt-2 flex justify-between">
        <div class="font-bold text-primary">
          {{ $formatCurrency(product.price, "PHP") }}
        </div>
        <ProductRatings :rating="5" />
      </div>
    </div>
  </div>
</template>
