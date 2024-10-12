<script setup lang="ts">
  import { ref } from 'vue';
  import SnowflakeIdGenerator from './snowflake-id-generator.service.ts';
  import { computedRefreshable } from '@/composable/computedRefreshable';
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import InputCopy from '@/components/InputCopy.vue';
  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
  const mid = ref<number>(1024);
  const offset = ref<number>(2048);
  const [snowFlakeId, refresh] = computedRefreshable(
    () =>
      new SnowflakeIdGenerator({
        mid: mid.value,
        offset: offset.value
      }).generate() as string
  );
</script>

<template>
  <!-- 两个配置项 随机数，时间偏移量 -->
  <n-form :label-width="100" label-placement="left">
    <n-grid :gap="10">
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="随机数">
        <n-input-number
          :min="0"
          placeholder="Please enter a random number"
          v-model:value="mid"
        ></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="isSmallScreen ? 24 : 12" label="时间偏移量">
        <n-input-number
          :min="0"
          placeholder="Please enter a time offset"
          v-model:value="offset"
        ></n-input-number>
      </n-form-item-gi>
    </n-grid>
    <n-form-item label="雪花 ID">
      <InputCopy :value="snowFlakeId" readeonly />
    </n-form-item>
    <n-form-item class="flex items-center justify-center">
      <n-button tertiary @click="refresh"> Refresh </n-button>
    </n-form-item>
  </n-form>
</template>

<style lang="scss" scoped></style>
