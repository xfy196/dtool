<script setup lang="ts">
import { ref } from "vue";
import { passwordStrengthAnalyser } from "./password-strength-analyser.service";
import { computedRefreshable } from "@/composable/computedRefreshable";
const password = ref("");
const [data] = computedRefreshable<{
  length: number;
  lowerCaseSize: number;
  upperCaseSize: number;
  numberSize: number;
  symbolSize: number;
  entropy: number;
  score: number;
}>(() => passwordStrengthAnalyser(password.value), { throttle: 100 });
</script>

<template>
  <n-form-item>
    <n-input
      clearable
      show-password-on="click"
      type="password"
      placeholder="请输入密码"
      v-model:value="password"
    ></n-input>
  </n-form-item>
  <n-card>
    <div class="flex flex-col items-center justify-center">
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">长度：</div>
        <div class="min-w-48">
          {{ data.length }}
        </div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">熵数：</div>
        <div class="min-w-48">{{ data.entropy }}</div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">分数：</div>
        <div class="min-w-48">{{ data.score }} / 100</div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">小写字符数：</div>
        <div class="min-w-48">{{ data.lowerCaseSize }}</div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">大写字符数：</div>
        <div class="min-w-48">{{ data.upperCaseSize }}</div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">数字数：</div>
        <div class="min-w-48">{{ data.numberSize }}</div>
      </div>
      <div class="flex">
        <div class="text-right text-zinc-500 min-w-24">特殊符号数：</div>
        <div class="min-w-48">{{ data.symbolSize }}</div>
      </div>
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
