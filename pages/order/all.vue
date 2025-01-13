<script setup>
import { useAuthStore } from "~/store/Auth";
const { data, status } = useLazyFetch("/api/orders");
const authStore = useAuthStore();
</script>
<template>
  <Loader v-if="!authStore.auth || status == 'pending'" />
  <BaseSection v-else>
    <template #header>My Orders</template>
    <div class="relative overflow-x-auto">
      <table
        v-if="data && data.data"
        class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Cart</th>
            <th scope="col" class="px-6 py-3">Order ID</th>
            <th scope="col" class="px-6 py-3">Address</th>

            <th scope="col" class="px-6 py-3">Total</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, key) in data.data"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td class="px-6 py-4">
              <div class="grid w-40 grid-cols-2 gap-1">
                <img v-for="item in order.cart.slice(0, 4)" :src="item.image" />
              </div>
            </td>
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ order.id }}
            </th>
            <td class="px-6 py-4">
              {{ order.address }}
            </td>

            <td class="px-6 py-4">
              {{ $formatCurrency(order.total, "PHP") }} (
              {{ order.cart.length }} )
            </td>
            <td class="px-6 py-4">
              {{ order.createdAt }}
            </td>
            <td class="px-6 py-4">
              {{ order.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseSection>
</template>
