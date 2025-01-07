<script setup lang="ts">
interface Props {
  class?: string;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "btn-primary",
  disabled: false,
  loading: false,
  to: undefined,
});

const emit = defineEmits(["handleClick"]);
</script>

<template>
  <button
    @click="to ? navigateTo(to) : emit('handleClick')"
    :class="class"
    class="w-full"
    :disabled="disabled || loading"
    :loading="loading"
  >
    <slot />
  </button>
</template>
