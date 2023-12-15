<script setup>
import AppHeader from "@view/Components/Shared/AppHeader.vue";
import AppFooter from "@view/Components/Shared/AppFooter.vue";
</script>

<template>
  <AppHeader></AppHeader>
  <main class="bg-gray-100 p-8">
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>
