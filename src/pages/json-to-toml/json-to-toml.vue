<script setup lang="ts">
  import { FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { stringify } from 'iarna-toml-esm';
  import { isValidJson } from './json-to-toml.service';
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';

  const form = ref({
    json: ''
  });
  const rules: FormRules = {
    json: {
      validator: (_rule, value) => {
        console.log('🚀 ~ value:', value);
        try {
          const res = isValidJson(value);
          console.log('🚀 ~ res:', res);
          if (res) {
            return true;
          }
          return new Error('Please enter a valid JSON');
        } catch (error: any) {
          return new Error(error.message);
        }
      },
      trigger: ['input', 'blur']
    }
  };
  const toml = computed(() => {
    const res = isValidJson(form.value.json);
    if (res) {
      return stringify(res);
    }
    return '';
  });
  const { copy, isSupported, copied } = useCopy({ source: toml });
</script>

<template>
  <n-card title="JSON Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="json">
        <n-input
          placeholder="Please input json"
          v-model:value.trim="form.json"
          type="textarea"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted TOML">
    <template #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button v-if="isSupported" @click.stop="copy" circle tertiary>
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ copied ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    <n-code :code="toml" word-wrap language="toml" />
  </n-card>
</template>

<style lang="scss" scoped></style>
