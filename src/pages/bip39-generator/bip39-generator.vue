<script setup lang="ts">
  import { useStyleStore } from '@/stores/style.store';
  import * as bip39 from '@scure/bip39';
  import { useCopy } from '@/composable/copy';
  import { Copy, Refresh } from '@vicons/tabler';
  import { useThemeVars } from 'naive-ui';
  import { generateRandomHex } from '@/utils/random';
  import { wordlist as czech } from '@scure/bip39/wordlists/czech';
  import { wordlist as english } from '@scure/bip39/wordlists/english';
  import { wordlist as french } from '@scure/bip39/wordlists/french';
  import { wordlist as italian } from '@scure/bip39/wordlists/italian';
  import { wordlist as japanese } from '@scure/bip39/wordlists/japanese';
  import { wordlist as korean } from '@scure/bip39/wordlists/korean';
  import { wordlist as portuguese } from '@scure/bip39/wordlists/portuguese';
  import { wordlist as simplifiedChinese } from '@scure/bip39/wordlists/simplified-chinese';
  import { wordlist as spanish } from '@scure/bip39/wordlists/spanish';
  import { wordlist as traditionalChinese } from '@scure/bip39/wordlists/traditional-chinese';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import { computedRefreshable } from '@/composable/computedRefreshable';
  const themeVars = useThemeVars();
  const lang = ref('simplifiedChinese');
  const langs = ref<
    Array<{ label: string; value: string; wordlist: string[] }>
  >([
    {
      label: 'English',
      value: 'english',
      wordlist: english
    },
    {
      label: 'Chinese (Simplified)',
      value: 'simplifiedChinese',
      wordlist: simplifiedChinese
    },
    {
      label: 'Chinese (Traditional)',
      value: 'traditionalChinese',
      wordlist: traditionalChinese
    },
    {
      label: 'French',
      value: 'french',
      wordlist: french
    },
    {
      label: 'Italian',
      value: 'italian',
      wordlist: italian
    },
    {
      label: 'Japanese',
      value: 'japanese',
      wordlist: japanese
    },
    {
      label: 'Korean',
      value: 'korean',
      wordlist: korean
    },
    {
      label: 'Portuguese',
      value: 'portuguese',
      wordlist: portuguese
    },
    {
      label: 'Spanish',
      value: 'spanish',
      wordlist: spanish
    },
    {
      label: 'Czech',
      value: 'czech',
      wordlist: czech
    }
  ]);
  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
  const [entropy, refresh] = computedRefreshable(() => generateRandomHex(32));
  const mnemonic = computed(() =>
    bip39.entropyToMnemonic(
      new TextEncoder().encode(entropy.value),
      langs.value.find((item) => item.value === lang.value)?.wordlist ?? []
    )
  );
  const { copy, copied, isSupported } = useCopy({
    source: entropy,
    isToast: false
  });
  const { copy: copyMnemonic, copied: copiedMnemonic } = useCopy({
    source: mnemonic,
    isToast: false
  });
  const tooltipText = computed(() =>
    copied.value ? 'Copied' : 'Copy to clipboard'
  );
  const mnemonicCopyText = computed(() =>
    copiedMnemonic.value ? 'Copied' : 'Copy to clipboard'
  );
</script>

<template>
  <div>
    <div
      :class="{ 'flex-col': isSmallScreen }"
      class="flex items-center justify-center"
    >
      <n-select class="flex-[0.3]" v-model:value="lang" :options="langs" />
      <n-input-group
        :class="{ 'mt-3': isSmallScreen, ' ml-3': !isSmallScreen }"
        class="flex-[0.7]"
      >
        <n-input readonly v-model:value="entropy" />
        <n-button @click.stop="refresh" circle secondary strong>
          <template #icon>
            <n-icon>
              <Refresh :color="themeVars.textColor1" />
            </n-icon>
          </template>
        </n-button>
        <n-tooltip v-if="isSupported" trigger="hover">
          <template #trigger>
            <n-button @click.stop="copy" circle secondary strong>
              <template #icon>
                <n-icon>
                  <Copy :color="themeVars.textColor1" />
                </n-icon>
              </template>
            </n-button>
          </template>
          {{ tooltipText }}
        </n-tooltip>
      </n-input-group>
    </div>
    <div class="mt-3">
      <n-input-group>
        <n-input v-model:value="mnemonic" readonly></n-input>
        <n-tooltip v-if="isSupported" trigger="hover">
          <template #trigger>
            <n-button @click.stop="copyMnemonic" circle secondary strong>
              <template #icon>
                <n-icon>
                  <Copy :color="themeVars.textColor1" />
                </n-icon>
              </template>
            </n-button>
          </template>
          {{ mnemonicCopyText }}
        </n-tooltip>
      </n-input-group>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
