<script setup lang="ts">
  import { ref } from 'vue';
  import { parse as parseJson } from 'yaml';
  import { stringify } from 'iarna-toml-esm';
  import { Copy } from '@vicons/tabler';
  import { useCopy } from '@/composable/copy';
  import { FormRules } from 'naive-ui';
  const form = ref({
    yaml: ''
  });
  const rules: FormRules = {
    yaml: {
      validator: (_rule, value) => {
        try {
          // 把 yaml 字符串转为 json 对象
          const res = parseJson(value);
          if (value === '' || res) {
            return true;
          }
        } catch (error) {
          return new Error('Invalid YAML Content');
        }
      },
      trigger: ['blur', 'input']
    }
  };
  const toml = computed(() => {
    if (form.value.yaml !== '') {
      const res = parseJson(form.value.yaml);
      if (res && typeof res === 'object') {
        return stringify(res);
      }
      return '';
    }
    return '';
  });
  const { copy, isSupported, copied } = useCopy({
    source: toml,
    isToast: false
  });
</script>

<template>
  <n-card title="YAML Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="yaml">
        <n-input
          type="textarea"
          placeholder="Please enter YAML Content"
          v-model:value="form.yaml"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted to TOML">
    <template v-if="toml" #header-extra>
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
