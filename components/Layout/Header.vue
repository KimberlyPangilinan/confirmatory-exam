<script setup lang="ts">
import { useAuthStore } from "~/store/Auth";

const isLoginModalOpen = ref(false);
const useAuth = useAuthStore();
const { auth, error } = storeToRefs(useAuth);
</script>
<template>
  <header
    class="flex h-[111px] items-center justify-between rounded-b-lg bg-primary px-[49px] py-[10px]"
  >
    <LayoutLogo />
    <div class="flex items-center justify-center gap-4">
      <LayoutNav />
      <AuthMenu v-if="auth" />
      <BaseFormButton
        v-else
        @handleClick="isLoginModalOpen = true"
        class="btn-secondary"
        >Login</BaseFormButton
      >
    </div>

    <Teleport to="#teleports">
      <Login
        v-if="isLoginModalOpen"
        @closeModal="
          isLoginModalOpen = false;
          error = null;
        "
      />
    </Teleport>
  </header>
</template>
