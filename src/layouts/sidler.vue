<script setup lang="ts">
import { computed, h, ref } from "vue";
import { useToolStore } from "../pages/tool.store";
import { storeToRefs } from "pinia";
import { MenuOption } from "naive-ui";
import { Tool } from "../pages/tool.types";
import { RouterLink, useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import MenuIconItem from "../components/MenuIconItem.vue";
const route = useRoute();
const toolStore = useToolStore();
const { toolsByCategory } = storeToRefs(toolStore);
const makeLabel = (tool: Tool) => () =>
  h(RouterLink, { to: tool.path }, { default: () => tool.name });
  const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

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
const menuOptions = computed<MenuOption[]>(() => {
  return toolsByCategory.value.map(
    ({ name, components }: { name: string; components: Tool[] }) => {
      return {
        key: name,
        label: name,
        children: components.map((tool) => {
          return {
            key: tool.path,
            label: makeLabel(tool),
            icon: makeIcon(tool),
          };
        }),
      };
    }
  );
});
const collapsed = ref(false);
</script>

<template>
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
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :value="route.path"
      :expandedKeys="expandedKeys"
      :options="menuOptions"
      :collapsed-icon-size="22"
      :on-update:expanded-keys="handleIUpdateExpandedKeys"
    />
  </n-layout-sider>
</template>

<style lang="scss" scoped></style>
