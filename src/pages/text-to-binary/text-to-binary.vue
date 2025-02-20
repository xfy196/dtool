<template>
  <n-card title="Text to Binary">
    <n-form :model="textToBinaryForm">
      <n-form-item path="text" label="Enter text to convert to binary">
        <n-input
          v-model:value="textToBinaryForm.text"
          placeholder="please enter text"
        ></n-input>
      </n-form-item>
      <n-form-item label="Enter text to convert to binary">
        <n-input
          type="textarea"
          placeholder="binary result"
          readonly
          v-model:value="textToBinary"
        ></n-input>
      </n-form-item>
      <n-flex justify="center">
        <n-button
          :disabled="!textToBinary"
          v-if="isSupported"
          tertiary
          @click.stop="handleCopyBinaryText"
        >
          Copy binary to clipboard
        </n-button>
      </n-flex>
    </n-form>
  </n-card>
  <n-card title="Binary To Text">
    <n-form :rules="binaryToTextFormRules" :model="binaryToTextForm">
      <n-form-item path="binary" label="Enter binary to convert to text ">
        <n-input
          type="textarea"
          v-model:value="binaryToTextForm.binary"
          placeholder="please enter binary"
        ></n-input>
      </n-form-item>
      <n-form-item label="Enter binary to convert to text">
        <n-input
          placeholder="text result"
          readonly
          v-model:value="binaryToText"
        ></n-input>
      </n-form-item>
      <n-flex justify="center">
        <n-button
          :disabled="!binaryToText"
          v-if="isSupported"
          tertiary
          @click.stop="handleCopyTextToBinary"
        >
          Copy text to clipboard
        </n-button>
      </n-flex>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
  /**
   * @description: 文本转二进制
   * @fileName: text-to-binary.vue
   * @author: 小小荧
   * @date: 2025-02-20 12:58:27
   * @version: V1.0.0
   */
  import { computed, ref } from 'vue';
  import {
    convertBinaryToText,
    convertTextToBinary
  } from './text-to-binary.models';
  import { useCopy } from '@/composable/copy';
  import { isNotThrowing } from '@/utils/boolean';
  import { withDefaultOnError } from '@/utils/defaults';
  const textToBinaryForm = ref({
    text: ''
  });
  const binaryToTextForm = ref({
    binary: ''
  });
  const textToBinary = computed(() => {
    return convertTextToBinary(textToBinaryForm.value.text);
  });
  const binaryToText = computed(() =>
    withDefaultOnError(
      () => convertBinaryToText(binaryToTextForm.value.binary),
      ''
    )
  );
  const binaryToTextFormRules = ref({
    binary: {
      validator: (value: string) =>
        isNotThrowing(() => convertBinaryToText(value)),
      trigger: ['input'],
      message:
        'Binary should be a valid ASCII binary string with multiples of 8 bits'
    }
  });
  const { isSupported, copy: handleCopyBinaryText } = useCopy({
    source: textToBinary
  });
  const { copy: handleCopyTextToBinary } = useCopy({
    source: binaryToText
  });
</script>
<style lang="scss" scoped></style>
