import { defineStore, skipHydrate } from "pinia";

// TODO: defineStore auth that returns loginfunction and others
export const useAuth = defineStore("auth", () => {
  const token = useCookie("token");
  const auth = ref(token.value);

  async function login(credentials) {
    try {
      const response = await $fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          body: credentials,
        },
      );

      auth.value = response;
      token.value = auth.value.access_token;
    } catch (error) {
      console.log(error.response || error);
      alert(error.message);
    }
  }

  return { auth: skipHydrate(auth), token: skipHydrate(token), login };
});
