<script setup lang="ts">
import { computedRefreshable } from "@/composable/computedRefreshable";
import { useCopy } from "@/composable/copy";
import { FormItemRule, FormRules } from "naive-ui";
import romans from "romans";
import { ref } from "vue";
const form = ref({
  number: 10,
  roman: "X",
});
const rules: FormRules = {
  number: {
    type: "number",
    trigger: "input",
    validator: (_rule: FormItemRule, value: string) => {
      if (Number(value) < 1 || Number(value) > 3999) {
        return new Error("请输入1-3999之间的数字");
      }
      return true;
    },
  },
  roman: {
    type: "string",
    trigger: "input",
    validator: (_rule: FormItemRule, value: string) => {
      const values = value.split("");
      const chars = romans.allChars;
      for (const char of values) {
        if (!chars.includes(char)) {
          return new Error("请输入正确的罗马数字");
        }
      }
      return true;
    },
  },
};
const [romanValue] = computedRefreshable<string>(() => {
  if (!form.value.number) return "";
  try {
    return romans.romanize(Number(form.value.number));
  } catch (error) {
    return "";
  }
});
const [number] = computedRefreshable<string>(() => {
  if (!form.value.roman) return "";
  try {
    return String(romans.deromanize(form.value.roman));
  } catch (error) {
    return "";
  }
});
const { isSupported, copy: copyRoman } = useCopy({
  source: romanValue,
  text: "罗马数字复制成功",
});
const { copy: copyNumber } = useCopy({
  source: number,
  text: "阿拉伯数字复制成功",
});
</script>

<template>
  <n-form
    label-placement="left"
    :rules="rules"
    :model="form"
    class="flex flex-col"
  >
    <n-card title="Arabic to roman">
      <n-grid :cols="4" :x-gap="16">
        <n-form-item-gi :span="2" path="number">
          <n-input v-model:value.trim="form.number" placeholder="请输入数字" />
        </n-form-item-gi>
        <n-form-item-gi class="text-2xl">
          {{ romanValue }}
        </n-form-item-gi>
        <n-form-item-gi>
          <n-button tertiary v-if="isSupported" @click="copyRoman"
            >复制</n-button
          >
        </n-form-item-gi>
      </n-grid>
    </n-card>
    <n-card title="Roman to arabic" class="mt-2">
      <n-grid :cols="4" :x-gap="16">
        <n-form-item-gi :span="2" path="roman">
          <n-input
            v-model:value.trim="form.roman"
            placeholder="请输入罗马数字"
          ></n-input>
        </n-form-item-gi>
        <n-form-item-gi class="text-2xl">
          {{ number }}
        </n-form-item-gi>
        <n-form-item-gi>
          <n-button tertiary v-if="isSupported" @click="copyNumber"
            >复制</n-button
          >
        </n-form-item-gi>
      </n-grid>
    </n-card>
  </n-form>
</template>

<style lang="scss" scoped></style>
