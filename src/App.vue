<script setup lang="ts">
  import { useDark, useStorage } from '@vueuse/core';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { darkTheme } from 'naive-ui';
  import { useI18n } from 'vue-i18n';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import json from 'highlight.js/lib/languages/json';
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('json', json);
  const { locale } = useI18n();
  const lang = useStorage('lang', 'zh');
  locale.value = lang.value;
  const route = useRoute();
  const layout = computed(() => route?.meta?.layout);
  const isDark = useDark();
</script>

<template>
  <n-config-provider :hljs="hljs" :theme="isDark ? darkTheme : null">
    <NGlobalStyle />
    <NMessageProvider placement="top">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style scoped></style>
