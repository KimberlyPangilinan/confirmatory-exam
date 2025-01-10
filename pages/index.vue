<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import type { ProductState, ProductType } from "~/types/Product";
import type { CategoryType } from "~/types/Category";
const productStore = useProductStore();
const { data, status, execute } = useAsyncData<ProductState[]>("products", () =>
  productStore.fetch("", {}),
);
const { data: categories } = useCustomFetch<CategoryType[]>("/categories");

const promotionalContent = [
  {
    id: 1,
    img: "/images/promo1.png",
    title: "Promo 1",
  },
  {
    id: 2,
    img: "/images/promo2.png",
    title: "Promo 1",
  },
  {
    id: 3,
    img: "/images/promo1.png",
    title: "Promo 3",
  },
];

const newProducts = [
  {
    id: 1,
    img: "/images/new.png",
    title: "New Product 1",
  },
  {
    id: 2,
    img: "/images/promo2.png",
    title: "New Product 1",
  },
  {
    id: 3,
    img: "/images/new.png",
    title: "New Product 3",
  },
];
</script>
<template>
  <!-- Promotion Section -->
  <LazyHomeCarousel :slides="promotionalContent" />
  <!-- Category Section -->
  <BaseSection>
    <template #header>Category</template>
    <div
      class="flex min-h-[50vh] max-w-[100vw] flex-nowrap gap-4 overflow-auto"
    >
      <BaseCard
        v-for="(item, key) in categories"
        :key="key"
        :img="item.image"
        :title="item.name"
      />
    </div>
  </BaseSection>
  <!-- What's New Section -->
  <BaseSection>
    <template #header>What's New</template>
    <LazyHomeCarousel :slides="newProducts" />
  </BaseSection>
  <!-- Popular Section -->
  <BaseSection>
    <template #header>Popular</template>
    <ProductList v-if="data" :products="data.slice(0, 6)" />
  </BaseSection>
</template>
