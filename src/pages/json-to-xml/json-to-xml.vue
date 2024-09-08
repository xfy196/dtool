<script setup lang="ts">
  import convert from 'xml-js';
  import { computed, ref } from 'vue';
  import { FormRules } from 'naive-ui';
  import { useCopy } from '@/composable/copy';
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
  <n-card>
    <n-form :model="form" :rules="rules">
      <n-form-item path="json" label="JSON Content">
        <n-input
          :rows="10"
          placeholder="Please enter the JSON content"
          type="textarea"
          v-model:value="form.json"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card>
    <n-form-item :show-feedback="false" label="Converted XML">
      <n-code :code="xml" language="xml" />
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button v-if="isSupported" @click.stop="copy" tertiary> Copy </n-button>
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
