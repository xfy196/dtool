<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';
  import { useThemeVars } from 'naive-ui';
  import { computed } from 'vue';
  withDefaults(
    defineProps<{
      readonly?: boolean;
    }>(),
    {
      readonly: true
    }
  );
  const value = defineModel<string>('value', { required: true });
  const themeVars = useThemeVars();
  const { copy, copied, isSupported } = useCopy({
    source: value,
    isToast: false
  });
  const tooltipText = computed(() =>
    copied.value ? 'Copied' : 'Copy to clipboard'
  );
</script>

<template>
  <n-form-item class="w-full">
    <n-input v-model:value="value" :readonly="readonly">
      <template #suffix>
        <n-tooltip v-if="isSupported" trigger="hover">
          <template #trigger>
            <n-button @click.stop="copy" circle quaternary>
              <template #icon>
                <n-icon>
                  <Copy :color="themeVars.textColor1" />
                </n-icon>
              </template>
            </n-button>
          </template>
          {{ tooltipText }}
        </n-tooltip>
      </template>
    </n-input>
  </n-form-item>
</template>

<style lang="scss" scoped></style>
