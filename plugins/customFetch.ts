import type { AuthType } from "~/types/Auth";

export default defineNuxtPlugin(() => {
  const userAuth = useCookie<AuthType | null>("auth");
  const config = useRuntimeConfig();

  const $customFetch = $fetch.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    onRequest({ request, options, error }) {
      if (userAuth.value) {
        options.headers.set(
          "Authorization",
          `Bearer ${userAuth.value.access_token}`,
        );
      }
    },
    onResponse({ response }) {},
    onResponseError({ response }): any {
      if (response.status === 401) {
        return navigateTo("/");
      }
    },
  });
  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
