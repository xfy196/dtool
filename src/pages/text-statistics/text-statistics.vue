<script setup lang="ts">
  import { ref, computed, toValue } from 'vue';
  const value = ref('');
  const statistics = computed(() => {
    const data = toValue(value);
    return {
      characterCount: data.length,
      wordCount: data ? data.split(' ').length : 0,
      lineCount: data ? data.split('\n').length : 0,
      byteSize: new Blob([data]).size
    };
  });
</script>

<template>
  <n-card>
    <n-flex vertical>
      <n-input
        v-model:value="value"
        type="textarea"
        placeholder="Your text..."
      />
      <n-flex justify="space-between">
        <n-flex vertical>
          <n-text class="text-gray-500">Character count</n-text>
          <n-text class="text-xl font-bold">{{
            statistics.characterCount
          }}</n-text> </n-flex
        ><n-flex vertical>
          <n-text class="text-gray-500">Word count</n-text>
          <n-text class="text-xl font-bold">{{
            statistics.wordCount
          }}</n-text> </n-flex
        ><n-flex vertical>
          <n-text class="text-gray-500">Line count</n-text>
          <n-text class="text-xl font-bold">{{
            statistics.lineCount
          }}</n-text> </n-flex
        ><n-flex vertical>
          <n-text class="text-gray-500">Byte size</n-text>
          <n-text class="text-xl font-bold">{{ statistics.byteSize }}</n-text>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<style lang="scss" scoped></style>
