<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from 'naive-ui';
  import { ArrowsVertical, Copy } from '@vicons/tabler';
  import { useCopy } from '@/composable/copy';
  import {
    gbkHexToText,
    textToGbkHex,
    type Gb2312ConvertMode
  } from './gb2312-converter.models';

  const { t } = useI18n();
  const message = useMessage();

  const mode = ref<Gb2312ConvertMode>('text-to-hex');
  const inputValue = ref('');
  const outputValue = ref('');
  const textareaRows = 18;

  const modeSubtitle = computed(() =>
    mode.value === 'text-to-hex'
      ? t('tools.gb2312-converter.modeToHex')
      : t('tools.gb2312-converter.modeToText')
  );

  const inputLabel = computed(() =>
    mode.value === 'text-to-hex'
      ? t('tools.gb2312-converter.inputLabelText')
      : t('tools.gb2312-converter.inputLabelHex')
  );

  const inputPlaceholder = computed(() =>
    mode.value === 'text-to-hex'
      ? t('tools.gb2312-converter.placeholderText')
      : t('tools.gb2312-converter.placeholderHex')
  );

  const instructions = computed(() => [
    t('tools.gb2312-converter.inst1'),
    t('tools.gb2312-converter.inst2'),
    t('tools.gb2312-converter.inst3'),
    t('tools.gb2312-converter.inst4')
  ]);

  const {
    isSupported,
    copy: handleCopyOutput,
    copied: copiedOutput
  } = useCopy({
    source: outputValue,
    isToast: false
  });

  function handleConvert() {
    try {
      if (mode.value === 'text-to-hex') {
        outputValue.value = textToGbkHex(inputValue.value);
      } else {
        outputValue.value = gbkHexToText(inputValue.value);
      }
    } catch (e) {
      const err = e instanceof Error ? e.message : '';
      if (err === 'INVALID_HEX_LEN') {
        message.error(t('tools.gb2312-converter.errInvalidHexLen'));
      } else if (err === 'INVALID_HEX_BYTE') {
        message.error(t('tools.gb2312-converter.errInvalidHexByte'));
      } else {
        message.error(t('tools.gb2312-converter.errConvert'));
      }
    }
  }

  function toggleMode() {
    mode.value = mode.value === 'text-to-hex' ? 'hex-to-text' : 'text-to-hex';
    const prevIn = inputValue.value;
    const prevOut = outputValue.value;
    inputValue.value = prevOut;
    outputValue.value = prevIn;
  }

  function handleClear() {
    inputValue.value = '';
    outputValue.value = '';
  }
</script>

<template>
  <n-flex justify="center" class="gb2312-full gb2312-hint">
    <n-text depth="3" role="status">{{ modeSubtitle }}</n-text>
  </n-flex>

  <n-card :title="inputLabel" class="flex-1 gb2312-panel">
    <n-input
      v-model:value="inputValue"
      type="textarea"
      :rows="textareaRows"
      :placeholder="inputPlaceholder"
    />
  </n-card>

  <n-card
    :title="t('tools.gb2312-converter.outputLabel')"
    class="flex-1 gb2312-panel"
  >
    <template v-if="outputValue" #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            v-if="isSupported"
            circle
            size="small"
            tertiary
            @click.stop="handleCopyOutput"
          >
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ copiedOutput ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    <n-input
      v-model:value="outputValue"
      type="textarea"
      :rows="textareaRows"
      readonly
    />
  </n-card>

  <n-flex justify="center" class="gb2312-full">
    <n-button type="primary" @click="handleConvert">
      {{ t('tools.gb2312-converter.convert') }}
    </n-button>
    <n-button @click="toggleMode">
      <template #icon>
        <n-icon><ArrowsVertical /></n-icon>
      </template>
      {{ t('tools.gb2312-converter.switchDir') }}
    </n-button>
    <n-button @click="handleClear">
      {{ t('tools.gb2312-converter.clear') }}
    </n-button>
  </n-flex>

  <n-card
    :title="t('tools.gb2312-converter.instructionsTitle')"
    class="gb2312-full"
    size="small"
  >
    <n-ol>
      <n-li v-for="(item, index) in instructions" :key="index">
        {{ item }}
      </n-li>
    </n-ol>
  </n-card>
</template>

<style scoped lang="scss">
  .gb2312-panel {
    flex: 1 1 36rem !important;
    max-width: min(100%, 36rem);
  }

  .gb2312-full {
    flex: 1 1 100% !important;
    width: 100%;
    max-width: min(100%, 72rem);
  }
</style>
