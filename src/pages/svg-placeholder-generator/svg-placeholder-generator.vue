<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import { Copy } from '@vicons/tabler';
  import { textToBase64 } from '@/utils/base64';
  import { useDownloadBase64File } from '@/composable/downloadBase64';
  const width = ref(600);
  const height = ref(400);
  const fontSize = ref(24);
  const backgroundColor = ref('#cccccc');
  const textColor = ref('#333333');
  const customText = ref('');
  const svgHtml = computed(
    () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.value} ${height.value}" width="${width.value}" height="${height.value}">
<rect width="${width.value}" height="${height.value}" fill="${backgroundColor.value}"></rect>
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize.value}px" fill="${textColor.value}">${customText.value.length > 0 ? customText.value : width.value + 'x' + height.value}</text>   
</svg>`
  );
  const base64 = computed(
    () => `data:image/svg+xml;base64,${textToBase64(svgHtml.value, {})}`
  );
  const { isSupported, copy } = useCopy({
    source: svgHtml
  });
  const { copy: handleCopyBase64 } = useCopy({
    source: base64
  });
  const { download } = useDownloadBase64File({
    source: base64,
    fileName: 'placeholder',
    extension: 'svg'
  });

  const onlineUrl = computed(
    () =>
      `https://placehold.dtool.tech/${width.value}x${height.value}/${backgroundColor.value.slice(1)}/${textColor.value.slice(1)}?text=${customText.value}`
  );

  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
</script>

<template>
  <n-form label-placement="left" :label-width="100">
    <n-grid :x-gap="12">
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Width (in px)">
        <n-input-number
          v-model:value="width"
          placeholder="SVG width..."
        ></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Background">
        <n-color-picker :show-alpha="false" v-model:value="backgroundColor" />
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Height (in px)">
        <n-input-number
          v-model:value="height"
          placeholder="SVG height..."
        ></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Text color">
        <n-color-picker :show-alpha="false" v-model:value="textColor" />
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Font size">
        <n-input-number
          v-model:value="fontSize"
          placeholder="SVG fontsize..."
        ></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="Custom text">
        <n-input
          v-model:value="customText"
          placeholder="SVG Custom text..."
        ></n-input>
      </n-form-item-gi>
    </n-grid>

    <n-form-item label-placement="top" label="SVG HTML element">
      <div class="w-[600px] bg-white relative p-4">
        <div v-if="svgHtml" class="absolute top-2 right-2">
          <n-button v-if="isSupported" @click.stop="copy" circle tertiary>
            <template #icon>
              <n-icon>
                <Copy />
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-code :code="svgHtml" class="svgCode" language="html"></n-code>
      </div>
    </n-form-item>
    <n-form-item>
      <InputCopy v-model:value="onlineUrl" readonly />
    </n-form-item>
    <n-form-item class="flex justify-center items-center">
      <n-space>
        <n-button tertiary @click="copy"> Copy svg </n-button>
        <n-button tertiary @click="handleCopyBase64"> Copy base64 </n-button>
        <n-button tertiary @click="download"> Download svg </n-button>
      </n-space>
    </n-form-item>
  </n-form>
  <div>
    <img :src="base64" alt="Image" />
  </div>
</template>

<style lang="scss" scoped>
  .svgCode {
    :deep(.__code__) {
      overflow-x: auto;
    }
  }
</style>
