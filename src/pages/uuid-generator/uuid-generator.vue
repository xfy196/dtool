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
  console.log("🚀 ~ uuidv7:", uuidv7)
  console.log("🚀 ~ uuidv6:", uuidv6)
  console.log("🚀 ~ uuidv5:", uuidv5)
  console.log("🚀 ~ uuidv3:", uuidv3)
import { ref } from "vue";
const versions = [
  { label: "NIL", value: "" },
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
    value: "DNS",
  },
  {
    label: "URL",
    value: "URL",
  },
  {
    label: "OID",
    value: "OID",
  },
  {
    label: "X500",
    value: "X500",
  },
];
const form = ref({
  version: "",
  quantity: 1,
  value: "",
  namespace: "DNS",
  namespaceValue: "",
});
const rules = {
  namespaceValue: {
    required: true,
    message: "Invalid UUID",
    trigger: "blur",
  },
};
const handleChangeVersion = (val: string) => {
  if (!val) {
    form.value.value = NIL_UUID;
  } else if (val === "v1") {
    form.value.value = uuidv1();
  } else if (val === "v3") {
    // form.value.value = uuidv3()
  } else if (val === "v4") {
    form.value.value = uuidv4();
  }
};
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
      <n-form-item label="UUID version" path="version">
        <n-radio-group
          @update:value="handleChangeVersion"
          v-model:value="form.version"
        >
          <n-radio-button
            v-for="version in versions"
            :key="version.value"
            :label="version.label"
            :value="version.value"
          ></n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Quantity" path="quantity">
        <n-input-number :min="1" class=" w-full" v-model:value="form.quantity" placeholder="UUID Quantity" />
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
      <n-form-item label="">
        <n-input
          v-model:value="form.value"
          type="textarea"
          placeholder="UUID"
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button"> 验证 </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="scss" scoped></style>
