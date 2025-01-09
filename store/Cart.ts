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
    // TODO: if existing, add item quantity
    initializedCart();
    cartItem && cart.value.unshift(cartItem);
  };

  const removeItem = async (cartItem: CartItemType) => {
    initializedCart();
    cart.value = cart.value.filter((item) => item.id !== cartItem.id);
  };

  const clearCart = async () => {
    cart.value = [];
  };
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
