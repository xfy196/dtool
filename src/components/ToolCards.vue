<script setup lang="ts">
import { ToolWithCategory } from "@/pages/tool.types";
import FavoriteButton from "@/components/FavoriteButton.vue";
import { useRouter } from "vue-router";
import { useThemeVars } from "naive-ui";
const themeVars = useThemeVars();
const router = useRouter();
defineProps({
  tools: {
    type: Array<ToolWithCategory>,
    default: () => [],
  },
});
</script>

<template>
  <n-grid responsive="screen" y-gap="12" x-gap="12" cols="xs:1 s:2 m:2 l:3 xl:4 2xl:4">
    <n-gi v-for="tool in tools" :key="tool.path">
      <n-card
        @click.stop="router.push(tool.path)"
        class="h-48 border-2 cursor-pointer hover:border-2 card min-h-48"
      >
        <template #header>
          <n-icon
            class="text-neutral-400"
            size="40"
            :component="tool.icon"
          ></n-icon>
        </template>
        <template #header-extra>
          <n-button
            v-if="tool.isNew"
            type="primary"
            class="mr-2"
            round
            size="tiny"
          >
            新
          </n-button>
          <FavoriteButton :funcion="tool.path.replace(/\//g, '')" />
        </template>
        <div>
          <div class="text-xl">
            {{ tool.name }}
          </div>
          <div class="line-clamp-3 text-neutral-500">
            {{ tool.description }}
          </div>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.card {
  &:hover {
    border: 1px solid v-bind("themeVars.primaryColor");
  }
}
</style>
