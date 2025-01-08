<script setup lang="ts"></script>
<template>
  <!-- Promotion Section -->
  <BaseSection>
    <div
      class="flex min-h-[42vh] max-w-[100vw] flex-nowrap gap-4 overflow-scroll"
    >
      <BaseCard img="/images/Logo.png" title="Top" class="min-w-[70vw]" />
      <BaseCard img="/images/Logo.png" title="Top" />
      <BaseCard img="/images/Logo.png" title="Top" />
      <BaseCard img="/images/Logo.png" title="Top" />
    </div>
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
