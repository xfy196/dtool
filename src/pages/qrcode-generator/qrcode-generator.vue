<script setup lang="ts">
  import { useDownloadBase64File } from '@/composable/downloadBase64';
  import { useStyleStore } from '@/stores/style.store';
  import { useMessage } from 'naive-ui';
  import { storeToRefs } from 'pinia';
  import { ref, useTemplateRef } from 'vue';
  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
  const url = ref<string>('');
  const { download } = useDownloadBase64File({
    source: url,
    fileName: 'qrcode'
  });
  const errorLevels = [
    {
      label: 'low',
      value: 'L'
    },
    {
      label: 'medium',
      value: 'M'
    },
    {
      label: 'quartile',
      value: 'Q'
    },
    {
      label: 'high',
      value: 'H'
    }
  ];
  const form = ref<{
    text: string;
    fcolor: string;
    bcolor: string;
    errorLvel: string;
  }>({
    text: 'https://dtool.tech',
    fcolor: '#000000',
    bcolor: '#ffffff',
    errorLvel: 'M'
  });
  const qrCodeRef: any = useTemplateRef('qrCodeRef');
  const downloadQrCode = () => {
    try {
      if (qrCodeRef.value.canvasRef) {
        const canvas = qrCodeRef.value.canvasRef;
        url.value = canvas.toDataURL();
        download();
      } else {
        const message = useMessage();
        message.error('no qrcode canvas');
      }
    } catch (error) {
      console.log('🚀 ~ downloadQrCode ~ error:', error);
    }
  };
</script>

<template>
  <n-card>
    <n-form
      :model="form"
      :label-placement="isSmallScreen ? 'top' : 'left'"
      label-width="130px"
    >
      <n-form-item path="text" label="Text:">
        <n-input
          v-model:value="form.text"
          placeholder="Enter text to generate QR code"
        ></n-input>
      </n-form-item>
      <n-form-item path="fcolor" label="Foreground color:">
        <n-color-picker :show-alpha="false" v-model:value="form.fcolor" />
      </n-form-item>
      <n-form-item path="fcolor" label="Background color:">
        <n-color-picker :show-alpha="false" v-model:value="form.bcolor" />
      </n-form-item>
      <n-form-item path="errorLvel" label="Error level:">
        <n-select
          v-model:value="form.errorLvel"
          :options="errorLevels"
        ></n-select>
      </n-form-item>
    </n-form>
    <div class="flex justify-center items-center">
      <n-qr-code
        ref="qrCodeRef"
        :padding="0"
        :size="160"
        :value="form.text"
        :error-level="form.errorLvel"
        :color="form.fcolor"
        :background-color="form.bcolor"
      />
    </div>
    <div class="flex justify-center items-center mt-3">
      <n-button @click="downloadQrCode" secondary>Download qr-code</n-button>
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
