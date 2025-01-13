import { defineStore } from "pinia";
import { type ProductState, type ProductType } from "~/types/Product";
// TODO: add autoimport for store files and pinia functions

export const useProductStore = defineStore("product", () => {
  const { $customFetch } = useNuxtApp();

  const products = ref<ProductType[]>([]);
  const isLoading = ref<boolean>(false);
  const isAscending = ref(false);

  // Fetch products
  const fetch = async (
    query: string,
    options: Object,
  ): Promise<ProductType[]> => {
    return await $customFetch(`products?${query}`, options);
  };

  function sortBy() {
    isAscending.value = !isAscending.value;
    products.value = [...products.value].sort((a, b) => {
      if (isAscending.value) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return;
  }

  return {
    products,
    isLoading,
    fetch,
    sortBy,
  };
});
