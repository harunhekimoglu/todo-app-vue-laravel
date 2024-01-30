<script setup>
import { provide } from "vue";

import { toast } from "@composables/useToast";

provide("toast", toast);
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <router-view></router-view>
  </div>
</template>
