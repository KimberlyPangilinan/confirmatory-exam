<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";
import type { AuthState } from "~/types/Auth";

const authStore = useAuthStore();

const emit = defineEmits(["closeModal"]);

const credentials = ref({
  email: "",
  password: "",
});

const { data, status, error, execute } = await useAsyncData(
  () => authStore.signIn(credentials.value),
  { immediate: false },
);

const handleSubmitLogin = async () => {
  await execute();
  authStore.setToken(data.value);
  const res: AuthState | null = data.value;
  console.log(res && res.access_token, "access");
  res?.access_token && authStore.fetchProfile(res.access_token);
  status.value == "success" && emit("closeModal");
  return;
};
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      @click="emit('closeModal')"
      class="fixed inset-0 bg-black opacity-50"
    ></div>
    <form
      @submit.prevent="handleSubmitLogin"
      class="z-10 min-h-[70vh] min-w-[36vw] space-y-10 rounded-xl bg-white p-6"
    >
      <header>
        <img src="../public/images/Logo.png" class="w-20" />
        <h1>Bonjour!</h1>
        <p class="text-neutral-700">Login to continue</p>
      </header>
      <div class="flex flex-col gap-2">
        <BaseFormInput
          label="Email Address"
          v-model="credentials.email"
          type="email"
          placeholder="Email"
        />
        <BaseFormInput
          label="Password"
          v-model="credentials.password"
          type="password"
          placeholder="Password"
        />
      </div>
      <span class="text-sm text-primary">{{ error || authStore.error }}</span>
      <div class="flex flex-col gap-1 font-semibold">
        <BaseFormButton
          :loading="status == 'pending'"
          class="btn-primary rounded-xl py-4"
          >Login
        </BaseFormButton>
        <BaseFormButton class="btn-secondary">Login as Guest</BaseFormButton>
      </div>

      <p class="text-center">
        Dont have an account yet?
        <NuxtLink class="font-semibold text-primary">Create</NuxtLink>
      </p>
    </form>
  </div>
</template>
