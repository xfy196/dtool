<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToolStore } from "./tool.store";
import ToolCards from "@/components/ToolCards.vue";
const { favoriteTools, tools, latestTools } = storeToRefs(useToolStore());
</script>

<template>
  <div class="">
    <div>
      <div class="mt-2">
        <div v-show="latestTools.length" class="text-xl font-bold">
          最新工具
        </div>
        <ToolCards :tools="latestTools" class="mt-2" />
      </div>
      <!-- 我的收藏 -->
      <div class="mt-2">
        <div v-show="favoriteTools.length" class="text-xl font-bold">
          我的收藏
        </div>
        <ToolCards class="mt-2" :tools="favoriteTools" />
      </div>
      <!-- 全部工具 -->
      <div class="mt-2">
        <div v-show="tools.length" class="text-xl font-bold">全部工具</div>
        <ToolCards :tools="tools" class="mt-2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
