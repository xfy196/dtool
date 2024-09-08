<script setup lang="ts">
  import convert from 'xml-js';
  import { computed, ref } from 'vue';
  import { FormRules } from 'naive-ui';
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';

  const form = ref({
    json: JSON.stringify({ a: { _attributes: { x: '1.234', y: "It's" } } })
  });
  const rules: FormRules = {
    json: [
      {
        trigger: ['input', 'blur'],
        validator: (_rule, value: string) => {
          try {
            if (value === '' || JSON.parse(value)) {
              return true;
            }
          } catch (error) {
            return new Error('Invalid JSON content');
          }
        }
      }
    ]
  };
  const xml = computed(() => {
    try {
      if (form.value.json === '' || JSON.parse(form.value.json)) {
        return convert.js2xml(JSON.parse(form.value.json), { compact: true });
      }
      return '';
    } catch (error) {
      return '';
    }
  });
  const { isSupported, copy } = useCopy({ source: xml, text: 'XML copied!' });
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
  <n-card title="Converted XML">
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
      <n-code word-wrap :code="xml" language="xml" />
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
