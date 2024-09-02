<script setup lang="ts">
import { computed, ref } from "vue";
import { convertBase } from "./integer-converter.service";
import InputCopy from "@/components/InputCopy.vue";
const inputValue = ref("66");
const baseValue = ref(10);
const customeValue = ref(20);
const options = [
  {
    label: "Binary (2)",
    toBase: 2,
  },
  {
    label: "Octal (8)",
    toBase: 8,
  },
  {
    label: "Decimal (10)",
    toBase: 10,
  },
  {
    label: "Hexadecimal (16)",
    toBase: 16,
  },
  {
    label: "Base64 (64)",
    toBase: 64,
  },
];
const getConvertBase = ({
  value,
  fromBase,
  toBase,
}: {
  value: string;
  fromBase: number;
  toBase: number;
}): string => {
  try {
    return convertBase({ value, fromBase, toBase });
  } catch (error) {
    return "";
  }
};
const error = computed(() => {
    try {
        convertBase({value: inputValue.value, fromBase: baseValue.value, toBase: 10 })
        return ''
    } catch (error: any) {
        return error.message
    }
})
</script>

<template>
  <n-card>
    <n-form-item
      :show-feedback="false"
      :label-width="100"
      label-placement="left"
      label="Input number"
    >
      <n-input v-model:value="inputValue" />
    </n-form-item>
    <n-form-item
      class="mt-2"
      :show-feedback="false"
      :label-width="100"
      label-placement="left"
      label="Input Base"
    >
      <n-input-number :min="1" class="w-full" v-model:value="baseValue" />
    </n-form-item>
    <n-alert class="mt-6" v-if="error" type="error">
      {{ error }}
    </n-alert>
    <n-divider />
    <n-form-item
      v-for="(option, index) in options"
      :key="option.label"
      :show-feedback="false"
      :label-width="130"
      label-placement="left"
      :label="option.label"
      :class="{ 'mt-2': index !== 0 }"
    >
      <InputCopy
        class="w-full"
        :value="
          getConvertBase({
            value: inputValue,
            fromBase: baseValue,
            toBase: option.toBase,
          })
        "
      />
    </n-form-item>
    <n-form-item class="mt-2" :show-feedback="false" label-placement="left">
      <n-input-group>
        <n-input-group-label>Custom</n-input-group-label>
        <n-input-number v-model:value="customeValue" class="mr-2 w-36" />
        <InputCopy
          class="w-full"
          :value="
            getConvertBase({
              value: inputValue,
              fromBase: baseValue,
              toBase: customeValue,
            })
          "
        />
      </n-input-group>
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
