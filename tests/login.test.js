import { describe, it, expect, beforeEach, vi } from "vitest";
import { mountSuspended, mockNuxtImport  } from "@nuxt/test-utils/runtime";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "~/store/Auth";

import Login from "../components/Login.vue";

describe("Login Component", () => {
  it("renders the login component correctly", async () => {
    const wrapper = await mountSuspended(Login);
    expect(wrapper.text()).toContain("Login to continue");

    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);

    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
  });
});

// Mock `useAsyncData`
mockNuxtImport("useAsyncData", () => {
  return () => ({
    data: { name: "Mocked User", email: "mock@example.com" },
    pending: false,
    error: null,
  });
});

// Mock $fetch for API calls
global.$fetch = vi.fn();

describe("Auth Store with mocked useAsyncData", () => {
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });

  it("should use mocked useAsyncData", async () => {
    global.$fetch.mockResolvedValueOnce({
      id: 1,
      token: "mocked-token",
    });

    const response = await authStore.signIn({
      email: "test@example.com",
      password: "password123",
    });

    expect(response).toEqual({ id: 1, token: "mocked-token" });
    expect(global.$fetch).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/auth/login",
      expect.objectContaining({
        method: "POST",
        body: { email: "test@example.com", password: "password123" },
      }),
    );
  });

  it("should fetch profile using mocked useAsyncData", async () => {
    await authStore.fetchProfile("mocked-token");
    console.log(authStore.auth.user);
    expect(authStore.auth.user).toMatchObject({
      name: "Mocked User",
      email: "mock@example.com",
      homeAddress:
        "No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234 Philippines",
      workAddress:
        "No. 123 Main Street, Brgy. San Antonio City 2345 Philippines",
      phone: "09123456789",
    });
  });
});

describe("Validation of Email Address", () => {
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });
  // it("should throw an error if email is missing", async () => {
  //   const { error: er, validation } = await authStore.signIn({
  //     email: "", // Empty email
  //     password: "password123",
  //   });

  //   expect(er).toBe(true);
  //   expect(validation.error?.issues[0].message).toContain("Invalid email format");
  // });

  it("should throw an error if email format is incorrect", async () => {
    await authStore.signIn({
      email: "invalidemail", // Invalid email format
      password: "password123",
    });

    expect(authStore.error).toContain("Invalid email format"); // Check for the default Zod message
  });
});
