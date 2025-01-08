<script setup>
const props = defineProps({
  img: String,
  title: String,
  to: String,
});
</script>

<template>
  <div
    class="min-w-[30%] flex-1 overflow-hidden rounded-lg border bg-secondary transition-all hover:border-2 hover:border-red-700 hover:bg-opacity-70"
    :style="{ backgroundImage: props.img ? `url(${props.img})` : 'none' }"
    @click="to && navigateTo(to)"
  >
    <header v-if="$slots.header" class="flex justify-between p-4">
      <h3 class="text-sm font-bold">
        <slot name="header" />
      </h3>
      <div>
        <input type="radio" />
      </div>
    </header>
    <div v-if="$slots.default" class="p-4 text-[#6C757D]">
      <slot name="default" />
    </div>
    <div
      v-if="!$slots.default"
      class="flex min-h-full items-end bg-[#2020204f] font-bold text-white"
    >
      <div class="p-4" v-html="title" />
    </div>
  </div>
</template>
