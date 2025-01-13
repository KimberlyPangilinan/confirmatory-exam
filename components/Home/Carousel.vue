<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";

defineProps({
  slides: Array,
});

const config = useCarouselConfig();

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>
<template>
  <!-- Skeleton Loader Items -->
  <div
    v-if="isLoading"
    class="h-[28rem] w-full animate-pulse rounded-md bg-neutral-100"
  ></div>
  <div v-else class="carousel__wrapper">
    <Carousel v-bind="config">
      <Slide v-for="(slide, key) in slides" :key="key">
        <div class="carousel__item relative mr-4" style="width: -moz-available">
          <img
            :src="slide.img"
            class="h-[30rem] w-full rounded-xl object-cover"
          />
        </div>
        <div
          class="absolute inset-0 !right-[-2.5em] left-auto my-auto h-16 w-16 rounded-full bg-white"
        ></div>
        <div
          class="absolute inset-0 !left-[-2.5em] right-auto my-auto h-16 w-16 rounded-full bg-white"
        ></div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
