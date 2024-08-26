<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "@vicons/tabler";
import { useI18n } from "vue-i18n";
import { SelectOption } from "naive-ui";
import { translate } from "../plugins/i18n.plugins";
import { SunnyOutline } from "@vicons/ionicons5";
import { Moon } from "@vicons/tabler";
import { useDark, useStorage, useToggle } from "@vueuse/core";
import SearchResult from "../components/SearchResult.vue";
const { locale } = useI18n();

const lang = useStorage("lang", 'zh');

locale.value = lang.value;

const searchVisible = ref<boolean>(false);

watch(lang, (newLang) => {
  locale.value = newLang;
});

const isDark = useDark();
const toogleDark = useToggle(isDark);

const langOptions = ref<Array<SelectOption>>([
  {
    label: "中文",
    value: "zh",
  },
  {
    label: "English",
    value: "en",
  },
]);
const handleShowSearch = () => {
  searchVisible.value = !searchVisible.value;
};
</script>

<template>
  <n-layout-header class="mt-2 px-2">
    <div class="flex">
      <div
        @click.stop="handleShowSearch"
        class="mr-2 flex-1 cursor-pointer dark:bg-opacity-15 bg-[#2d3338] bg-opacity-5 h-[34px] rounded px-3 flex items-center"
      >
        <n-icon :component="Search" class="mr-2" />
        <div>{{ translate("tools.search") }}</div>
      </div>
      <n-select class="w-24" v-model:value="lang" :options="langOptions" />
      <div class="flex ml-2">
        <n-button circle @click.stop="toogleDark()" class="text-2xl">
          <template #icon>
            <n-icon>
              <SunnyOutline v-if="isDark" />
              <Moon v-else />
            </n-icon>
          </template>
        </n-button>
      </div>
      <SearchResult v-model:show="searchVisible" />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped></style>
