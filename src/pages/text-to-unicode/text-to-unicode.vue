<script setup lang="ts">
  import { computed, ref } from 'vue';
  import {
    convertTextToUnicode,
    convertUnicodeToText
  } from './text-to-unicode.service';
  import { useCopy } from '@/composable/copy';

  const fromText = ref<string>('');
  const toUnicode = computed(() => convertUnicodeToText(fromText.value));
  const fromUnicode = ref<string>('');
  const toText = computed(() => convertTextToUnicode(fromUnicode.value));
  const { isSupported, copy: copyUnicode } = useCopy({
    source: toUnicode,
    text: 'Unicode copied!'
  });
  const { copy: copyText } = useCopy({
    source: toText,
    text: 'Unicode copied!'
  });
</script>

<template>
  <n-card title="Text to Unicode">
    <n-form-item label="text">
      <n-input
        v-model:value="fromText"
        placeholder="e.g. Hello World"
        type="textarea"
      ></n-input>
    </n-form-item>
    <n-form-item label="Unicode String">
      <n-input
        readonly
        :value="toUnicode"
        placeholder="Unicode here..."
        type="textarea"
      ></n-input>
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button
        :disabled="!toUnicode"
        v-if="isSupported"
        tertiary
        @click.stop="copyUnicode"
        >Copy Unicode</n-button
      >
    </div>
  </n-card>
  <n-card title="Unicode to Text">
    <n-form-item label="Unicode">
      <n-input
        v-model:value="fromUnicode"
        placeholder="Unicode here..."
        type="textarea"
      ></n-input>
    </n-form-item>
    <n-form-item label="Text">
      <n-input
        readonly
        :value="toText"
        placeholder="Text here..."
        type="textarea"
      ></n-input>
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button
        :disabled="!toText"
        v-if="isSupported"
        tertiary
        @click.stop="copyText"
        >Copy Text</n-button
      >
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
