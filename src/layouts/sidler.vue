<script setup lang="ts">
import { ref } from "vue";
import { useToolStore } from "../pages/tool.store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
const route = useRoute();
const router = useRouter();
const toolStore = useToolStore();
const { menuTools } = storeToRefs(toolStore);

const expandedKeys = useStorage<string[]>("expnandedKeys", [], undefined, {
  deep: true,
  serializer: {
    read: (v) => (v ? JSON.parse(v) : []),
    write: (v) => JSON.stringify(v),
  },
});
const handleIUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys;
};
const collapsed = ref(false);
</script>

<template>
  <div>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <!-- logo位置 -->

      <div
        @click.stop="router.push('/')"
        :class="!collapsed ? 'text-white' : 'text-opacity-0 text-white'"
        class="flex items-center justify-center h-16 text-base truncate transition-all cursor-pointer transition-duration-300 logo-bg"
      >
        帮助开发人员和IT人员
      </div>

      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :value="route.path"
        :expandedKeys="expandedKeys"
        :options="menuTools"
        :collapsed-icon-size="22"
        :on-update:expanded-keys="handleIUpdateExpandedKeys"
      />
    </n-layout-sider>
  </div>
</template>

<style lang="scss" scoped></style>
