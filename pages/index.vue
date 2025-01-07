<script setup lang="ts"></script>
<template>
  <!-- Promotion Section -->
  <BaseSection>
    <BaseCard></BaseCard>
  </BaseSection>
  <!-- Category Section -->
  <BaseSection>
    <template #header>Category</template>

    <BaseCard></BaseCard>
  </BaseSection>
  <!-- What's New Section -->
  <BaseSection>
    <template #header>What's New</template>
  </BaseSection>
  <!-- Popular Section -->
  <BaseSection>
    <template #header>Popular</template>
    <ProductList />
  </BaseSection>
</template>
