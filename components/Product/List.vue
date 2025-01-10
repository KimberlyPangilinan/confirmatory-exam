<script setup>
defineProps({
  products: Object,
});
</script>

<template>
  <div
    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
  >
    <ProductItem
      v-for="(product, key) in products"
      :key="key"
      :product="product"
    />
  </div>
</template>
