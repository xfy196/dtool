<script setup lang="ts">
  import convert from 'xml-js';
  import { computed, ref } from 'vue';
  import { isValidXml } from './xml-to-json.service';
  import { FormRules } from 'naive-ui';
  import { useCopy } from '@/composable/copy';
  const form = ref({
    xml: '<a x="1.234" y="It\'s"/>'
  });
  const rules: FormRules = {
    xml: [
      {
        trigger: ['input', 'blur'],
        validator: (_rule, value: string) => {
          if (!isValidXml(value)) {
            return new Error('Invalid XML content');
          }
          return true;
        }
      }
    ]
  };
  const json = computed(() => {
    if (!isValidXml(form.value.xml)) {
      return '';
    }
    return JSON.stringify(
      convert.xml2js(form.value.xml, { compact: true }),
      null,
      2
    );
  });
  const { isSupported, copy } = useCopy({ source: json, text: 'JSON copied!' });
</script>

<template>
  <n-card>
    <n-form :model="form" :rules="rules">
      <n-form-item path="xml" label="XML Content">
        <n-input
          :rows="10"
          placeholder="Please enter the XML content"
          type="textarea"
          v-model:value="form.xml"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card>
    <n-form-item :show-feedback="false" label="Converted JSON">
      <n-code :code="json" language="json" />
    </n-form-item>
    <div class="flex items-center justify-center">
      <n-button v-if="isSupported" @click.stop="copy" tertiary> Copy </n-button>
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
