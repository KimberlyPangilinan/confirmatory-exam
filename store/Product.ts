import { defineStore } from "pinia";
import { type ProductState, type ProductType } from "~/types/Product";

// TODO: add autoimport for store files and pinia functions

export const useProductStore = defineStore("product", () => {
  const products = ref<ProductType[]>([]); // Now explicitly typed as ProductType[]
  const isLoading = ref<boolean>(false); // Track loading state

  // Fetch products
  const fetch = async (
    query: string,
    options: Object,
  ): Promise<ProductType[]> => {
    const endpoint = `https://api.escuelajs.co/api/v1/products?${query}`;
    return await $fetch(endpoint, options);
  };
  const isAscending = ref(false);
  const sortedByPrice = computed(() => {
    return [...products.value].sort((a, b) => {
      if (isAscending.value) {
        return a.price - b.price; // Ascending order
      } else {
        return b.price - a.price; // Descending order
      }
    });
  });

  return {
    products,
    isLoading,
    fetch,
    sortedByPrice,
    isAscending,
  };
});
