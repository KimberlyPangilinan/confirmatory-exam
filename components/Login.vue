<script setup>
import { useAuth } from "~/store/useAuth";
const credentials = ref({
  email: "",
  password: "",
});

const emit = defineEmits(["closeModal"]);

const auth = useAuth();
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      @click="emit('closeModal')"
      class="fixed inset-0 bg-black opacity-50"
    ></div>
    <form
      @submit.prevent="auth.login(credentials)"
      class="z-10 min-h-[70vh] min-w-[36vw] space-y-10 rounded-lg bg-white p-6"
    >
      <header>
        <img src="../public/images/Logo.png" class="w-20" />
        <h1 class="text-2xl font-semibold">Bonjour!</h1>
        <p class="text-neutral-700">Login to continue</p>
      </header>
      <div class="flex flex-col gap-2">
        <!-- TODO: create input component -->
        <input
          class="rounded-lg border bg-slate-50 p-4 outline-none"
          v-model="credentials.email"
          placeholder="Email"
        />
        <input
          class="rounded-lg border bg-slate-50 p-4 outline-none"
          v-model="credentials.password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="flex flex-col gap-1 font-semibold">
        <BaseFormButton class="btn-primary rounded-xl py-4"
          >Login</BaseFormButton
        >
        <BaseFormButton class="btn-secondary">Login as Guest</BaseFormButton>
      </div>

      <p class="text-center">
        Dont have an account yet?
        <NuxtLink class="font-semibold text-primary">Create</NuxtLink>
      </p>
    </form>
  </div>
</template>
