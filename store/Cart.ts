import type { CartItemType } from "~/types/Cart";
import { skipHydrate } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const { $toast } = useNuxtApp();
  const cart = useCookie<CartItemType[]>("cart");

  const initializedCart = () => {
    if (!cart.value) {
      cart.value = [];
    }
  };
  const add = async (cartItem: CartItemType) => {
    initializedCart();
    if (cartItem) {
      const existingItem = cart.value.find(
        (item) => item.productID === cartItem.productID,
      );
      if (existingItem) {
        existingItem.quantity += cartItem.quantity || 1;
      }
      cart.value.unshift({ ...cartItem, quantity: cartItem.quantity || 1 });
    }
  };

  const removeItem = async (cartItem: CartItemType) => {
    initializedCart();
    cart.value = cart.value.filter((item) => item.id !== cartItem.id);
    $toast.success("Successfully removed selected item");
  };

  const clearCart = async () => {
    cart.value = [];
    $toast.success("Successfully removed all items");
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
    total: skipHydrate(total),
    fetch,
    add,
    removeItem,
    clearCart,
  };
});
