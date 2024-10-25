<script setup lang="ts">
  import {
    Camera,
    Video,
    PlayerPause,
    PlayerPlay,
    PlayerStop,
    Download,
    Trash
  } from '@vicons/tabler';
  import { useDevicesList, useUserMedia } from '@vueuse/core';
  import { useMediaRecorder } from './useMediaRecorder';
  import {
    onBeforeUnmount,
    ref,
    useTemplateRef,
    watchEffect,
    computed
  } from 'vue';
  import _ from 'lodash';
  import { useThemeVars } from 'naive-ui';
  const {
    videoInputs,
    audioInputs,
    permissionGranted,
    isSupported,
    ensurePermissions
  } = useDevicesList({
    requestPermissions: true,
    constraints: { video: true, audio: true },
    onUpdated() {
      refreshCurrnetDevices();
    }
  });
  const themeVars = useThemeVars();

  const currentCamera = ref(videoInputs.value[0]?.deviceId);
  const currentAudio = ref(audioInputs.value[0]?.deviceId);
  const refreshCurrnetDevices = () => {
    if (
      _.isNil(currentCamera.value) ||
      !videoInputs.value.find((i) => i.deviceId === currentCamera.value)
    ) {
      currentCamera.value = videoInputs.value[0]?.deviceId;
    }
    if (
      _.isNil(currentAudio.value) ||
      !audioInputs.value.find((i) => i.deviceId === currentAudio.value)
    ) {
      currentAudio.value = audioInputs.value[0]?.deviceId;
    }
  };
  const videoRef = useTemplateRef<HTMLVideoElement>('videoRef');
  const {
    start,
    stop,
    stream,
    enabled: isMediaStreamEnable
  } = useUserMedia({
    constraints: computed(() => ({
      video: {
        deviceId: currentCamera.value
      },
      audio: {
        deviceId: currentAudio.value
      }
    })),
    autoSwitch: true
  });
  interface Media {
    type: 'video' | 'image';
    value: string;
    createAt: Date | number;
  }
  const medias = ref<Media[]>([]);
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    onRecordingEnable,
    recordingState,
    isRecordingSupported
  } = useMediaRecorder({ stream });

  onRecordingEnable((value) => {
    console.log('🚀 ~ onRecordingEnable ~ value:', value);
    medias.value.push({
      type: 'video',
      value,
      createAt: Date.now()
    });
  });

  // 监听 video 的 dom 和 stream 都存在的时候将视频流播放
  watchEffect(() => {
    if (videoRef.value && stream.value) {
      videoRef.value.srcObject = stream.value;
    }
  });

  onBeforeUnmount(() => stop());

  // 开启web 摄像头
  const handleStartWebcam = () => {
    start();
  };
  // 截图
  const handleStartScreenshot = () => {
    if (!videoRef.value) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.value, 0, 0);
    const image = canvas.toDataURL('image/png');
    medias.value.push({
      type: 'image',
      value: image,
      createAt: Date.now()
    });
  };
  const handleDownloadMedia = (index: number) => {
    const downloadFile = medias.value[index];
    const link = document.createElement('a');
    link.href = downloadFile.value;
    link.download = `${downloadFile.type}-${downloadFile.createAt}.${downloadFile.type === 'image' ? 'png' : 'webm'}`;
    link.click();
  };
  const handleDeleteMedia = (index: number) => {
    medias.value.splice(index, 1);
  };
</script>

<template>
  <n-card v-if="!isSupported">
    Your browser does not support webcam recording.
  </n-card>
  <n-card v-else-if="!permissionGranted">
    You need to grant permission to use your webcam and microphone.
  </n-card>
  <n-card v-else>
    <n-space vertical>
      <n-form-item label="Video:" label-placement="left" :show-feedback="false">
        <n-select
          v-model:value="currentCamera"
          :options="
            videoInputs.map((item) => ({
              label: item.label,
              value: item.deviceId
            }))
          "
        />
      </n-form-item>
      <n-form-item label="Audio:" label-placement="left" :show-feedback="false">
        <n-select
          v-model:value="currentAudio"
          :options="
            audioInputs.map((item) => ({
              label: item.label,
              value: item.deviceId
            }))
          "
        />
      </n-form-item>
      <n-form-item
        v-if="!isMediaStreamEnable"
        class="flex items-center justify-center"
      >
        <n-button @click.stop="handleStartWebcam" type="primary">
          Start webcam
        </n-button>
      </n-form-item>
      <video
        v-else
        ref="videoRef"
        class="w-full max-h-full"
        autoplay
        controls
        playsinline
      ></video>
      <n-space v-if="stream" justify="space-between">
        <n-button @click.stop="handleStartScreenshot" secondary strong>
          <template #icon>
            <n-icon>
              <Camera />
            </n-icon>
          </template>
          screenshot
        </n-button>
        <n-space>
          <n-button
            v-if="recordingState === 'stopped'"
            @click.stop="startRecording"
            secondary
            strong
          >
            <template #icon>
              <n-icon>
                <Video />
              </n-icon>
            </template>
            start recording
          </n-button>
          <n-button
            v-if="recordingState === 'recording'"
            @click.stop="pauseRecording"
            secondary
            strong
          >
            <template #icon>
              <n-icon>
                <PlayerPause />
              </n-icon>
            </template>
            pause recording
          </n-button>
          <n-button
            v-if="recordingState === 'paused'"
            @click.stop="resumeRecording"
            secondary
            strong
          >
            <template #icon>
              <n-icon>
                <PlayerPlay />
              </n-icon>
            </template>
            resume recording
          </n-button>
          <n-button
            type="error"
            v-if="recordingState !== 'stopped'"
            @click.stop="stopRecording"
            secondary
            strong
          >
            <template #icon>
              <n-icon>
                <PlayerStop />
              </n-icon>
            </template>
            stop recording
          </n-button>
        </n-space>
      </n-space>
      <!-- 截图和录屏的临时展示区域 -->
      <n-grid y-gap="6" x-gap="12" :cols="2">
        <n-gi v-for="(media, index) in medias" :key="index">
          <n-space vertical>
            <img :src="media.value" v-if="media.type === 'image'" alt="" />
            <video
              :src="media.value"
              v-else-if="media.type === 'video'"
              controls
              autoplay
              playsinline
            ></video>
            <n-space align="center" justify="space-between">
              <span
                :style="{ color: themeVars.textColor3 }"
                class="font-bold"
                >{{ media.type === 'image' ? 'Screenshot' : 'Video' }}</span
              >
              <div>
                <n-icon @click.stop="handleDownloadMedia(index)" :size="24">
                  <Download />
                </n-icon>
                <n-icon @click.stop="handleDeleteMedia" :size="24" class="ml-2">
                  <Trash />
                </n-icon>
              </div>
            </n-space>
          </n-space>
        </n-gi>
      </n-grid>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped></style>
