<script setup lang="ts">
interface Props {
  length?: number;
}

withDefaults(defineProps<Props>(), {
  length: 18,
});
</script>

<template>
  <div class="grid grid-cols-6 gap-4">
    <!-- Skeleton Loader Items -->
    <div
      v-for="i in length"
      :key="i"
      class="h-[40vh] animate-pulse rounded-md bg-neutral-100"
    ></div>
  </div>
</template>
