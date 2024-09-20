<script setup lang="ts">
  import { useDark } from '@vueuse/core';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { darkTheme } from 'naive-ui';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import json from 'highlight.js/lib/languages/json';
  import yaml from 'highlight.js/lib/languages/yaml';
  import xml from 'highlight.js/lib/languages/xml';
  import ini from 'highlight.js/lib/languages/ini';
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('yaml', yaml);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', xml);
  hljs.registerLanguage('toml', ini);
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
