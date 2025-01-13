import { useAuthStore } from "~/store/Auth";

// export default defineNuxtRouteMiddleware(() => {
//   if (process.server) return;
//   if (process.client){
//     const authStore = useAuthStore();
//     const { auth } = storeToRefs(authStore);
//     if (!auth.value) {
//       window.history.back();
//     }
//   }

// });

export default defineNuxtRouteMiddleware((to: any) => {
  if (process.server) return;
  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);
  const restrictedPages = ["order-checkout", "order-all"]; // List of restricted routes
  if (restrictedPages.includes(to.name)) {
    if (!auth.value) {
      return navigateTo("/");
    }
  }
});
