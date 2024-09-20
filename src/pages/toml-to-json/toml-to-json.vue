<script setup lang="ts">
  import { parse } from 'iarna-toml-esm';
  import { FormItemRule, FormRules } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { isValidToml } from './toml-to-json.service';
  import { useCopy } from '@/composable/copy';
  import { Copy } from '@vicons/tabler';

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
  const { copy, isSupported, copied } = useCopy({ source: json });
</script>

<template>
  <n-card title="Toml Content">
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
  <n-card title="Convertd to JSON">
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
    <n-code :code="json" word-wrap language="json" />
  </n-card>
</template>

<style lang="scss" scoped></style>
