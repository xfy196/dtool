<script setup lang="ts">
import { computedRefreshable } from "@/composable/computedRefreshable";
import bcryptjs from "bcryptjs";
import { ref } from "vue";
import { CheckOutlined, ClearOutlined } from "@vicons/material";
import { useThemeVars } from "naive-ui";
import { useCopy } from "@/composable/copy";
const themeVars = useThemeVars();
const string1 = ref("");
const salt1 = ref(10);
const string2 = ref("");
const hash2 = ref("");
const [hash1] = computedRefreshable(() =>
  bcryptjs.hashSync(string1.value, salt1.value)
);
const [isHash] = computedRefreshable(() =>
  bcryptjs.compareSync(string2.value, hash2.value)
);
const { copy, isSupported } = useCopy({
  source: hash1,
  text: "哈希值复制成功",
  errText: "哈希值复制失败",
});
</script>

<template>
  <n-card title="哈希">
    <n-form-item :label-width="60" label-placement="left" label="字符串">
      <n-input v-model:value="string1" placeholder="你要加密的字符串"></n-input>
    </n-form-item>
    <n-form-item :label-width="60" label-placement="left" label="盐值">
      <n-input v-model:value="salt1"></n-input>
    </n-form-item>
    <n-form-item label-placement="left" label="">
      <n-input readonly :value="hash1"></n-input>
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button tertiary @click.stop="copy" v-if="isSupported"
        >Copy decode string</n-button
      >
    </div>
  </n-card>
  <n-card title="比较字符串和哈希值">
    <n-form-item :label-width="80" label-placement="left" label="字符串">
      <n-input v-model:value="string2" placeholder="你要比对的字符串"></n-input>
    </n-form-item>
    <n-form-item :label-width="80" label-placement="left" label="哈希值">
      <n-input v-model:value="hash2" placeholder="你要比对的hash值"></n-input>
    </n-form-item>
    <n-form-item :label-width="80" label-placement="left" label="是否匹配">
      <n-icon :size="20">
        <CheckOutlined :color="themeVars.primaryColor" v-if="isHash" />
        <ClearOutlined :color="themeVars.errorColor" v-else />
      </n-icon>
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
