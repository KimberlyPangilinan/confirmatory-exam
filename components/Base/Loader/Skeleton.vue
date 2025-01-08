<script setup lang="ts">
interface Props {
  length?: number;
}

withDefaults(defineProps<Props>(), {
  length: 18,
});
</script>

<template>
  <div class="flex h-screen w-full flex-row flex-wrap gap-2">
    <!-- Skeleton Loader Items -->
    <div
      v-for="i in length"
      :key="i"
      class="h-[40vh] w-[15.5vw] animate-pulse rounded-md bg-neutral-100"
    ></div>
  </div>
</template>
