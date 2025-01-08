import type { CartItemType, CartState } from "~/types/Cart";

import { skipHydrate } from "pinia";
export const useCartStore = defineStore("cart", () => {
  const cart = useCookie<CartItemType[]>("cart");
  const add = async (cartItem: CartItemType) => {
    // console.log("cartitme",cartItem )

    !cart.value ? (cart.value = []) : cart.value;
    cartItem && cart.value.unshift(cartItem);
    console.log(cart.value, "cart");
  };

  const total = computed(() => {
    return cart.value.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );
  });
  return { cart: skipHydrate(cart), fetch, add, total: skipHydrate(total) };
});
