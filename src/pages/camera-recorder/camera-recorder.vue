<script setup lang="ts">
  import { useDevicesList } from '@vueuse/core';
  import { ref } from 'vue';
  import _ from 'lodash';
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

  // 开启web 摄像头
  const handleStartWebcam = () => {};
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
      <n-form-item class="flex items-center justify-center">
        <n-button @click.stop="handleStartWebcam" type="primary">
          Start webcam
        </n-button>
      </n-form-item>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped></style>
