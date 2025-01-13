// composables/useProductFetch.ts
import { useProductStore } from "~/store/Product";
import type { ProductType } from "~/types/Product";
import { useAsyncData } from "#app";

export function useProductFetch() {
  const category = ref<number | string>("");
  const query = ref({
    offset: 0,
    limit: 18,
  });
  const search = ref("");
  const reachedLimit = ref(false);

  const productStore = useProductStore();
  const { products } = storeToRefs(productStore);

  const { data, status, execute } = useAsyncData<ProductType[]>(
    "products",
    () =>
      productStore.fetch(
        `categoryId=${category.value}&offset=${query.value.offset}&limit=${query.value.limit}&title=${search.value}`,
        {},
      ),
    { watch: [query] },
  );

  if (data.value) products.value = data.value;

  const filterCategory = (id: number) => {
    query.value.offset = 0;
    category.value = id;
    execute().then(() => {
      if (data.value) products.value = data.value;
    });
  };

  const debouncedSearch = debounce(() => {
    query.value.offset = 0;
    products.value = [];
    execute().then(() => {
      products.value = data.value || [];
    });
  }, 500);

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

  const handleScroll = (scrollContainer: HTMLElement | null) => {
    if (!scrollContainer) return;
    const scrollBottom =
      scrollContainer.scrollHeight -
      scrollContainer.scrollTop -
      scrollContainer.clientHeight;
    if (scrollBottom <= 60) {
      loadMore();
    }
  };

  return {
    category,
    query,
    search,
    reachedLimit,
    status,
    filterCategory,
    debouncedSearch,
    loadMore,
    handleScroll,
  };
}
