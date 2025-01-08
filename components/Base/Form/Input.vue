<script setup lang="ts">
interface Props {
  type?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  error: null,
  type: "text",
});

const model = defineModel();
</script>
<template>
  <div class="flex flex-1 flex-col gap-2">
    <label class="text-sm font-semibold uppercase"
      >{{ label }} <span v-if="required" class="text-red-600">*</span></label
    >
    <input
      :disabled="disabled"
      :required="required"
      class="rounded-lg border bg-slate-50 p-4 outline-none focus:outline-red-700"
      :type="type"
      v-model="model"
    />
    <span class="min-h-[1.25rem] text-sm text-red-700">{{
      error && error
    }}</span>
  </div>
</template>
