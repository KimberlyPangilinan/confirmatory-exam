<script setup lang="ts">
defineProps({
  product: Object,
});
</script>
<template>
  <div v-if="product" class="m-auto flex w-[80vw] gap-6">
    <div class="w-1/2">
      <img :src="product.images[0]" />
    </div>
    <div class="w-1/2">
      <h1 v-html="product.title"></h1>
      <div>Ratings</div>
      <div class="text-lg font-semibold text-green-700">
        P {{ product.price }}
      </div>
      <p class="text-sm font-normal">{{ product.description }}</p>
      <slot />
    </div>
  </div>
</template>
