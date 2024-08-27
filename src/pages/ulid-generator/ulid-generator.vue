<script setup lang="ts">
import { useClipboard, useStorage } from "@vueuse/core";
import { useMessage } from "naive-ui";
import { ulid } from "ulid";
import { inject, ref, watchEffect } from "vue";
import _ from "lodash"
const _function = inject("function", "ulid-generator");
const message = useMessage();
const formats = [
    {
        label: "Raw",
        value: 'raw'
    },
    {
        label: "JSON",
        value: 'json'
    }
]
const form = ref({
  ulid: ulid(),
  format: useStorage(`${_function}:format`, formats[0].value),
  quantity: useStorage(`${_function}:quantity`, 1),
});
const { copy, isSupported } = useClipboard({ source: form.value.ulid });
const handleRefresh = () => {
  const ulids = _.times(form.value.quantity, () => ulid());
  if (form.value.format === "json") {
    form.value.ulid = JSON.stringify(ulids, null, 2);
  } else {
    form.value.ulid = ulids.join("\n");
  }
};
watchEffect(() => {
  handleRefresh();
});
const handleCopy = async () => {
  try {
    await copy(form.value.ulid);
    message.success("ULIDs Copied to clipboard");
  } catch (error) {
    message.error("ULIDs Failed to copy to clipboard");
  }
};
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
    <n-form-item label="">
      <n-input
        class="text-center"
        readonly
        autosize
        v-model:value="form.ulid"
        type="textarea"
        placeholder="ULID"
      />
    </n-form-item>
    <div class="flex items-end justify-center">
      <n-space>
        <n-button v-if="isSupported" @click.stop="handleCopy" tertiary>
          Copy
        </n-button>
        <n-button tertiary @click.top="handleRefresh"> Refresh </n-button>
      </n-space>
    </div>
  </n-form>
</template>

<style lang="scss" scoped></style>
