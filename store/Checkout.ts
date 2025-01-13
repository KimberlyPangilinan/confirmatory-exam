import { defineStore } from "pinia";
import type { Cart } from "~/types/Cart";

export const useCheckoutStore = defineStore("checkout", () => {
  const checkoutForm = ref<Cart>();

  const checkout = async (body: Object) => {
    return await $fetch("/api/orders", {
      method: "POST",
      body: body,
    });
  };

  const process = async (body: Object) => {
    return await $fetch("/api/checkout/payment", {
      method: "POST",
      body: body,
    });
  };

  const validate = async (body: Object) => {
    return await $fetch("/api/checkout/validate", {
      method: "POST",
      body: body,
    });
  };

  return { checkoutForm, checkout, validate, process };
});
