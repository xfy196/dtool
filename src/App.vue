<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {darkTheme} from "naive-ui"
const route = useRoute();
const layout = computed(() => route?.meta?.layout);
const isDark = useDark()
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style scoped></style>
