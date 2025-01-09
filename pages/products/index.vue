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

watch(search, debouncedSearch);
const loadMore = () => {
  if (data.value && data.value.length) {
    query.value.offset += query.value.limit;
    execute().then(() => {
      if (data.value && products.value) {
        products.value.push(...data.value);
      }
    });
  }
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const scrollBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;

  if (scrollBottom <= 80) {
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
    class="relative m-auto max-h-[500px] w-[90vw] space-y-6 overflow-auto py-4"
  >
    <div
      class="sticky top-[-2rem] flex items-center justify-between bg-white py-4"
    >
      <ProductCategory @filter="filterCategory" />
      <input type="text" placeholder="Enter search" v-model="search" />
    </div>
    <BaseLoaderSkeleton v-if="status == 'pending'" />
    <ProductList v-if="data" :products="products ? products : data" />
  </main>
</template>
