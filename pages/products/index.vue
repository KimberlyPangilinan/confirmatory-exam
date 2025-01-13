<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import { storeToRefs } from "pinia";

const scrollContainer = ref<HTMLElement | null>(null);
const { products } = storeToRefs(useProductStore());

const {
  search,
  reachedLimit,
  status,
  filterCategory,
  debouncedSearch,
  handleScroll,
} = useProducts();

watch(search, debouncedSearch);

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", () =>
      handleScroll(scrollContainer.value),
    );
  }
});
</script>

<template>
  <main
    ref="scrollContainer"
    class="relative m-auto max-h-[70vh] w-[90vw] space-y-6 overflow-auto py-4"
  >
    <div
      class="sticky top-[-2rem] flex items-center justify-between bg-white py-4"
    >
      <ProductCategory @filter="filterCategory" />
      <button @click="useProductStore().sortBy">Sort by Price</button>
      <div
        class="flex items-center justify-center gap-2 rounded-xl border bg-neutral-50 p-4 placeholder:text-neutral-500 focus-within:border-2 focus-within:border-primary"
      >
        <Icon name="eva:search-fill" class="bg-primary text-primary" />
        <input
          type="text"
          placeholder="Enter search"
          class="bg-transparent outline-none"
          v-model="search"
        />
      </div>
    </div>

    <ProductList v-if="products" :products="products" />
    <BaseLoaderSkeleton v-if="status === 'pending'" />

    <div v-if="reachedLimit" class="flex items-center justify-center p-3">
      <span class="text-neutral-500">You are at the end of the list</span>
    </div>
  </main>
</template>
