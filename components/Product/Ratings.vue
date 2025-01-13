<script setup>
const props = defineProps({
  rating: {
    type: Number,
    default: 5,
  },
  starsCount: {
    type: Number,
    default: 5,
  },
});

const activeStarsCount = computed(() => Math.floor(props.rating));
const inactiveStarsCount = computed(() =>
  Math.floor(props.starsCount - props.rating),
);
</script>

<template>
  <div class="flex gap-1">
    <div class="mr-2 flex items-center space-x-1">
      <Icon
        class="bg-yellow-400"
        v-for="k in activeStarsCount"
        :key="`active-${k}`"
        name="material-symbols:star-rounded"
      />

      <Icon
        class="bg-neutral-200"
        v-for="k in inactiveStarsCount"
        :key="`inactive-${k}`"
        name="material-symbols:star-rounded"
      />
    </div>
  </div>
</template>
