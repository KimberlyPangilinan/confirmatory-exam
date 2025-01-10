<script setup lang="ts">
import { useProductStore } from "~/store/Product";
import type { ProductType } from "~/types/Product";

const category = ref<number | string>("");
const query = ref({
  offset: 0,
  limit: 18,
});
const search = ref("");
const scrollContainer = ref<HTMLElement | null>(null);

const productStore = useProductStore();
const { products, isAscending } = storeToRefs(productStore);

const { data, status, execute } = useAsyncData<ProductType[]>(
  "products",
  () =>
    productStore.fetch(
      `categoryId=${category.value}&offset=${query.value.offset}&limit=${query.value.limit}&title=${search.value}`,
      {},
    ),
  { watch: [query] },
);

const filterCategory = (id: number) => {
  query.value.offset = 0;
  category.value = id;
  execute().then(() => {
    if (data.value) products.value = data.value;
  });
};

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
      if (data.value) {
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
  if (data.value) products.value = data.value;
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
      <!-- <span v-for="item in productStore.sortedByPrice ">{{ item.price }}</span> -->
      <button @click="isAscending = !isAscending">Sort by Price</button>
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
    <button @click=""></button>
    <ProductList v-if="data" :products="products ? products : data" />
    <BaseLoaderSkeleton v-if="status == 'pending'" />
    <div v-if="reachedLimit" class="flex items-center justify-center p-3">
      <span class="text-neutral-500">You are at the end of the list</span>
    </div>
  </main>
</template>
