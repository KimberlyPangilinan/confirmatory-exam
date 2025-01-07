<script setup>
defineProps({
  products: Object,
});
</script>
<template>
  <div class="flex flex-wrap justify-between gap-2">
    <ProductItem
      v-for="(product, key) in products"
      :key="key"
      :product="product"
    />
  </div>
</template>
