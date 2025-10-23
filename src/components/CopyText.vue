<script setup lang="ts">
  import { useCopy } from '@/composable/copy.ts';
  import { computed } from 'vue';

  const { text } = defineProps({
    text: String
  });
  const { copy, copied, isSupported } = useCopy({
    source: text,
    isToast: false
  });
  const tooltipText = computed(() =>
    copied.value ? 'Copied' : 'Copy to clipboard'
  );
</script>

<template>
  <div class="cursor-pointer">
    <n-tooltip v-if="isSupported" trigger="hover">
      <template #trigger>
        <span @click.stop="copy">
          {{ text }}
        </span>
      </template>
      {{ tooltipText }}
    </n-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
