<script setup lang="ts">
import { useCopy } from "@/composable/copy";
import { useVModel } from "@vueuse/core";
import { Copy } from "@vicons/tabler";
import { useThemeVars } from "naive-ui";
import { computed } from "vue";
const props = defineProps<{ value: string }>();
const emit = defineEmits(["update:value"]);
const value = useVModel(props, "value", emit);
const themeVars = useThemeVars();
const { copy, copied, isSupported } = useCopy({ source: value, isTost: false });
const tooltipText = computed(() =>
  copied.value ? "Copied" : "Copy to clipboard"
);
</script>

<template>
  <n-input v-model:value="value" readonly>
    <template #suffix>
      <n-tooltip v-if="isSupported" trigger="hover">
        <template #trigger>
          <n-button @click.stop="copy" circle quaternary type="success">
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
</template>

<style lang="scss" scoped></style>
