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
const partialStarWidth = computed(
  () => (props.rating - activeStarsCount.value).toFixed(2) * 100,
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

      <div v-if="partialStarWidth > 0" class="relative">
        <star :is-active="false" />

        <div
          :style="{ width: `${partialStarWidth}%` }"
          class="absolute inset-0 overflow-hidden"
        >
          <star :is-active="true" />
        </div>
      </div>
      <Icon
        class="bg-neutral-200"
        v-for="k in inactiveStarsCount"
        :key="`inactive-${k}`"
        name="material-symbols:star-rounded"
      />
    </div>
  </div>
</template>
