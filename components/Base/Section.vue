<script setup></script>
<template>
  <section class="flex w-full flex-col gap-4 p-6">
    <h2 class="text-lg font-semibold" v-if="$slots.header">
      <slot name="header" />
    </h2>
    <slot />
  </section>
</template>
