<script setup lang="ts">
defineProps({
  product: Object,
});
</script>
<template>
  <div class="w-[15.5vw] rounded-lg bg-secondary px-4 py-4">
    <div>
      <img v-if="product" :src="product.images[0]" />
    </div>
    <div>
      <h3 class="flex flex-col text-lg font-semibold">
        Steak Fries Veggies
        <span class="text-sm font-normal">Meat</span>
      </h3>
      <div class="mt-2 flex justify-between">
        <div class="font-bold text-primary">Price</div>
        <div>Ratings</div>
      </div>
    </div>
  </div>
</template>
