<script setup lang="ts">
  import sidler from './sidler.vue';
  import Header from './header.vue';
  import BaseHead from '../components/BaseHead.vue';
  import { useRoute } from 'vue-router';
  import { computed, provide, watch } from 'vue';
  import { translate } from '@/plugins/i18n.plugins.ts';
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import { useTitle } from '@vueuse/core';

  const styleStore = useStyleStore();
  const { isSmallScreen, collapsed } = storeToRefs(styleStore);
  const route = useRoute();
  const key = computed<string>(() => {
    const key = route.path.replace(/\//g, '');
    provide('_function', key);
    return key;
  });
  const name = computed<string>(() => translate(`tools.${key.value}.title`));
  watch(
    () => route.path,
    (val) => {
      if (val !== '/') {
        useTitle(`${name.value} - Dool`);
      }
    }
  );
  const description = computed<string>(() =>
    translate(`tools.${key.value}.description`)
  );
</script>

<template>
  <n-layout class="h-screen" has-sider>
    <sidler />
    <n-layout content-style="padding: 24px;" embedded>
      <n-back-top />

      <Header />
      <n-layout-content embedded>
        <BaseHead
          v-if="route.path !== '/'"
          class="py-10 max-w-[600px] mx-auto"
          :name="name"
          :description="description"
        />
        <div
          v-if="route.path !== '/'"
          class="flex flex-row justify-center gap-[16px] flex-wrap items-start tool-content"
        >
          <RouterView />
        </div>
        <div class="mt-10" v-else>
          <RouterView />
        </div>
      </n-layout-content>
    </n-layout>
    <div
      class="absolute top-0 overflow-hidden left-0 w-full h-full bg-[#00000080] cursor-pointer"
      @click.stop="styleStore.collapsed = !styleStore.collapsed"
      v-show="isSmallScreen && !collapsed"
    ></div>
  </n-layout>
</template>

<style lang="scss" scoped>
  .tool-content > * {
    flex: 0 1 600px;
  }
</style>
