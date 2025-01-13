import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

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
