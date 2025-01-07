import { defineStore } from "pinia";

export const useProducts = defineStore("products", () => {
  const fetch = async (query, options) => {
    return await $fetch(
      `https://api.escuelajs.co/api/v1/products?${query}`,
      options,
    );
  };

  return {
    fetch,
  };
});
