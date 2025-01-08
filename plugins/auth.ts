import { useAuthStore } from "~/store/Auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  if (authStore.auth && !authStore.auth.user && authStore.auth.access_token) {
    await authStore.fetchProfile(authStore.auth.access_token);
  }
});
