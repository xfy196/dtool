<script setup lang="ts">
  import { ref } from 'vue';
  import { type Colord, colord, extend } from 'colord';
  import hwbPlugin from 'colord/plugins/hwb';
  import lchPlugin from 'colord/plugins/lch';
  import cmykPlugin from 'colord/plugins/cmyk';
  import namesPlugin from 'colord/plugins/names';
  extend([hwbPlugin, lchPlugin, cmykPlugin, namesPlugin]);
  import { FormItemRule } from 'naive-ui';
  import InputCopy from '@/components/InputCopy.vue';
  const form = ref<Record<string, string>>({
    colorPicker: '#18A058',
    hex: '',
    rgb: '',
    hsl: '',
    hwb: '',
    lch: '',
    cmyk: '',
    name: ''
  });

  const buildColorFormat = ({
    label,
    parse = (value) => colord(value),
    format,
    placeholder,
    invalidMessage = `Invalid ${label.toLowerCase()} format.`,
    type = 'text'
  }: {
    label: string;
    type?: string;
    placeholder?: string;
    parse?: (v: string) => Colord;
    invalidMessage?: string;
    format?: (v: Colord) => string;
    rule?: FormItemRule;
  }) => {
    return {
      placeholder,
      label,
      type,
      rule: {
        trigger: ['blur', 'input'],
        validator: (_rule: any, value: string) => {
          if (value === '') return true;
          return colord(form.value[label]).isValid()
            ? true
            : new Error(invalidMessage);
        }
      },
      parse,
      format
    };
  };

  const formats: Record<string, any> = {
    colorPicker: buildColorFormat({
      placeholder: 'e.g #ff0000',
      label: 'colorPicker',
      type: 'colorPicker',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toHex()
    }),
    hex: buildColorFormat({
      placeholder: 'e.g #ff0000',
      label: 'hex',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toHex()
    }),
    rgb: buildColorFormat({
      placeholder: 'e.g rgb(255,0,0)',
      label: 'rgb',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toRgbString()
    }),
    hsl: buildColorFormat({
      placeholder: 'e.g hsl(0,100%,50%)',
      label: 'hsl',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toHslString()
    }),
    hwb: buildColorFormat({
      placeholder: 'e.g hwb(0,100%,0%)',
      label: 'hwb',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toHwbString()
    }),
    lch: buildColorFormat({
      placeholder: 'e.g lch(50, 100, 0)',
      label: 'lch',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toLchString()
    }),
    cmyk: buildColorFormat({
      placeholder: 'e.g cmyk(100,0,0,0)',
      label: 'cmyk',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toCmykString()
    }),
    name: buildColorFormat({
      placeholder: 'e.g red',
      label: 'name',
      parse: (v: string) => colord(v),
      format: (v: Colord) => v.toName({ closest: true }) ?? 'Unknown'
    })
  };
  const updateColor = (v: Colord, omniKey?: string) => {
    if (v === undefined) {
      return;
    }
    if (!v.isValid()) {
      return;
    }
    for (const key in formats) {
      if (key === omniKey) {
        continue;
      }
      form.value[key] = formats[key].format(v);
    }
  };
  updateColor(colord('#18A058'));
</script>

<template>
  <n-card>
    <n-form label-placement="left" :label-width="100" :model="form">
      <template
        v-for="({ placeholder, rule, label, type, parse }, key) in formats"
        :key="key"
      >
        <n-form-item
          :label="label"
          :rule="rule"
          v-if="type === 'colorPicker'"
          :path="key"
        >
          <n-color-picker
            @update:value="updateColor(parse(form[key]), key)"
            v-model:value="form[key]"
          />
        </n-form-item>
        <n-form-item :label="label" :rule="rule" v-else :path="key">
          <InputCopy
            :readonly="false"
            @update:value="(v: string) => updateColor(parse(v), key)"
            :placeholder="placeholder"
            v-model:value="form[key]"
          />
        </n-form-item>
      </template>
    </n-form>
  </n-card>
</template>

<style lang="scss" scoped></style>
