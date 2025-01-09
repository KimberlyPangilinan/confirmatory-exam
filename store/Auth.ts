import { defineStore, skipHydrate } from "pinia";
import { z } from "zod";
import type { AuthForm, AuthState, AuthType } from "~/types/Auth";

export const useAuthStore = defineStore("auth", () => {
  const authCookie = useCookie<AuthState | null>("auth");

  const auth = ref<AuthState | null>(authCookie.value);
  const error = ref<any | null>();

  // Zod schema for validating credentials
  const CredentialsSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const setToken = (res: any) => {
    console.log(res, "set token");
    authCookie.value = res;
  };

  async function validate(credentials: AuthForm) {
    const validation = CredentialsSchema.safeParse(credentials);
    return { error: !validation.success, validation };
  }

  async function signIn(credentials: AuthForm) {
    const { error: er, validation } = await validate(credentials);
    if (er) {
      error.value = validation.error?.issues
        .map((issue) => issue.message)
        .join(", ");
      console.error("Validation Errors:", validation.error?.issues);
      throw new Error(error.value);
    }
    return await $fetch<AuthState>(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        method: "POST",
        body: credentials,
      },
    );
  }

  async function fetchProfile(access_token: string) {
    const res = await $fetch<AuthType>(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    auth.value = {
      ...auth.value,
      user: {
        ...res,
        homeAddress:
          "No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234 Philippines",
        workAddress:
          "No. 123 Main Street, Brgy. San Antonio City 2345 Philippines",
        phone: "09123456789",
      },
    };
    authCookie.value = auth.value;
    return;
  }

  function logout() {
    auth.value = null;
    authCookie.value = null;
  }

  return {
    auth: skipHydrate(auth),
    error: skipHydrate(error),
    logout,
    signIn,
    fetchProfile,
    setToken,
  };
});
