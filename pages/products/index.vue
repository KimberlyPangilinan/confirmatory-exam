<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import type { ProductState } from "~/types/Product";

const category = ref<number | string>("");

const query = ref({
  offset: 0,
  limit: 18,
});

const search = ref("");
const scrollContainer = ref<HTMLElement | null>(null);

const productStore = useProductStore();

const { data, status, execute } = useAsyncData<ProductState[]>(
  "products",
  () =>
    productStore.fetch(
      `categoryId=${category.value}&offset=${query.value.offset}&limit=${query.value.limit}&title=${search.value}`,
      {},
    ),
  { watch: [query] },
);

const products = ref(data.value);

const filterCategory = (id: number) => {
  query.value.offset = 0;
  category.value = id;
  execute().then(() => {
    products.value = data.value;
  });
};

// TODO: use lodash debounce? refactor infinite scroll

const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
const debouncedSearch = debounce(() => {
  query.value.offset = 0;
  products.value = [];

  execute().then(() => {
    products.value = data.value || [];
  });
}, 500);
const reachedLimit = ref(false);
watch(search, debouncedSearch);
const loadMore = () => {
  if (data.value && data.value.length) {
    query.value.offset += query.value.limit;
    execute().then(() => {
      if (data.value && products.value) {
        products.value.push(...data.value);
      }
      reachedLimit.value = true;
    });
  }
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const scrollBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;

  if (scrollBottom <= 60) {
    loadMore();
  }
};

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", handleScroll);
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
    <ProductList v-if="data" :products="products ? products : data" />
    <BaseLoaderSkeleton v-if="status == 'pending'" />
    <div v-if="reachedLimit" class="flex items-center justify-center p-3">
      <span class="text-neutral-500">You are at the end of the list</span>
    </div>
  </main>
</template>
