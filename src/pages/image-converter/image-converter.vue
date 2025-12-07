<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';
  import { UploadFileInfo, useMessage } from 'naive-ui';
  import {
    conversionTypes,
    validateFileFormat,
    convertImage,
    getConversionQuality
  } from './utils';

  const message = useMessage();

  const selectedConversion = ref<string>('jpg-to-png');
  const originalImageUrl = ref<string>('');
  const convertedImageUrl = ref<string>('');
  const fileName = ref<string>('');
  const loading = ref(false);

  // 当前选择的转换类型
  const currentConversion = computed(() => {
    return (
      conversionTypes.find((type) => type.value === selectedConversion.value) ||
      conversionTypes[0]
    );
  });

  // 处理文件上传
  const handleFileChange = async ({ file }: { file: UploadFileInfo }) => {
    if (!file.file) return;

    const conversion = currentConversion.value;

    // 验证文件格式
    if (!validateFileFormat(file.file, conversion.from)) {
      message.warning(
        `请上传 ${conversion.from.toUpperCase()} 格式的图片（当前选择：${conversion.label}）`
      );
      return;
    }

    // 检查文件大小（限制 20MB）
    if (file.file.size > 1024 * 1024 * 20) {
      message.error('文件大小不能超过 20MB');
      return;
    }

    loading.value = true;
    try {
      // 清理之前的 URL
      if (originalImageUrl.value) {
        URL.revokeObjectURL(originalImageUrl.value);
      }
      if (convertedImageUrl.value) {
        URL.revokeObjectURL(convertedImageUrl.value);
      }

      // 显示原始图片
      originalImageUrl.value = URL.createObjectURL(file.file);

      // 转换图片
      const quality = getConversionQuality(conversion.to);
      const convertedUrl = await convertImage(
        file.file,
        conversion.mimeType,
        quality
      );
      convertedImageUrl.value = convertedUrl;

      // 生成新的文件名
      const originalName = file.file.name.replace(/\.[^.]+$/, '');
      fileName.value = `${originalName}.${conversion.to}`;

      message.success('转换成功！');
    } catch (error) {
      console.error('转换失败:', error);
      message.error('转换失败，请重试');
    } finally {
      loading.value = false;
    }
  };

  // 切换转换类型时清空结果
  const handleConversionChange = () => {
    cleanup();
    originalImageUrl.value = '';
    convertedImageUrl.value = '';
    fileName.value = '';
  };

  // 下载转换后的图片
  const handleDownload = () => {
    if (!convertedImageUrl.value) {
      message.warning('没有可下载的图片');
      return;
    }

    try {
      // 如果是 SVG，需要特殊处理
      if (currentConversion.value.to === 'svg') {
        fetch(convertedImageUrl.value)
          .then((res) => res.text())
          .then((svgContent) => {
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download =
              fileName.value || `converted-image.${currentConversion.value.to}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            message.success('开始下载');
          })
          .catch((error) => {
            console.error('下载失败:', error);
            message.error('下载失败');
          });
      } else {
        const link = document.createElement('a');
        link.href = convertedImageUrl.value;
        link.download =
          fileName.value || `converted-image.${currentConversion.value.to}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success('开始下载');
      }
    } catch (error) {
      console.error('下载失败:', error);
      message.error('下载失败');
    }
  };

  // 清理 URL
  const cleanup = () => {
    if (originalImageUrl.value) {
      URL.revokeObjectURL(originalImageUrl.value);
    }
    if (convertedImageUrl.value) {
      URL.revokeObjectURL(convertedImageUrl.value);
    }
  };

  // 组件卸载时清理
  onBeforeUnmount(() => {
    cleanup();
  });
</script>

<template>
  <n-card title=" 图片格式转换">
    <div class="mb-4">
      <n-form-item label="转换类型" label-placement="left">
        <n-select
          v-model:value="selectedConversion"
          :options="
            conversionTypes.map((t) => ({ label: t.label, value: t.value }))
          "
          @update:value="handleConversionChange"
          style="width: 200px"
        />
      </n-form-item>
    </div>

    <n-upload
      :show-file-list="false"
      :accept="currentConversion.accept"
      directory-dnd
      @change="handleFileChange"
      :disabled="loading"
    >
      <n-upload-dragger>
        <div class="flex flex-col items-center justify-center py-8">
          <n-icon size="48" :depth="3" class="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </n-icon>
          <n-text style="font-size: 16px" class="mb-2">
            点击或拖动图片到该区域上传
          </n-text>
          <n-text depth="3" style="font-size: 12px">
            支持 {{ currentConversion.from.toUpperCase() }} 格式，最大 20MB
          </n-text>
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-spin :show="loading" class="mt-4">
      <div v-if="originalImageUrl || convertedImageUrl" class="mt-4">
        <n-grid
          :cols="2"
          x-gap="16"
          y-gap="16"
          class="mt-4"
          responsive="screen"
        >
          <n-gi v-if="originalImageUrl">
            <n-card
              :title="`原始图片 (${currentConversion.from.toUpperCase()})`"
              size="small"
            >
              <div class="flex justify-center">
                <img
                  :src="originalImageUrl"
                  alt="原始图片"
                  class="max-w-full max-h-[400px] object-contain"
                />
              </div>
            </n-card>
          </n-gi>

          <n-gi v-if="convertedImageUrl">
            <n-card
              :title="`转换后图片 (${currentConversion.to.toUpperCase()})`"
              size="small"
            >
              <div class="flex justify-center">
                <img
                  :src="convertedImageUrl"
                  alt="转换后图片"
                  class="max-w-full max-h-[400px] object-contain"
                />
              </div>
              <template #footer>
                <div class="flex justify-end">
                  <n-button type="primary" @click="handleDownload">
                    下载 {{ currentConversion.to.toUpperCase() }} 图片
                  </n-button>
                </div>
              </template>
            </n-card>
          </n-gi>
        </n-grid>
      </div>
    </n-spin>
  </n-card>
</template>

<style lang="scss" scoped></style>
