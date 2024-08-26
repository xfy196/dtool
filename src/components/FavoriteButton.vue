<script setup lang="ts">
import { FavoriteBorderRound, FavoriteOutlined } from "@vicons/material";
import { useStorage } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useThemeVars } from "naive-ui";

const themeVars = useThemeVars();
const props = defineProps({
  name: {
    type: String,
    default: "",
    required: true,
  },
});
const favoriteToolsName = useStorage("favoriteToolsName", []) as Ref<string[]>;
const isFavorite = computed<boolean>(() =>
  favoriteToolsName.value.includes(props.name)
);
const handleAddFavorite = () => {
  favoriteToolsName.value.push(props.name);
};
const cancelFavorite = () => {
  favoriteToolsName.value = favoriteToolsName.value.filter(
    (item) => item !== props.name
  );
};
</script>

<template>
  <n-popover trigger="hover">
    <template #trigger>
      <n-button text>
        <template #icon>
          <n-icon>
            <FavoriteBorderRound
              v-show="!isFavorite"
              @click.stop="handleAddFavorite"
            />
            <FavoriteOutlined
              :color="themeVars.primaryColor"
              v-show="isFavorite"
              @click.stop="cancelFavorite"
            />
          </n-icon>
        </template>
      </n-button>
    </template>
    <span>{{ isFavorite ? "取消收藏" : "加入收藏" }}</span>
  </n-popover>
</template>

<style lang="scss" scoped></style>
