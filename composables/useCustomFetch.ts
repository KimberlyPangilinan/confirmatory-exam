import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  return useLazyFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch,
  });
}
