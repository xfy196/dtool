<script setup lang="ts">
import FavoriteButton from "@/components/FavoriteButton.vue";
defineProps(["name", "description", "key"]);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between border-b-2 pb-2">
      <div class="text-3xl">{{ name }}</div>
      <FavoriteButton :name="key" />
    </div>
    <div class="mt-2" >{{ description }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
