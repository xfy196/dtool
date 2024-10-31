<script setup lang="ts">
  import { MdEditor, allToolbar, config } from 'md-editor-v3';
  import { ExportPDF, Emoji, Mark, OriginalImg } from '@vavt/v3-extension';
  import MarkExtension from 'markdown-it-mark';
  import '@vavt/v3-extension/lib/asset/ExportPDF.css';
  import '@vavt/v3-extension/lib/asset/Emoji.css';
  import '@vavt/v3-extension/lib/asset/OriginalImg.css';
  import 'md-editor-v3/lib/style.css';
  import { ref } from 'vue';
  let toolbars = [...allToolbar];
  toolbars.splice(20, 0, '0', '1', '2', '3');
  console.log('🚀 ~ toolbars:', toolbars);

  config({
    markdownItConfig(md) {
      md.use(MarkExtension);
    }
  });
  const value = ref('# Hello world!\n你好世界');
  const handleProgress = (progress: {
    val: number;
    state: string;
    n: number;
    stack: string[];
    ratio: number;
  }) => {
    console.log(`Export progress: ${progress.ratio * 100}%`);
  };
</script>

<template>
  <div class="flex-1">
    <MdEditor :toolbars="toolbars" :preview="false" htmlPreview v-model="value">
      <template #defToolbars>
        <Emoji />
        <Mark />
        <OriginalImg />
        <ExportPDF :modelValue="value" @onProgress="handleProgress" />
      </template>
    </MdEditor>
  </div>
</template>

<style lang="scss" scoped></style>
