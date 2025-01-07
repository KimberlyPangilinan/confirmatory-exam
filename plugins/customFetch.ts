export default defineNuxtPlugin(() => {
  const userAuth = useCookie("token");
  const config = useRuntimeConfig();

  const $customFetch = $fetch.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    onRequest({ request, options, error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set("Authorization", `Bearer ${userAuth.value}`);
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }): any {
      if (response.status === 401) {
        return navigateTo("/");
      }
    },
  });
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
