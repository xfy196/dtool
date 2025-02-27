<template>
  <n-card>
    <n-upload
      :show-file-list="false"
      accept=".mp4"
      directory-dnd
      @change="handleChange"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <ArchiveIcon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
      </n-upload-dragger>
    </n-upload>
    <video
      class="mt-2"
      v-if="convertVideoUrl"
      :src="convertVideoUrl"
      controls
    ></video>
  </n-card>
</template>

<script lang="ts" setup>
  import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
  import { ref } from 'vue';
  import { UploadFileInfo, useMessage } from 'naive-ui';

  import { FFmpeg } from '@ffmpeg/ffmpeg';
  import { fetchFile, toBlobURL } from '@ffmpeg/util';
  const convertVideoUrl = ref<string>('');
  const ffmpeg = new FFmpeg();
  const message = useMessage();
  const convertVideo = async (file: File) => {
    const msgInstance = message.loading('Transcoding...', {
      duration: 0
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`/js/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`/wasm/ffmpeg-core.wasm`, 'application/wasm'),
      workerURL: await toBlobURL(`/js/ffmpeg-core.worker.js`, 'text/javascript')
    });
    await ffmpeg.writeFile('test.avi', await fetchFile(file));
    await ffmpeg.exec(['-i', 'test.mp4', 'test.avi']);
    const data = await ffmpeg.readFile('test.avi');
    const url = URL.createObjectURL(
      new Blob([(data as Uint8Array).buffer], { type: 'video/x-msvideo' })
    );
    msgInstance.destroy();
    return {
      url
    };
  };

  const handleChange = async ({ file }: { file: UploadFileInfo }) => {
    if (file?.file) {
      const { url } = await convertVideo(file?.file);
      convertVideoUrl.value = url;
    }
  };
</script>
<style lang="scss" scoped></style>
