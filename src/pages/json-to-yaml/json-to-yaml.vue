<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import { FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { stringify as stringifyJSON } from 'yaml';
  import { Copy } from '@vicons/tabler';

  const form = ref({
    json: JSON.stringify({ a: 1, b: 2 })
  });
  const rules: FormRules = {
    json: [
      {
        trigger: ['input', 'blur'],
        validator: (_rule, value) => {
          try {
            if (value === '' || stringifyJSON(JSON.parse(value))) {
              return true;
            }
          } catch (error) {
            return new Error('Invalid YAML Content');
          }
        }
      }
    ]
  };
  const yaml = computed(() => {
    try {
      const yaml = stringifyJSON(JSON.parse(form.value.json));
      return yaml;
    } catch (error) {
      return '';
    }
    return '';
  });
  const { copy, isSupported, copied } = useCopy({
    source: yaml,
    isToast: false
  });
</script>

<template>
  <n-card title="JSON Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="json">
        <n-input
          :rows="10"
          placeholder="Please enter the JSON here..."
          type="textarea"
          v-model:value="form.json"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted YAML">
    <template v-if="yaml" #header-extra>
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
    <n-form-item label-placement="left" :show-feedback="false">
      <n-code word-wrap :code="yaml" language="json" />
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
