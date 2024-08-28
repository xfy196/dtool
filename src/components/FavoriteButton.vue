<script setup lang="ts">
import { FavoriteBorderRound, FavoriteOutlined } from "@vicons/material";
import { useThemeVars } from "naive-ui";
import { useToolStore } from "@/pages/tool.store";
const themeVars = useThemeVars();
const toolStore = useToolStore();
defineProps({
  funcion: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary circle>
        <template #icon>
          <n-icon>
            <FavoriteBorderRound
              v-show="!toolStore.isFavorite(funcion)"
              @click.stop="toolStore.addToolToFavorite(funcion)"
            />
            <FavoriteOutlined
              :color="themeVars.primaryColor"
              v-show="toolStore.isFavorite(funcion)"
              @click.stop="toolStore.removeToolFromFavorite(funcion)"
            />
          </n-icon>
        </template>
      </n-button>
    </template>
    <span>{{ toolStore.isFavorite(funcion) ? "取消收藏" : "加入收藏" }}</span>
  </n-tooltip>
</template>

<style lang="scss" scoped></style>
