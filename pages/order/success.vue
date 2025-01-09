<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <div class="flex max-w-[400px] flex-col items-center justify-center gap-6">
      <img src="/images/positive-vote.png" />
      <h1>Ordered Received</h1>
      <p class="max-w-[400px] text-center">
        Your order
        <span class="font-semibold text-primary">No. 19049585</span> has
        successfully take and now being processed. Kindly wait for our
        notification regarding your order.
      </p>
      <div class="flex w-full flex-col gap-1">
        <BaseFormButton to="/order/all">Track Order</BaseFormButton>
        <BaseFormButton to="/" class="btn-secondary"
          >Back to Home</BaseFormButton
        >
      </div>
    </div>
  </div>
</template>
