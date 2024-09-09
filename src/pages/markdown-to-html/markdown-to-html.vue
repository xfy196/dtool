<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import markdownIt from 'markdown-it';
  import { ref, computed } from 'vue';
  import { Copy } from '@vicons/tabler';
  const md: markdownIt = markdownIt();
  const markdown = ref('#  Hello World');
  const html = computed(() => {
    return md.render(markdown.value);
  });
  const { copy, isSupported, copied } = useCopy({
    source: html,
    isToast: false
  });
  const printPdf = () => {
    const w = window.open();
    if (w === null) {
      return;
    }
    w.document.body.innerHTML = html.value;
    w.print();
  };
</script>

<template>
  <div>
    <div>Your Markdown Content</div>
    <n-input
      class="mt-2"
      type="textarea"
      :rows="8"
      aria-placeholder="Your Markdown Content... "
      v-model:value="markdown"
    />
    <div class="mt-6">
      <div>Output Html</div>
      <n-card class="relative mt-2">
        <div v-show="html" class="absolute right-4 top-4">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button v-if="isSupported" @click.stop="copy" circle tertiary>
                <template #icon>
                  <n-icon><Copy /></n-icon>
                </template>
              </n-button>
            </template>
            {{ copied ? 'Copied!' : 'Copy to clipboard' }}
          </n-tooltip>
        </div>
        <n-code word-wrap :code="html" :language="'html'"></n-code>
      </n-card>
      <div class="flex justify-center mt-2">
        <n-button @click.stop="printPdf">Print PDF</n-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
