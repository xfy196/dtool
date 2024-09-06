<script setup lang="ts">
  import { useStorage } from '@vueuse/core';
  import { inject, ref } from 'vue';
  import InputCopy from '@/components/InputCopy.vue';
  import {
    MD5,
    RIPEMD160,
    SHA1,
    SHA224,
    SHA256,
    SHA3,
    SHA384,
    SHA512,
    enc
  } from 'crypto-js';
  import { convertHexToBin } from '@/utils/convert';

  const _function = inject('_function', 'hash-text');

  const algos = {
    MD5,
    RIPEMD160,
    SHA1,
    SHA224,
    SHA256,
    SHA384,
    SHA512,
    SHA3
  } as const;

  type AlgoNames = keyof typeof algos;
  type Encoding = keyof typeof enc | 'Bin';

  const algoNames = Object.keys(algos) as AlgoNames[];

  const form = ref({
    text: useStorage(`${_function}:text`, ''),
    encode: useStorage<Encoding>(`${_function}:encode`, 'Bin')
  });
  const encodes = [
    {
      label: 'Binary (base 2)',
      value: 'Bin'
    },
    {
      label: 'Hexadecimal (base 16)',
      value: 'Hex'
    },
    {
      label: 'Base64 (base 64)',
      value: 'Base64'
    },
    {
      label: 'Base64url (base 64 with url safe chars)',
      value: 'Base64url'
    }
  ];
  const hashText = (algo: AlgoNames, value: string = '') => {
    if (form.value.encode === 'Bin') {
      // crypto-js 不支持二进制转换，这里的思路生成十六进制再转为二进制
      return convertHexToBin(algos[algo](value).toString(enc.Hex));
    }
    return algos[algo](value).toString(enc[form.value.encode]);
  };
</script>

<template>
  <n-form class="w-full">
    <n-form-item label="Your text to hash" path="text">
      <n-input
        type="textarea"
        placeholder="Your string to hash"
        v-model:value="form.text"
      />
    </n-form-item>
    <n-form-item label="Digest encoding" path="encode">
      <n-select v-model:value="form.encode" :options="encodes" />
    </n-form-item>
    <div class="mt-2" v-for="algo in algoNames" :key="algo">
      <n-input-group>
        <n-input-group-label style="flex: 0 0 120px">{{
          algo
        }}</n-input-group-label>
        <InputCopy :value="hashText(algo, form.text as string)" />
      </n-input-group>
    </div>
  </n-form>
</template>

<style lang="scss" scoped></style>
