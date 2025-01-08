<script setup lang="ts">
defineProps({
  product: Object,
});
</script>
<template>
  <div
    v-if="product"
    @click="navigateTo(`/products/${product.id}`)"
    class="w-[15.5vw] rounded-xl bg-secondary px-4 py-4"
  >
    <div>
      <img v-if="product" :src="product.images[0]" />
    </div>
    <div class="mt-2">
      <h3 class="flex flex-col text-lg font-semibold">
        {{ product.title }}
        <span class="text-sm font-normal">Meat</span>
      </h3>
      <div class="mt-2 flex justify-between">
        <div class="font-bold text-primary">Price</div>
        <div>Ratings</div>
      </div>
    </div>
  </div>
</template>
