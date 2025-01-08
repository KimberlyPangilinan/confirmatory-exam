<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import type { CategoryType } from "~/types/Category";
import type { ProductState, ProductType } from "~/types/Product";

const category = ref<number | null>(null);

const productStore = useProductStore();

const { data: categories } = useCustomFetch<CategoryType[]>("/categories");

const { data, status, execute } = useAsyncData<ProductState[]>("products", () =>
  productStore.fetch(category.value ? `categoryId=${category.value}` : "", {}),
);

const filterCategory = (id: number) => {
  category.value = id;
  execute();
};
</script>
<template>
  <main class="m-auto w-[80vw] space-y-6 py-8">
    <div class="flex items-center justify-between">
      <div class="flex gap-2 filter">
        <div
          class="cursor-pointer rounded-2xl p-4 font-semibold"
          @click="category = null"
          :class="{
            'bg-primary text-white': category == null,
            'bg-secondary text-neutral-700': category != null,
          }"
        >
          All
        </div>
        <div
          v-if="categories"
          v-for="(item, key) in categories.slice(0, 5)"
          :key="key"
          class="cursor-pointer whitespace-nowrap rounded-2xl p-4 font-semibold hover:opacity-80"
          :class="{
            'bg-primary text-white': category == item.id,
            'bg-secondary text-neutral-600': category !== item.id,
          }"
          @click="filterCategory(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <input type="text" placeholder="Enter search" />
    </div>
    <BaseLoaderSkeleton v-if="status == 'pending'" />
    <ProductList v-if="data && status == 'success'" :products="data" />
  </main>
</template>
