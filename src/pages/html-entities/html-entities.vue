<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import { escape, unescape } from 'lodash';
  import { computed, ref } from 'vue';
  const html = ref('<title>IT Tool</title>');
  const escapedHtml = computed(() => escape(html.value));
  const { copy: handleCopyEscapeHtml, isSupported } = useCopy({
    source: escapedHtml
  });
  const eHtml = ref('&lt;title&gt;IT Tool&lt;/title&gt;');
  const unescapedHtml = computed(() => unescape(eHtml.value));
  const { copy: handleCopyUnEscapeHtml } = useCopy({
    source: unescapedHtml
  });
</script>

<template>
  <n-card title="Escape html entities">
    <n-form>
      <n-form-item :show-feedback="false" label="Your string :">
        <n-input type="textarea" v-model:value="html"></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false" label="Your string escaped :">
        <n-input type="textarea" readonly :value="escapedHtml"></n-input>
      </n-form-item>
      <n-flex justify="center" class="mt-2">
        <n-button tertiary @click="handleCopyEscapeHtml" v-if="isSupported"
          >Copy</n-button
        >
      </n-flex>
    </n-form>
  </n-card>
  <n-card title="Unescape html entities">
    <n-form>
      <n-form-item :show-feedback="false" label="Your string :">
        <n-input type="textarea" v-model:value="eHtml"></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false" label="Your string escaped :">
        <n-input type="textarea" readonly :value="unescapedHtml"></n-input>
      </n-form-item>
      <n-flex justify="center" class="mt-2">
        <n-button tertiary @click="handleCopyUnEscapeHtml" v-if="isSupported"
          >Copy</n-button
        >
      </n-flex>
    </n-form>
  </n-card>
</template>

<style lang="scss" scoped></style>
