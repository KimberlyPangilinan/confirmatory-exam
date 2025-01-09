import { useAuthStore } from "~/store/Auth";

export default defineNuxtRouteMiddleware(() => {
  const useAuth = useAuthStore();
  const { auth } = storeToRefs(useAuth);
  if (!auth.value && process.client) {
    window.history.back();
  }
});
