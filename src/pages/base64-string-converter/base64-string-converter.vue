<script setup lang="ts">
import { useCopy } from "@/composable/copy";
import { useStorage } from "@vueuse/core";
import { inject, ref } from "vue";
import { textToBase64, base64ToText } from "@/utils/base64";
import { computedRefreshable } from "@/composable/computedRefreshable";
import { FormItemRule } from "naive-ui";
const _function = inject("_function", "base64-string-converter");

const encodeSafe = useStorage(`${_function}:encodeSafe`, false);
const decodeSafe = useStorage(`${_function}:decodeSafe`, false);
const encodeValue = ref("");
const form = ref({
  encodeBase64Value: "",
});
const rules = {
  encodeBase64Value: {
    validator(_rule: FormItemRule, value: string) {
      try {
        return base64ToText(value, {
          urlSafe: decodeSafe.value,
        });
      } catch (error: any) {
        return error;
      }
    },
    trigger: ["input", "blur"],
  },
};
const [base64Value] = computedRefreshable(() =>
  textToBase64(encodeValue.value, { urlSafe: encodeSafe.value })
);
const [decodeValue] = computedRefreshable(() => {
  try {
    return base64ToText(form.value.encodeBase64Value, {
      urlSafe: decodeSafe.value,
    });
  } catch (error) {
    return "";
  }
});
const { isSupported, copy: copyBase64 } = useCopy({
  source: base64Value,
  text: "Base64 复制成功",
});
const { copy: copyDecodeString } = useCopy({
  source: decodeValue,
  text: "Base64解码字符串 复制成功",
});
</script>

<template>
  <n-card title="字符串转base64">
    <n-form-item
      label-placement="left"
      label-align="left"
      :label="'安全URL编码'"
    >
      <n-switch v-model:value="encodeSafe" />
    </n-form-item>
    <n-form-item
      label-align="left"
      :label="'字符串编码'"
    >
      <n-input
        type="textarea"
        placeholder="请输入内容"
        v-model:value="encodeValue"
      ></n-input>
    </n-form-item>
    <n-form-item
      label-align="left"
      :label="'Base64编码结果'"
    >
      <n-input
        readonly
        type="textarea"
        placeholder="Base64编码结果"
        :value="base64Value"
      ></n-input>
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button tertiary @click.stop="copyBase64" v-if="isSupported"
        >Copy base64</n-button
      >
    </div>
  </n-card>
  <n-card title="Base64转字符串">
    <n-form :model="form" :rules="rules">
      <n-form-item
        label-placement="left"
        label-align="left"
        :label="'安全URL解码'"
      >
        <n-switch v-model:value="decodeSafe" />
      </n-form-item>
      <n-form-item
        label-align="left"
        path="encodeBase64Value"
        :label="'Base64解码'"
      >
        <n-input
          type="textarea"
          placeholder="请输入内容"
          v-model:value="form.encodeBase64Value"
        ></n-input>
      </n-form-item>
      <n-form-item
        label-align="left"
        :label="'字符串结果'"
      >
        <n-input
          readonly
          type="textarea"
          placeholder="字符串结果"
          :value="decodeValue"
        ></n-input>
      </n-form-item>
    </n-form>

    <div class="flex items-center justify-center">
      <n-button tertiary @click.stop="copyDecodeString" v-if="isSupported"
        >Copy decode string</n-button
      >
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
