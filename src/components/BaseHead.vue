<script setup lang="ts">
import FavoriteButton from "@/components/FavoriteButton.vue";
defineProps(["name", "description", "funcion"]);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between pb-2 border-b-2">
      <div class="text-3xl">{{ name }}</div>
      <FavoriteButton :funcion="funcion" />
    </div>
    <div class="mt-2" >{{ description }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
