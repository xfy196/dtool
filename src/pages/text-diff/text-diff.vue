<script setup lang="ts">
  import { useTemplateRef, watch, onMounted } from 'vue';
  import * as monaco from 'monaco-editor';
  import { useStyleStore } from '@/stores/style.store';
  import { useResizeObserver } from '@vueuse/core';

  const editorContainer = useTemplateRef<HTMLElement>('editorContainer');
  let editor: monaco.editor.IStandaloneCodeEditor = null;
  monaco.editor.defineTheme('dtool-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000'
    }
  });
  monaco.editor.defineTheme('dtool-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff00'
    }
  });
  const styleStore = useStyleStore();
  watch(
    () => styleStore.isDark,
    (val) => monaco.editor.setTheme(val ? 'dtool-dark' : 'dtool-light'),
    {
      immediate: true
    }
  );
  useResizeObserver(editorContainer, () => {
    if (editor) {
      editor.layout();
    }
  });
  onMounted(() => {
    if (!editorContainer.value) {
      return;
    }
  });
</script>

<template>
  <n-card>
    <n-text as="div" ref="editorContainer" class="h-[600px]"></n-text>
  </n-card>
</template>

<style lang="scss" scoped></style>
