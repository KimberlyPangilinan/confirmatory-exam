<script setup>
import { useProducts } from "~/store/useProducts";
// const {data } = useCustomFetch('/products')
const category = ref(null);
const { data: categories } = useCustomFetch("/categories");
const productStorage = useProducts();
const { data, status, execute } = useAsyncData("products", () =>
  productStorage.fetch(category.value ? `categoryId=${category.value}` : ""),
);

const filterCategory = (id) => {
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
          v-for="(item, key) in categories.slice(0, 5)"
          class="cursor-pointer whitespace-nowrap rounded-2xl p-4 font-semibold hover:opacity-80"
          :class="{
            'bg-primary text-white': category == item.id,
            'bg-secondary text-neutral-600': category !== item.id,
          }"
          key="key"
          @click="filterCategory(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <input type="text" placeholder="Enter search" />
    </div>
    <ProductList v-if="data" :products="data" />
  </main>
</template>
