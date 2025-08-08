<script setup lang="ts">
  import { useTemplateRef, watch, onMounted } from 'vue';
  import * as monaco from 'monaco-editor';
  import { useStyleStore } from '@/stores/style.store';
  import { useResizeObserver } from '@vueuse/core';
  import loader, { Monaco } from '@monaco-editor/loader';
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();
  watch(
    () => locale.value,
    () => {
      location.reload();
    }
  );

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
    const langMap: Record<string, string> = {
      cn: 'zh-cn',
      en: 'en'
    };

    loader.config({ monaco });
    loader.config({
      'vs/nls': { availableLanguages: { '*': langMap[locale.value] || 'cn' } }
    }); // availableLanguages中可以配置想要的语言，例如de、zh-cn等
    loader.init().then((monaco: Monaco) => {
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
        original: monaco.editor.createModel(
          JSON.stringify(
            {
              employee: {
                name: 'John',
                salary: 56000,
                married: true
              }
            },
            null,
            2
          ),
          'json'
        ),
        modified: monaco.editor.createModel(
          JSON.stringify(
            {
              employee: {
                name: 'Nike',
                salary: 56000,
                married: true
              }
            },
            null,
            2
          ),
          'json'
        )
      });
    });
  });
</script>

<template>
  <n-card style="flex: 1 1 0">
    <div ref="editorContainer" id="editorContainer" class="h-[600px]"></div>
  </n-card>
</template>

<style lang="scss" scoped></style>
