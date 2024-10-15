<script setup lang="ts">
  import pdfSignatureDetail from './components/pdf-signature-detail.vue';
  import verifyPDF from 'pdf-signature-reader';
  import { Upload } from '@vicons/tabler';
  import { filesize } from 'filesize';
  import type { UploadFileInfo } from 'naive-ui';
  import { ref } from 'vue';
  const uploadFile = ref<UploadFileInfo>();
  const signatures = ref([]);
  const status = ref<'idle' | 'parsed' | 'error' | 'loading'>('idle');
  const handleChange = async ({ file }: { file: UploadFileInfo }) => {
    if (file?.file) {
      try {
        uploadFile.value = file;
        const fileBuffer = await file.file.arrayBuffer();
        const { signatures: parsedSignatures } = verifyPDF(fileBuffer);
        signatures.value = parsedSignatures;
        status.value = 'parsed';
      } catch (error) {
        signatures.value = [];
        status.value = 'error';
      }
    }
  };
  const formatSize = (size: number | undefined) => {
    return filesize(size ? size : 0);
  };
</script>

<template>
  <div class="flex-grow-0" style="flex: 0 0 100%">
    <n-upload
      class="max-w-[600px] mx-auto"
      accept="application/pdf"
      directory-dnd
      :show-file-list="false"
      :on-change="handleChange"
    >
      <n-upload-dragger>
        <div class="mb-3">
          <n-icon size="48" :depth="3">
            <Upload />
          </n-icon>
        </div>
        <n-text class="text-base">
          Drag and drop a PDF file here, or click to select a file
        </n-text>
        <n-p depth="3" class="mt-2">
          Please do not upload sensitive data, such as your bank card number and
          password, credit card number, expiration date, and security code
        </n-p>
      </n-upload-dragger>
    </n-upload>
    <div
      v-if="uploadFile"
      class="box-border max-w-[600px] mx-auto flex items-center h-12 p-4 mt-4 bg-white"
    >
      <div class="font-bold">
        {{ uploadFile?.name }}
      </div>
      <div class="ml-2">{{ formatSize(uploadFile?.file?.size) }}</div>
    </div>
    <div if="status === 'parsed' && signatures.length > 0">
      <div class="mt-4" v-for="(signature, index) in signatures" :key="index">
        <div class="mb-2 font-bold">Signature {{ index + 1 }} certificates</div>
        <pdfSignatureDetail :signature="signature" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
