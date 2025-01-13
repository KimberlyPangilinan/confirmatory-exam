<script setup lang="ts">
import type { CategoryType } from "~/types/Category";

const category = ref<number | string>("");
const query = ref({
  offset: 0,
  limit: 18,
});

const { data: categories } = useCustomFetch<CategoryType[]>("/categories");

const emit = defineEmits(["filter"]);
</script>
<template>
  <div class="flex gap-2 filter">
    <!-- "All" Button -->
    <div
      class="cursor-pointer rounded-2xl p-4 font-semibold"
      @click="
        () => {
          category = '';
          emit('filter', '');
        }
      "
      :class="{
        'bg-primary text-white': category === '',
        'bg-secondary text-neutral-700': category !== '',
      }"
    >
      All
    </div>

    <!-- Category Buttons -->
    <div
      v-if="categories"
      v-for="(item, key) in categories.slice(0, 5)"
      :key="key"
      class="cursor-pointer whitespace-nowrap rounded-2xl p-4 font-semibold hover:opacity-80"
      :class="{
        'bg-primary text-white': category === item.id,
        'bg-secondary text-neutral-600': category !== item.id,
      }"
      @click="
        () => {
          category = item.id;
          emit('filter', item.id);
        }
      "
    >
      {{ item.name }}
    </div>
  </div>
</template>
