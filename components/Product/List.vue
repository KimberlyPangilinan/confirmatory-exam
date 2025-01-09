<script setup>
defineProps({
  products: Object,
});
</script>

<template>
  <div class="grid grid-cols-6 gap-4">
    <ProductItem
      v-for="(product, key) in products"
      :key="key"
      :product="product"
    />
  </div>
</template>
