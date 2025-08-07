<script setup lang="ts">
  import DiffView from '@/pages/json-diff/component/diff-view.vue';
  import { computed, ref } from 'vue';
  import { isNotThrowing } from '@/utils/boolean.ts';

  const originJson = ref<string>('');
  const compareJson = ref<string>('');
  const originJsonErr = computed(() => {
    if (
      !isNotThrowing(() => JSON.parse(originJson.value)) &&
      originJson.value
    ) {
      return 'Invalid JSON format';
    }
  });
  const compareJsonErr = computed(() => {
    if (
      !isNotThrowing(() => JSON.parse(compareJson.value)) &&
      compareJson.value
    ) {
      return 'Invalid JSON format';
    }
  });
</script>

<template>
  <n-card title="源JSON">
    <n-input
      v-model:value="originJson"
      rows="20"
      type="textarea"
      placeholder="请输入原来的JSON"
    >
    </n-input>
    <template v-if="originJsonErr" #footer>
      <n-text type="error">{{ originJsonErr }}</n-text>
    </template>
  </n-card>
  <n-card title="对比的JSON">
    <n-input
      v-model:value="compareJson"
      rows="20"
      type="textarea"
      placeholder="请输入需要比对的JSON"
    ></n-input>
    <template v-if="compareJsonErr" #footer>
      <n-text type="error">{{ compareJsonErr }}</n-text>
    </template>
  </n-card>
  <diff-view v-model:left-json="originJson" v-model:right-json="compareJson" />
</template>

<style scoped lang="scss"></style>
