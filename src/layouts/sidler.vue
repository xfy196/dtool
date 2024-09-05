<script setup lang="ts">
  import { useToolStore } from '../pages/tool.store';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';
  import { useStorage } from '@vueuse/core';
  import { useStyleStore } from '@/stores/style.store';
  import { computed } from 'vue';

  const styleStore = useStyleStore();
  const { collapsed, isSmallScreen } = storeToRefs(styleStore);
  const route = useRoute();
  const router = useRouter();
  const toolStore = useToolStore();
  const { menuTools } = storeToRefs(toolStore);

  const position = computed(() =>
    isSmallScreen.value ? 'absolute' : 'static'
  );

  const expandedKeys = useStorage<string[]>('expnandedKeys', [], undefined, {
    deep: true,
    serializer: {
      read: (v) => (v ? JSON.parse(v) : []),
      write: (v) => JSON.stringify(v)
    }
  });
  const handleIUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys;
  };
</script>

<template>
  <div>
    <n-layout-sider
      bordered
      class="h-full"
      collapse-mode="width"
      :collapsed-width="isSmallScreen ? 0 : 64"
      :width="240"
      :collapsed="collapsed"
      :show-trigger="!isSmallScreen"
      :native-scrollbar="false"
      :position="position"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <!-- logo位置 -->

      <div
        @click.stop="router.push('/')"
        :class="!collapsed ? 'text-white' : 'text-opacity-0 text-white'"
        class="flex flex-col items-center justify-center py-2 text-base truncate transition-all cursor-pointer transition-duration-300 logo-bg"
      >
        <div class="text-2xl font-bold">dtool</div>
        <div class="mt-2">帮助开发人员和IT人员</div>
      </div>

      <n-menu
        :indent="24"
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
