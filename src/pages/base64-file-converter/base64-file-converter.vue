<script setup lang="ts">
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import { Ref, ref, watch } from 'vue';
  import { isBase64 } from '@/utils/base64';
  import { FormRules, UploadFileInfo, useMessage } from 'naive-ui';
  import {
    getBase64MimeType,
    getExtensionFromMimeType,
    useDownloadBase64FileRef,
    usePreviewImgFormBase64
  } from '@/composable/downloadBase64';
  import { useBase64 } from '@vueuse/core';
  import { useCopy } from '@/composable/copy';
  const fileBase64 = ref('');
  const filename = ref('file');
  const extension = ref('');
  const base64Form = ref({
    fileBase64
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
      const mimeType = getBase64MimeType(val);
      if (mimeType) {
        extension.value = getExtensionFromMimeType(mimeType);
      }
    }
  );

  const { download } = useDownloadBase64FileRef({
    source: fileBase64,
    fileName: filename,
    extension: extension
  });
  // 下载
  const handleDownload = () => {
    try {
      if (!isBase64(fileBase64.value, { urlSafe: true })) {
        return;
      }
      download();
    } catch (error) {
      console.log('🚀 ~ handleDownload ~ error:', error);
    }
  };
  // 预览
  const handlePreview = () => {
    try {
      if (!isBase64(fileBase64.value, { urlSafe: true })) {
        return;
      }
      const img = usePreviewImgFormBase64(fileBase64.value);
      img.style.maxWidth = '100%';
      img.style.maxHeight = '400px';
      const previewContainer = document.getElementById('preview-container');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
      }
    } catch (error) {
      console.log('🚀 ~ handlePreview ~ error:', error);
    }
  };
  const fileInput = ref() as Ref<File>;
  const { base64: base64Res } = useBase64(fileInput);
  const { copy } = useCopy({
    source: base64Res,
    text: 'Base64 string copied to clipboard!'
  });
  const message = useMessage();
  const handleChangeFile = ({ file }: { file: UploadFileInfo }) => {
    if (file.file) {
      if (file.file.size <= 1024 * 1024 * 20) {
        fileInput.value = file.file;
        return;
      }
      message.error("File size can't be larger than 20MB");
    }
  };
</script>

<template>
  <n-card title="Base64 to file">
    <n-form :rules="base64FormRules" :model="base64Form">
      <n-grid :x-gap="10">
        <n-form-item-gi label="File Name" :span="isSmallScreen ? 14 : 16">
          <n-input
            v-model:value="filename"
            placeholder="Download FileName"
          ></n-input>
        </n-form-item-gi>
        <n-form-item-gi label="Extension" :span="isSmallScreen ? 10 : 8">
          <n-input v-model:value="extension" placeholder="Extension"></n-input>
        </n-form-item-gi>
      </n-grid>
      <n-form-item
        :show-feedback="false"
        path="fileBase64"
        label-placement="left"
      >
        <n-input
          :rows="4"
          type="textarea"
          v-model:value="base64Form.fileBase64"
          placeholder="请输入base64字符串"
        ></n-input>
      </n-form-item>
      <div class="flex justify-center py-2">
        <div id="preview-container" />
      </div>
      <div class="flex items-center justify-center">
        <n-space>
          <n-button tertiary @click.stop="handlePreview"
            >Preview Image</n-button
          >
          <n-button @click.stop="handleDownload" tertiary
            >Download File</n-button
          >
        </n-space>
      </div>
    </n-form>
  </n-card>
  <n-card title="File to Base64">
    <n-form-item label-placement="left">
      <n-upload
        :show-file-list="false"
        @change="handleChangeFile"
        directory-dnd
      >
        <n-upload-dragger>
          <n-text class="mb-3">
            Drag and drop a file here, or click to select a file
          </n-text>
          <n-divider> or </n-divider>
          <n-button>Select File</n-button>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>
    <n-form-item label-placement="left">
      <n-input
        placeholder="文件的Base64内容"
        :rows="4"
        type="textarea"
        readonly
        :value="base64Res"
      ></n-input>
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button @click.stop="copy" tertiary>Copy</n-button>
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
