import { defineStore, skipHydrate } from "pinia";
import { type ProductState } from "~/types/Product";
// TODO: add autoimport for store files and pinia functions

export const useProductStore = defineStore("product", () => {
  const products = ref<ProductState[]>([]);

  const fetch = async (
    query: string,
    options: Object,
  ): Promise<ProductState[]> => {
    return await $fetch(
      `https://api.escuelajs.co/api/v1/products?${query}`,
      options,
    );
  };

  return {
    products: skipHydrate(products),
    fetch,
  };
});
