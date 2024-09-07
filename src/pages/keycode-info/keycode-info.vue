<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const key = ref<string>();
  const keyCode = ref<number>();
  const code = ref<string>();
  const location = ref<number>();
  const handleKeycodeDown = (e: KeyboardEvent) => {
    key.value = e.key;
    keyCode.value = e.keyCode;
    code.value = e.code;
    location.value = e.location;
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeycodeDown);
  });
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeycodeDown);
  });
</script>

<template>
  <div>
    <n-space vertical>
      <div
        class="flex flex-col items-center justify-center px-4 bg-white border rounded min-h-40"
      >
        <n-text class="text-2xl font-bold" v-if="key">{{ key }}</n-text>
        <n-text class="mt-2 text-center text-zinc-500">
          Press the key on your keyboard you want to get info about this key
        </n-text>
      </div>
      <div v-if="key">
        <n-space vertical>
          <n-input-group>
            <n-input-group-label style="flex: 0 0 130px"
              >Key</n-input-group-label
            >
            <InputCopy placeholder="" :value="key" />
          </n-input-group>
          <n-input-group>
            <n-input-group-label style="flex: 0 0 130px"
              >KeyCoe</n-input-group-label
            >
            <InputCopy placeholder="" :value="keyCode" />
          </n-input-group>
          <n-input-group>
            <n-input-group-label style="flex: 0 0 130px"
              >Code</n-input-group-label
            >
            <InputCopy placeholder="" :value="code" />
          </n-input-group>
          <n-input-group>
            <n-input-group-label style="flex: 0 0 130px"
              >Location</n-input-group-label
            >
            <InputCopy placeholder="" :value="location" />
          </n-input-group>
        </n-space>
      </div>
    </n-space>
  </div>
</template>

<style lang="scss" scoped></style>
