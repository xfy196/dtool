<script setup lang="ts">
  import { useTemplateRef, watch, onMounted } from 'vue';
  import * as monaco from 'monaco-editor';
  import { useStyleStore } from '@/stores/style.store';
  import { useResizeObserver } from '@vueuse/core';

  const editorContainer = useTemplateRef<HTMLElement>('editorContainer');
  let editor: monaco.editor.IStandaloneDiffEditor | null = null;
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
      (editor as any).layout();
    }
  });
  onMounted(() => {
    if (!editorContainer.value) {
      return;
    }
    editor = monaco.editor.createDiffEditor(editorContainer.value, {
      originalEditable: true,
      lineNumbers: 'on',
      minimap: {
        enabled: false
      }
    });
    editor.setModel({
      original: monaco.editor.createModel('original text', 'txt'),
      modified: monaco.editor.createModel('modified text', 'txt')
    });
  });
</script>

<template>
  <n-card style="flex: 1 1 0">
    <div ref="editorContainer" class="h-[600px]"></div>
  </n-card>
</template>

<style lang="scss" scoped></style>
