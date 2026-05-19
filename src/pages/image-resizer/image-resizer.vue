<script setup lang="ts">
  import { ref, computed, watch, onBeforeUnmount } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage, type UploadFileInfo } from 'naive-ui';
  import { Download, Lock, LockOpen, Refresh } from '@vicons/tabler';
  import {
    buildDownloadFileName,
    getOutputExtension,
    getOutputMimeType,
    isSupportedImageFile,
    loadImageFromFile,
    resizeImageFile,
    SUPPORTED_IMAGE_ACCEPT
  } from './image-resizer.models';

  const { t } = useI18n();
  const message = useMessage();

  const ACCEPT = SUPPORTED_IMAGE_ACCEPT;
  const MAX_SIZE = 20 * 1024 * 1024;
  const DEFAULT_WIDTH = 800;
  const DEFAULT_HEIGHT = 600;

  const sourceFile = ref<File | null>(null);
  const previewUrl = ref('');
  const originalWidth = ref(0);
  const originalHeight = ref(0);
  const targetWidth = ref(DEFAULT_WIDTH);
  const targetHeight = ref(DEFAULT_HEIGHT);
  const aspectRatioLocked = ref(false);
  const aspectRatio = ref(1);
  const downloading = ref(false);
  const resizingField = ref<'width' | 'height' | null>(null);

  const hasImage = computed(() => !!sourceFile.value && !!previewUrl.value);

  const originalSizeLabel = computed(() => {
    if (!hasImage.value) {
      return t('tools.image-resizer.originalSizeEmpty');
    }
    return t('tools.image-resizer.originalSizeValue', {
      width: originalWidth.value,
      height: originalHeight.value
    });
  });

  const originalRatioLabel = computed(() => {
    if (!hasImage.value) {
      return t('tools.image-resizer.originalRatioEmpty');
    }
    const ratio = originalWidth.value / Math.max(originalHeight.value, 1);
    return t('tools.image-resizer.originalRatioValue', {
      ratio: ratio.toFixed(3)
    });
  });

  const showLockHint = computed(
    () => !hasImage.value && aspectRatioLocked.value
  );

  function revokePreview() {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = '';
    }
  }

  function applyAspectFromWidth() {
    if (!aspectRatioLocked.value || !hasImage.value) return;
    targetHeight.value = Math.max(
      1,
      Math.round(targetWidth.value / aspectRatio.value)
    );
  }

  function applyAspectFromHeight() {
    if (!aspectRatioLocked.value || !hasImage.value) return;
    targetWidth.value = Math.max(
      1,
      Math.round(targetHeight.value * aspectRatio.value)
    );
  }

  watch(targetWidth, () => {
    if (resizingField.value === 'height') return;
    resizingField.value = 'width';
    applyAspectFromWidth();
    resizingField.value = null;
  });

  watch(targetHeight, () => {
    if (resizingField.value === 'width') return;
    resizingField.value = 'height';
    applyAspectFromHeight();
    resizingField.value = null;
  });

  async function handleFileChange({ file }: { file: UploadFileInfo }) {
    const raw = file.file;
    if (!raw) return;

    if (!isSupportedImageFile(raw)) {
      message.warning(t('tools.image-resizer.errUnsupportedFormat'));
      return;
    }
    if (raw.size > MAX_SIZE) {
      message.error(t('tools.image-resizer.errFileTooLarge'));
      return;
    }

    try {
      const img = await loadImageFromFile(raw);
      revokePreview();
      sourceFile.value = raw;
      previewUrl.value = URL.createObjectURL(raw);
      originalWidth.value = img.naturalWidth;
      originalHeight.value = img.naturalHeight;
      aspectRatio.value = img.naturalWidth / Math.max(img.naturalHeight, 1);
      targetWidth.value = img.naturalWidth;
      targetHeight.value = img.naturalHeight;
    } catch {
      message.error(t('tools.image-resizer.errLoadImage'));
    }
  }

  function toggleAspectLock() {
    if (!hasImage.value) {
      message.warning(t('tools.image-resizer.lockRequiresImage'));
      aspectRatioLocked.value = false;
      return;
    }
    aspectRatioLocked.value = !aspectRatioLocked.value;
    if (aspectRatioLocked.value) {
      aspectRatio.value =
        originalWidth.value / Math.max(originalHeight.value, 1);
      applyAspectFromWidth();
    }
  }

  function handleReset() {
    revokePreview();
    sourceFile.value = null;
    originalWidth.value = 0;
    originalHeight.value = 0;
    targetWidth.value = DEFAULT_WIDTH;
    targetHeight.value = DEFAULT_HEIGHT;
    aspectRatioLocked.value = false;
    aspectRatio.value = 1;
  }

  async function handleDownload() {
    if (!sourceFile.value) {
      message.warning(t('tools.image-resizer.errNoImage'));
      return;
    }
    if (targetWidth.value < 1 || targetHeight.value < 1) {
      message.warning(t('tools.image-resizer.errInvalidSize'));
      return;
    }

    downloading.value = true;
    try {
      const blob = await resizeImageFile(
        sourceFile.value,
        targetWidth.value,
        targetHeight.value
      );
      const mime = getOutputMimeType(sourceFile.value);
      const ext = getOutputExtension(sourceFile.value, mime);
      const fileName = buildDownloadFileName(
        sourceFile.value.name,
        Math.round(targetWidth.value),
        Math.round(targetHeight.value),
        ext
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      message.success(t('tools.image-resizer.downloadStarted'));
    } catch {
      message.error(t('tools.image-resizer.errResize'));
    } finally {
      downloading.value = false;
    }
  }

  onBeforeUnmount(() => {
    revokePreview();
  });
</script>

<template>
  <n-card class="image-resizer-tool w-full" :bordered="true">
    <n-space vertical :size="20">
      <n-upload
        :show-file-list="false"
        :accept="ACCEPT"
        directory-dnd
        :disabled="downloading"
        @change="handleFileChange"
      >
        <n-upload-dragger class="image-resizer-upload">
          <div class="flex flex-col items-center justify-center gap-2 py-6">
            <n-icon size="48" :depth="3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </n-icon>
            <n-text class="text-base font-medium">
              {{ t('tools.image-resizer.uploadHint') }}
            </n-text>
            <n-text depth="3" class="text-xs">
              {{ t('tools.image-resizer.uploadFormats') }}
            </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>

      <div
        class="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900/50"
      >
        <img
          v-if="hasImage"
          :src="previewUrl"
          alt=""
          class="max-h-[320px] max-w-full object-contain p-4"
        />
        <n-text v-else depth="3">
          {{ t('tools.image-resizer.previewEmpty') }}
        </n-text>
      </div>

      <div class="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <n-form-item
          :label="t('tools.image-resizer.widthLabel')"
          label-placement="top"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-number
              v-model:value="targetWidth"
              class="w-full"
              :min="1"
              :max="16384"
              :disabled="!hasImage"
              :show-button="false"
            />
            <n-input-group-label>px</n-input-group-label>
          </n-input-group>
        </n-form-item>

        <n-form-item
          :label="t('tools.image-resizer.heightLabel')"
          label-placement="top"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-number
              v-model:value="targetHeight"
              class="w-full"
              :min="1"
              :max="16384"
              :disabled="!hasImage"
              :show-button="false"
            />
            <n-input-group-label>px</n-input-group-label>
          </n-input-group>
        </n-form-item>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              circle
              size="large"
              :type="aspectRatioLocked ? 'primary' : 'default'"
              :disabled="!hasImage"
              class="mb-0.5 sm:mb-1"
              @click="toggleAspectLock"
            >
              <template #icon>
                <n-icon>
                  <Lock v-if="aspectRatioLocked" />
                  <LockOpen v-else />
                </n-icon>
              </template>
            </n-button>
          </template>
          {{
            aspectRatioLocked
              ? t('tools.image-resizer.unlockRatio')
              : t('tools.image-resizer.lockRatio')
          }}
        </n-tooltip>
      </div>

      <n-space align="center" wrap :size="12">
        <n-tag size="small" :bordered="false">
          {{ originalSizeLabel }}
        </n-tag>
        <n-tag size="small" :bordered="false">
          {{ originalRatioLabel }}
        </n-tag>
        <n-text v-if="showLockHint" type="error" class="text-xs">
          {{ t('tools.image-resizer.lockRequiresImage') }}
        </n-text>
      </n-space>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <n-button tertiary @click="handleReset">
          <template #icon>
            <n-icon><Refresh /></n-icon>
          </template>
          {{ t('tools.image-resizer.reset') }}
        </n-button>
        <n-button
          type="primary"
          size="large"
          class="min-w-[200px] flex-1 sm:flex-none"
          :loading="downloading"
          :disabled="!hasImage"
          @click="handleDownload"
        >
          <template #icon>
            <n-icon><Download /></n-icon>
          </template>
          {{ t('tools.image-resizer.download') }}
        </n-button>
      </div>

      <n-text depth="3" class="block text-center text-xs">
        {{ t('tools.image-resizer.footerNote') }}
      </n-text>
    </n-space>
  </n-card>
</template>

<style scoped lang="scss">
  .image-resizer-tool {
    flex: 1 1 100% !important;
    width: 100%;
    max-width: min(100%, 40rem);
  }

  .image-resizer-upload {
    :deep(.n-upload-dragger) {
      border-radius: 0.75rem;
    }
  }
</style>
