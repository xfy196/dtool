<script setup lang="ts">
import {
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
  NIL as NIL_UUID,
} from "uuid";
import { useStorage, useClipboard } from "@vueuse/core";
import { inject, ref, watch, watchEffect } from "vue";
import { FormItemRule, useMessage } from "naive-ui";
const _function = inject("function", "uuid-generator");
const message = useMessage();
const versions = [
  { label: "NIL", value: "nil" },
  { label: "v1", value: "v1" },
  { label: "v3", value: "v3" },
  { label: "v4", value: "v4" },
  { label: "v5", value: "v5" },
  { label: "v6", value: "v6" },
  { label: "v7", value: "v7" },
];
const namespaces = [
  {
    label: "DNS",
    value: "53a02157-caa5-4f41-a9a0-95a94af7fa68",
  },
  {
    label: "URL",
    value: "fd7a4cbd-dac5-4876-8d5c-84e84184c646",
  },
  {
    label: "OID",
    value: "d0caf017-51f8-4bad-9c31-f71fa1dd3002",
  },
  {
    label: "X500",
    value: "8998b45b-152e-4dfd-bee4-afd61b138f77",
  },
];

const form = ref({
  version: useStorage(`${_function}:ver`, "nil"),
  quantity: useStorage(`${_function}:quantity`, 1),
  value: "",
  namespace: useStorage(`${_function}:namespace`, "DNS"),
  namespaceValue: "53a02157-caa5-4f41-a9a0-95a94af7fa68",
  name: useStorage(`${_function}:name`, ""),
});
const rules = {
  namespaceValue: {
    message: "Invalid UUID",
    trigger: ["blur", "input"],
    validator: (_rule: FormItemRule, value: string) => {
      if (value === NIL_UUID) {
        return true;
      }

      return Boolean(
        value.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        )
      );
    },
  },
};
const { copy, isSupported } = useClipboard({ source: form.value.value });
const handleCopy = async () => {
  try {
    await copy(form.value.value);
    message.success("UUIDS Copied to clipboard");
  } catch (error) {
    message.error("UUIDS Failed to copy to clipboard");
  }
};
const generators: Record<string, Function> = {
  nil: (quantity: number): string[] =>
    Array.from({ length: quantity }, () => NIL_UUID),
  v1: (quantity: number): string[] =>
    Array.from({ length: quantity }, (_ignored, index) => {
      return uuidv1({
        clockseq: index,
        msecs: Date.now(),
        nsecs: Math.floor(Math.random() * 10000),
        node: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256)),
      });
    }),
  v3: (quantity: number, name: string, namespaceValue: string): string[] =>
    Array.from({ length: quantity }, () => uuidv3(name, namespaceValue)),
  v4: (quantity: number): string[] =>
    Array.from({ length: quantity }, () => uuidv4()),
  v5: (quantity: number, name: string, namespaceValue: string): string[] =>
    Array.from({ length: quantity }, () => uuidv5(name, namespaceValue)),
  v6: (quantity: number): string[] =>
    Array.from({ length: quantity }, () => uuidv6()),
  v7: (quantity: number): string[] =>
    Array.from({ length: quantity }, () => uuidv7()),
};
const handleRefresh = () => {
  form.value.value = generators[form.value.version](
    form.value.quantity,
    form.value.name,
    form.value.namespaceValue
  ).join("\n");
};
watch(
  () => form.value.namespace,
  (val) => {
    const namespace = namespaces.find((namespace) => namespace.value === val);
    if (namespace) {
      form.value.namespaceValue = namespace.value;
    }
  },
  {
    immediate: true,
  }
);
watchEffect(() => {
  const version: string = form.value.version;
  const namespaceValue: string = form.value.namespaceValue;
  const name: string = form.value.name;
  const quantity: number = form.value.quantity;
  try {
    form.value.value = generators[version](quantity, name, namespaceValue).join(
      "\n"
    );
  } catch (error) {
    form.value.value = "";
  }
});
</script>

<template>
  <div class="">
    <n-form
      :rules="rules"
      :show-require-mark="false"
      ref="formRef"
      label-placement="left"
      :label-width="120"
      :model="form"
    >
      {{ form.version }}
      <n-form-item label="UUID version" path="version">
        <n-radio-group v-model:value="form.version">
          <n-radio-button
            v-for="version in versions"
            :key="version.value"
            :label="version.label"
            :value="version.value"
          ></n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Quantity" path="quantity">
        <n-input-number
          :min="1"
          class="w-full"
          v-model:value="form.quantity"
          placeholder="UUID Quantity"
        />
      </n-form-item>
      <n-form-item
        v-show="['v3', 'v5'].includes(form.version)"
        label="Namespace"
        path="namespace"
      >
        <n-radio-group v-model:value="form.namespace">
          <n-radio-button
            v-for="version in namespaces"
            :key="version.value"
            :label="version.label"
            :value="version.value"
          ></n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item
        path="namespaceValue"
        v-show="['v3', 'v5'].includes(form.version)"
        label=" "
      >
        <n-input v-model:value="form.namespaceValue" placeholder="Namespace" />
      </n-form-item>
      <n-form-item
        path="name"
        v-show="['v3', 'v5'].includes(form.version)"
        label=" "
      >
        <n-input v-model:value="form.name" placeholder="Name" />
      </n-form-item>
      <n-form-item label="">
        <n-input
          class="text-center"
          readonly
          autosize
          v-model:value="form.value"
          type="textarea"
          placeholder="UUID"
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
  </div>
</template>

<style lang="scss" scoped></style>
