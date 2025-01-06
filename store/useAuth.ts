import { defineStore, skipHydrate } from "pinia";
interface Credentials {
  email: string;
  password: string;
}

// TODO: defineStore auth that returns loginfunction and others
export const useAuth = defineStore("auth", () => {
  const { loggedIn, user, fetch: refreshSession } = useUserSession();

  async function login(credentials: Credentials): Promise<void> {
    $fetch("/api/auth/login", {
      method: "POST",
      body: credentials,
    })
      .then(async () => {
        // Refresh the session on client-side and redirect to the home page
        await refreshSession();
        await navigateTo("/");
      })
      .catch(() => alert("Bad credentials"));
  }
  return { loggedIn: skipHydrate(loggedIn), user: skipHydrate(user), login };
});
