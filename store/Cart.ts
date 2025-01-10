import type { CartItemType, CartState } from "~/types/Cart";

import { skipHydrate } from "pinia";
export const useCartStore = defineStore("cart", () => {
  const cart = useCookie<CartItemType[]>("cart");

  const initializedCart = () => {
    if (!cart.value) {
      cart.value = [];
    }
  };
  const add = async (cartItem: CartItemType) => {
    initializedCart();
    console.log("hi");
    if (cartItem) {
      const existingItem = cart.value.find(
        (item) => item.productID === cartItem.productID,
      );
      if (existingItem) {
        console.log("hello");
        existingItem.quantity += cartItem.quantity || 1;
      }
      cart.value.unshift({ ...cartItem, quantity: cartItem.quantity || 1 });
      console.log("bye");
    }
  };

  const removeItem = async (cartItem: CartItemType) => {
    initializedCart();
    cart.value = cart.value.filter((item) => item.id !== cartItem.id);
  };

  const clearCart = async () => {
    cart.value = [];
  };

  // TODO: use checkout store validate
  const validate = async (body: Object) => {
    return await $fetch("/api/checkout/validate", {
      method: "POST",
      body: body,
    });
  };

  const total = computed(() => {
    return cart.value.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );
  });

  return {
    cart: skipHydrate(cart),
    fetch,
    add,
    total: skipHydrate(total),
    validate,
    removeItem,
    clearCart,
  };
});
