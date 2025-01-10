<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});

// Friendly error messages
const messages: Record<number, string> = {
  404: "Oops! The page you're looking for doesn't exist.",
  500: "Something went wrong on our end. Please try again later.",
  403: "Sorry, you don't have permission to access this page.",
  401: "You need to log in to access this page.",
};

const defaultMessage = "An unexpected error has occurred. Please try again.";
</script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-white px-4 text-gray-800"
  >
    <div
      v-if="error"
      class="flex max-w-lg flex-col items-center justify-center gap-8 text-center"
    >
      <img src="/images/Logo Inverted.png" class="w-[67px]" />

      <div>
        <h1 class="text-7xl font-bold text-black">
          {{ error?.statusCode }} ERROR
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          {{ messages[error.statusCode] || defaultMessage }}
          {{ error }}
        </p>
      </div>
      <BaseFormButton class="btn-primary max-w-[10em]" to="/"
        >Go Back Home</BaseFormButton
      >
    </div>
  </div>
</template>
