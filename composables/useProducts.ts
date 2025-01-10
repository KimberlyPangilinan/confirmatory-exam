// import { type ProductType } from "~/types/Product";
// import { useProductStore } from "~/store/Product";
// import { storeToRefs } from "pinia";
// import { computed } from "vue";

// export const useProducts = (query: string, options: Object) => {
//   const productStore = useProductStore();
//   const { products } = storeToRefs(productStore); // reactive reference to products

//   // Fetch products using useFetch
//   const { data, error, status } = useFetch<ProductType[]>(
//     `https://api.escuelajs.co/api/v1/products?${query}`,
//     options
//   );

//   const fetchProducts = async () => {
//     if (status.value === "pending") return;
//     if (error.value) {
//       console.error("Error fetching products:", error.value);
//       return;
//     }
//     if (data.value ) productStore.products = data.value;
//   };

//   computed(() => {
//     fetchProducts();
//   });

//   return {
//     products,
//     fetchProducts,
//     status,
//   };
// };

// export const sortProducts = (isAscending: boolean, products: ProductType[]) => {
//   return products.sort((a, b) => {
//     if (isAscending) {
//       return a.title.localeCompare(b.title); // Adjust sorting key as needed
//     } else {
//       return b.title.localeCompare(a.title); // Adjust sorting key as needed
//     }
//   });
// };
