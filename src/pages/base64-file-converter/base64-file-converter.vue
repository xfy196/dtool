<script setup lang="ts">
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import { ref, watch } from 'vue';
  import { isBase64 } from '@/utils/base64';
  import { FormRules } from 'naive-ui';
  import {
    getBase64MimeType,
    getExtensionFromMimeType
  } from '@/composable/downloadBase64';
  const base64Form = ref({
    filename: 'file',
    extension: '',
    fileBase64: ''
  });

  const base64FormRules: FormRules = {
    fileBase64: [
      {
        validator: (_rule, value) => {
          if (!isBase64(value, { urlSafe: true })) {
            return new Error('请输入正确的base64字符串');
          }
          return true;
        },
        trigger: ['input', 'blur']
      }
    ]
  };

  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
  watch(
    () => base64Form.value.fileBase64,
    (val) => {
      console.log('🚀 ~ watch ~ val:', val);
      console.log(getExtensionFromMimeType(getBase64MimeType(val)));
    }
  );
</script>

<template>
  <n-card title="Base64 to file">
    <n-form :rules="base64FormRules" :model="base64Form">
      <n-grid :x-gap="10">
        <n-form-item-gi label="File Name" :span="isSmallScreen ? 14 : 16">
          <n-input
            v-model:value="base64Form.filename"
            placeholder="Download FileName"
          ></n-input>
        </n-form-item-gi>
        <n-form-item-gi label="Extension" :span="isSmallScreen ? 10 : 8">
          <n-input
            v-model="base64Form.extension"
            placeholder="Extension"
          ></n-input>
        </n-form-item-gi>
      </n-grid>
      <n-form-item path="fileBase64" label-placement="left">
        <n-input
          :rows="4"
          type="textarea"
          v-model:value="base64Form.fileBase64"
          placeholder="请输入base64字符串"
        ></n-input>
      </n-form-item>
      <div class="flex justify-center items-center">
        <n-space>
          <n-button tertiary>Preview Image</n-button>
          <n-button tertiary>Download File</n-button>
        </n-space>
      </div>
    </n-form>
  </n-card>
  <n-card title="File to Base64"></n-card>
</template>

<style lang="scss" scoped></style>
