<script setup lang="ts">
import sidler from "./sidler.vue";
import Header from "./header.vue";
import BaseHead from "../components/BaseHead.vue";
import { useRoute } from "vue-router";
import { computed, provide } from "vue";
import { translate } from "@/plugins/i18n.plugins.ts";
const route = useRoute();
const key = computed<string>(() => route.path.replace(/\//g, ""));
const name = computed<string>(() => translate(`tools.${key.value}.title`));
const description = computed<string>(() =>
  translate(`tools.${key.value}.description`)
);
provide("_function", key.value);

</script>

<template>
  <n-layout class="h-screen" has-sider>
    <sidler />
    <n-layout>
      <Header />
      <n-layout-content content-style="padding: 24px;">
        <div :class="{'max-w-[600px]': route.path !== '/'}" class="mx-auto my-0">
          <BaseHead v-if="route.path !== '/'"class="mb-6" :funcion="key" :name="name" :description="description" />
          <RouterView />
        </div>
      </n-layout-content>
      <!-- <n-layout-footer>成府路</n-layout-footer> -->
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped></style>
