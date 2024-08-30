<script setup lang="ts">
import { useCopy } from "@/composable/copy";
import { computed, ref } from "vue";

const value = ref<string>("");
const splitStr = ref<string>("");
const result = computed(() => {
  const res = value.value.split(splitStr.value);
  return JSON.stringify(res, null, 2);
});
const { isSupported, copy } = useCopy({
  source: result,
  text: "Result copied to clipboard",
  errText: "Result Failed to copy to clipboard",
});
</script>

<template>
  <n-form-item
    :show-feedback="false"
    :label-width="60"
    label-placement="left"
    label="字符串"
  >
    <n-input type="textarea" v-model:value="value" placeholder="请输入字符串" />
  </n-form-item>
  <n-form-item
    :show-feedback="false"
    :label-width="60"
    label-placement="left"
    label="分割符"
  >
    <n-input placeholder="请输入分割符" v-model:value="splitStr" />
  </n-form-item>
  <n-form-item
    :show-feedback="false"
    :label-width="60"
    label-placement="left"
    label="结果"
  >
    <n-input
      :autosize="{ minRows: 1 }"
      placeholder="结果"
      type="textarea"
      readonly
      v-model:value="result"
    />
  </n-form-item>
  <div class="flex items-end justify-center">
    <n-button v-if="isSupported" @click.stop="copy" tertiary> Copy </n-button>
  </div>
</template>

<style lang="scss" scoped></style>
