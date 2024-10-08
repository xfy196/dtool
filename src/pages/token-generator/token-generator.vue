<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { inject, ref } from "vue";
import { computedRefreshable } from "@/composable/computedRefreshable";
import { useCopy } from "@/composable/copy";
import { createToken } from "./token-generator.service";
import { storeToRefs } from "pinia";
import { useStyleStore } from "@/stores/style.store";
const _function = inject("_function", "token-generator");
const styleStore = useStyleStore()
const {isSmallScreen} = storeToRefs(styleStore)
const form = ref({
  upperCase: useStorage(`${_function}:upperCase`, true),
  lowerCase: useStorage(`${_function}:lowerCase`, true),
  number: useStorage(`${_function}:number`, true),
  symbol: useStorage(`${_function}:symbol`, false),
  length: useStorage(`${_function}:length`, 24),
});
const [token, handleRefresh] = computedRefreshable(
  () => {
    return createToken(form.value);
  },
  { throttle: 100 }
);
const { copy, isSupported } = useCopy({
  source: token,
  text: "Token copied to clipboard",
  errText: "Token Failed to copy to clipboard",
});
</script>

<template>
  <n-form
    label-placement="left"
    :model="form"
  >
    <n-grid :cols="isSmallScreen ? 2: 4">
      <n-form-item-gi label="大写(ABC...)" path="upperCase">
          <n-switch v-model:value="form.upperCase" />
      </n-form-item-gi>
      <n-form-item-gi label="小写(abc...)" path="lowerCase">
          <n-switch v-model:value="form.lowerCase" />
      </n-form-item-gi>
      <n-form-item-gi label="数字(123..)" path="number">
          <n-switch v-model:value="form.number" />
      </n-form-item-gi>
      <n-form-item-gi label="符号(!+;...)" path="symbol">
          <n-switch v-model:value="form.symbol" />
      </n-form-item-gi>
    </n-grid>
    <n-form-item 
     path="length" :label="`长度(${form.length})`">
      <n-slider :min="1" :max="512" v-model:value="form.length" :step="1" />
    </n-form-item>
    <n-form-item path="value" :show-label="false" label="">
      <n-input
        type="textarea"
        readonly
        autosize
        placeholder="Token"
        v-model:value="token"
      />
    </n-form-item>
    <div class="flex items-center justify-center">
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
