<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Search, Menu2, Home2 } from '@vicons/tabler';
  import { useI18n } from 'vue-i18n';
  import { SelectOption } from 'naive-ui';
  import { translate } from '../plugins/i18n.plugins';
  import { Moon, BrandGithub, Sun } from '@vicons/tabler';
  import { useStorage } from '@vueuse/core';
  import { useStyleStore } from '@/stores/style.store';
  import SearchResult from '../components/SearchResult.vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  const { locale } = useI18n();
  const router = useRouter();
  const lang = useStorage('lang', 'zh');

  locale.value = lang.value;

  const searchVisible = ref<boolean>(false);

  const styleStore = useStyleStore();
  const { isDark, isSmallScreen } = storeToRefs(styleStore);

  watch(lang, (newLang) => {
    locale.value = newLang;
  });

  const langOptions = ref<Array<SelectOption>>([
    {
      label: '中文',
      value: 'zh'
    },
    {
      label: 'English',
      value: 'en'
    }
  ]);
  const handleShowSearch = () => {
    searchVisible.value = !searchVisible.value;
  };
</script>

<template>
  <div class="flex">
    <n-button
      quaternary
      @click="styleStore.collapsed = !styleStore.collapsed"
      circle
      v-show="isSmallScreen"
    >
      <template #icon>
        <n-icon :size="24">
          <Menu2 />
        </n-icon>
      </template>
    </n-button>
    <n-button
      @click.stop="router.push('/')"
      quaternary
      circle
      v-show="isSmallScreen"
    >
      <template #icon>
        <n-icon :size="24">
          <Home2 />
        </n-icon>
      </template>
    </n-button>

    <div
      @click.stop="handleShowSearch"
      class="mr-2 flex-1 cursor-pointer dark:bg-opacity-15 bg-[#2d3338] bg-opacity-5 h-[34px] rounded px-3 flex items-center"
    >
      <n-icon :component="Search" class="mr-2" />
      <div>{{ translate('tools.search') }}</div>
    </div>
    <n-select
      v-show="!isSmallScreen"
      class="w-24"
      v-model:value="lang"
      :options="langOptions"
    />
    <div v-show="!isSmallScreen" class="flex ml-2">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button quaternary circle>
            <template #icon>
              <a href="https://github.com/xfy196/DTOOL" target="__blank">
                <n-icon :size="24">
                  <BrandGithub />
                </n-icon>
              </a>
            </template>
          </n-button>
        </template>
        GitHub 仓库
      </n-tooltip>
    </div>
    <div v-show="!isSmallScreen" class="flex ml-2">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button quaternary circle @click.stop="styleStore.toggleDark()">
            <template #icon>
              <n-icon :size="24">
                <Sun v-if="isDark" />
                <Moon v-else />
              </n-icon>
            </template>
          </n-button>
        </template>
        {{ isDark ? '切换到浅色模式' : '切换到深色模式' }}
      </n-tooltip>
    </div>

    <SearchResult v-model:show="searchVisible" />
  </div>
</template>

<style lang="scss" scoped></style>
