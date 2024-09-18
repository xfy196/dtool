<script setup lang="ts">
  import { parse } from 'iarna-toml-esm';
  import { FormItemRule, FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { isValidToml } from './toml-to-json.service';

  const form = ref({
    toml: ''
  });
  const rules: FormRules = {
    toml: {
      validator(_rule: FormItemRule, value: string) {
        try {
          if (!isValidToml(value)) {
            return new Error('Provided TOML is not valid.');
          }
          return true;
        } catch (error: any) {
          return new Error(error.message);
        }
      },
      trigger: ['input', 'blur']
    }
  };
  const json = computed(() => {
    if (!isValidToml(form.value.toml)) {
      return '';
    }
    return JSON.stringify(parse(form.value.toml), null, 2);
  });
</script>

<template>
  <n-card>
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="toml">
        <n-input
          placeholder="please input toml"
          type="textarea"
          v-model:value="form.toml"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card>
    <n-code :code="json" word-wrap language="json" />
  </n-card>
</template>

<style lang="scss" scoped></style>
