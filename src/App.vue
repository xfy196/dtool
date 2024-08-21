<script setup lang="ts">
import { computed } from "vue";
import {useRoute} from "vue-router"
const route = useRoute()
const layout = computed(() => route?.meta?.layout)
</script>

<template>
  <n-config-provider>
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
