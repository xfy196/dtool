<script setup lang="ts">
  import convert from 'xml-js';
  import { computed, ref } from 'vue';
  import { isValidXml } from './xml-to-json.service';
  import { FormRules } from 'naive-ui';
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';

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
  const { copy, isSupported, copied } = useCopy({
    source: json,
    isToast: false
  });
</script>

<template>
  <n-card title="XML Content">
    <n-form :model="form" :rules="rules">
      <n-form-item label-placement="left" path="xml">
        <n-input
          :rows="10"
          placeholder="Please enter the XML content"
          type="textarea"
          v-model:value="form.xml"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-card title="Converted JSON">
    <template v-if="json" #header-extra>
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
      <n-code :code="json" language="json" />
    </n-form-item>
  </n-card>
</template>

<style lang="scss" scoped></style>
