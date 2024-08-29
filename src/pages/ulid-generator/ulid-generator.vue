<script setup lang="ts">
import {  useStorage } from "@vueuse/core";
import { ulid } from "ulid";
import { inject, ref } from "vue";
import _ from "lodash";
import { computedRefreshable } from "@/composable/computedRefreshable";
import { useCopy } from "@/composable/copy";
const _function = inject("_function", "ulid-generator");
const formats = [
  {
    label: "Raw",
    value: "raw",
  },
  {
    label: "JSON",
    value: "json",
  },
];
const form = ref({
  format: useStorage(`${_function}:format`, formats[0].value),
  quantity: useStorage(`${_function}:quantity`, 1),
});

const [ulids, handleRefresh] = computedRefreshable<string>(() => {
  const ids = _.times(form.value.quantity, () => ulid());
  if (form.value.format === "json") {
    return JSON.stringify(ids, null, 2);
  }
  return ids.join("\n");
});

const { copy, isSupported } = useCopy({
  source: ulids,
  text: "ULIDs Copied to clipboard",
  errText: "ULIDs Failed to copy to clipboard",
});
</script>

<template>
  <n-form :model="form" label-placement="left" :label-width="120">
    <n-form-item label="Quantity" path="quantity">
      <n-input-number
        :min="1"
        class="w-full"
        v-model:value="form.quantity"
        placeholder="ULID Quantity"
      />
    </n-form-item>
    <n-form-item label="Format" path="format">
      <n-radio-group v-model:value="form.format">
        <n-radio-button
          v-for="format in formats"
          :key="format.value"
          :label="format.label"
          :value="format.value"
        ></n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item :show-label="false" label="">
      <n-input
        class="text-center"
        readonly
        autosize
        v-model:value="ulids"
        type="textarea"
        placeholder="ULID"
      />
    </n-form-item>
    <div class="flex items-end justify-center">
      <n-space>
        <n-button v-if="isSupported" @click.stop="copy" tertiary>
          Copy
        </n-button>
        <n-button tertiary @click.top="handleRefresh"> Refresh </n-button>
      </n-space>
    </div>
  </n-form>
</template>

<style lang="scss" scoped></style>
