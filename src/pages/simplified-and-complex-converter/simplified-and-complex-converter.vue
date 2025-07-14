<template>
  <n-card title="简体中文" class="flex-1">
    <template v-if="sValue" #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            v-if="isSupported"
            @click.stop="handleCopySValue"
            circle
            size="small"
            tertiary
          >
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ copiedSValue ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    <n-input
      :rows="rows"
      v-model:value="sValue"
      type="textarea"
      placeholder="简体中文"
    />
  </n-card>
  <n-card title="繁体中文" class="flex-1">
    <template v-if="cValue" #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            size="small"
            v-if="isSupported"
            @click.stop="handleCopyCValue"
            circle
            tertiary
          >
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ copiedCValue ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    <n-input
      :rows="rows"
      v-model:value="cValue"
      type="textarea"
      placeholder="繁体中文"
    />
  </n-card>
  <n-flex justify="center">
    <n-button type="primary" @click.stop="handleToTraditional"
      >简体转繁体</n-button
    >
    <n-button type="primary" @click.stop="handleToSimplified"
      >繁体转简体</n-button
    >
  </n-flex>
</template>

<script setup lang="ts">
  import { toSimplified, toTraditional } from 'chinese-simple2traditional';
  import { setupEnhance } from 'chinese-simple2traditional/enhance';
  setupEnhance();
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';

  import { ref } from 'vue';
  const rows = ref<number>(6);
  const sValue = ref<string>('');
  const cValue = ref<string>('');
  const {
    isSupported,
    copy: handleCopySValue,
    copied: copiedSValue
  } = useCopy({
    source: sValue,
    isToast: false
  });
  const { copy: handleCopyCValue, copied: copiedCValue } = useCopy({
    source: sValue,
    isToast: false
  });
  const handleToSimplified = () => {
    const value = toSimplified(cValue.value);
    sValue.value = value;
  };
  const handleToTraditional = () => {
    const value = toTraditional(sValue.value);
    cValue.value = value;
  };
</script>
<style lang="scss" scoped></style>
