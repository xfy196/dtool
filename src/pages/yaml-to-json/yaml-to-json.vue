<script setup lang="ts">
  import { useCopy } from '@/composable/copy';
  import { FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { parse as parseYaml } from 'yaml';
  import { Copy } from '@vicons/tabler';

  const form = ref({
    yaml: 'a: 1\nb: 2'
  });
  const rules: FormRules = {
    yaml: [
      {
        validator: (_rule, value) => {
          try {
            if (value === '' || parseYaml(value)) {
              return true;
            }
          } catch (error) {
            return new Error('Invalid YAML Content');
          }
        }
      }
    ]
  };
  const json = computed(() => {
    try {
      const obj = parseYaml(form.value.yaml);
      if (obj) {
        return JSON.stringify(obj, null, 2);
      }
    } catch (error) {
      return '';
    }
    return '';
  });
  const { copy, isSupported } = useCopy({ source: json, text: 'JSON Copied' });
</script>

<template>
  <n-card title="YAML Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="yaml">
        <n-input
          :rows="10"
          placeholder="Please enter the yaml content"
          type="textarea"
          v-model:value="form.yaml"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted JSON">
    <template #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button v-if="isSupported" @click.stop="copy" circle tertiary>
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        Copy to clipboard
      </n-tooltip>
    </template>
    <n-form-item label-placement="left" :show-feedback="false">
      <n-code :code="json" language="json" />
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
