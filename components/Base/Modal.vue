<script setup lang="ts">
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  modalVisible: Boolean,
  size: { type: String, default: "min-w-[40vw]" },
});
</script>
<template>
  <div
    v-if="modalVisible"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black opacity-50"
      @click="emit('closeModal')"
    ></div>

    <!-- Modal Content -->
    <div
      class="z-10 max-w-md space-y-4 rounded-xl bg-white px-6 py-4 shadow-lg"
      :class="props.size"
    >
      <header class="flex items-start justify-between py-4">
        <div>
          <slot name="header">This is a Header</slot>
        </div>
        <div>
          <button
            @click="emit('closeModal')"
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            <Icon name="material-symbols:close" />
          </button>
        </div>
      </header>
      <div>
        <slot name="default" />
      </div>
      <footer class="flex gap-2 pt-2">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
