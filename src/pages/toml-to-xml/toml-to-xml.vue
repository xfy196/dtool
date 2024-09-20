<script setup lang="ts">
  import { FormItemRule, FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { isValidToml } from '../toml-to-json/toml-to-json.service';
  import { useCopy } from '@/composable/copy';
  import convert from 'xml-js';
  import { Copy } from '@vicons/tabler';
  const form = ref({
    toml: ''
  });
  const rules: FormRules = {
    toml: {
      validator(_rule: FormItemRule, value: any) {
        try {
          const res = isValidToml(value);
          if (res) {
            return true;
          }
          return new Error('Provided TOML is not valid.');
        } catch (error: any) {
          return new Error(error.message);
        }
      },
      trigger: ['input', 'blur']
    }
  };
  const xml = computed(() => {
    const res = isValidToml(form.value.toml);
    if (res) {
      return convert.js2xml(res, { compact: true });
    }
    return '';
  });
  const { copy, copied, isSupported } = useCopy({ source: xml });
</script>

<template>
  <n-card title="TOML Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label="TOML Content">
        <n-input type="textarea" v-model:value="form.toml" />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted XML">
    <template v-if="xml" #header-extra>
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
    <n-code :code="xml" word-wrap language="xml" />
  </n-card>
</template>

<style lang="scss" scoped></style>
