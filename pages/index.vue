<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import type { ProductState, ProductType } from "~/types/Product";
const productStore = useProductStore();
const { data, status, execute } = useAsyncData<ProductState[]>("products", () =>
  productStore.fetch("", {}),
);
</script>
<template>
  <!-- Promotion Section -->
  <BaseSection>
    <div class="flex max-w-[100vw] flex-nowrap gap-4 overflow-scroll">
      <BaseCard v-for="i in 4" :key="i" class="min-w-[40vw]">
        <img src="/images/placeholder.jpg" class="w-full" />
      </BaseCard>
    </div>
  </BaseSection>
  <!-- Category Section -->
  <BaseSection>
    <template #header>Category</template>
    <div class="flex min-h-[50vh] max-w-[100vw] flex-nowrap gap-4">
      <BaseCard v-for="i in 4" :key="i" img="/images/Logo.png" title="Top" />
    </div>
  </BaseSection>
  <!-- What's New Section -->
  <BaseSection>
    <template #header>What's New</template>
  </BaseSection>
  <!-- Popular Section -->
  <BaseSection>
    <template #header>Popular</template>
    <ProductList v-if="data" :products="data.slice(0, 6)" />
  </BaseSection>
</template>
