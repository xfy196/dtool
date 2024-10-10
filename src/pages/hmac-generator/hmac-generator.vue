<script setup lang="ts">
  import { useStyleStore } from '@/stores/style.store';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import type { lib } from 'crypto-js';
  import {
    HmacSHA256,
    HmacSHA512,
    HmacMD5,
    HmacRIPEMD160,
    HmacSHA1,
    HmacSHA224,
    HmacSHA384,
    HmacSHA3,
    enc
  } from 'crypto-js';
  import InputCopy from '@/components/InputCopy.vue';
  import { convertHexToBin } from '@/utils/convert';
  const algos = {
    MD5: HmacMD5,
    SHA1: HmacSHA1,
    SHA3: HmacSHA3,
    SHA224: HmacSHA224,
    SHA256: HmacSHA256,
    SHA384: HmacSHA384,
    SHA512: HmacSHA512,
    RIPEMD160: HmacRIPEMD160
  } as const;
  const hash = ref('');
  const secretKey = ref('Hello World');
  const hashFunction = ref<keyof typeof algos>('MD5');
  type Encoding = 'Bin' | 'Hex' | 'Base64' | 'Base64url';
  const outputEncoding = ref<Encoding>('Hex');
  const generateHmac = (words: lib.WordArray, encoding: Encoding) => {
    if (encoding === 'Bin') {
      // 将 hex to bin
      return convertHexToBin(words.toString(enc.Hex));
    }
    return words.toString(enc[encoding]);
  };
  const hmac = computed(() => {
    return generateHmac(
      algos[hashFunction.value](hash.value, secretKey.value),
      outputEncoding.value
    );
  });
  const styleStore = useStyleStore();
  const { isSmallScreen } = storeToRefs(styleStore);
</script>

<template>
  <div class="">
    <n-space vertical>
      <n-form-item
        :show-feedback="false"
        label="Plain text to compute the hash"
      >
        <n-input
          type="textarea"
          placeholder="Plain text to compute the hash"
          v-model:value="hash"
        ></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false" label="Secret key">
        <n-input
          placeholder="Enter the secret key"
          v-model:value="secretKey"
        ></n-input>
      </n-form-item>
      <n-grid :x-gap="10">
        <n-form-item-gi label="Hash function" :span="isSmallScreen ? 24 : 12">
          <n-select
            v-model:value="hashFunction"
            :options="Object.keys(algos).map((k) => ({ label: k, value: k }))"
          >
          </n-select>
        </n-form-item-gi>
        <n-form-item-gi label="Output encoding" :span="isSmallScreen ? 24 : 12">
          <n-select
            v-model:value="outputEncoding"
            :options="[
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
                label: 'Base64-url (base 64 with url safe chars)',
                value: 'Base64url'
              }
            ]"
          ></n-select>
        </n-form-item-gi>
      </n-grid>
      <n-form-item label="HMAC of your text">
        <InputCopy v-model:value="hmac" />
      </n-form-item>
    </n-space>
  </div>
</template>

<style lang="scss" scoped></style>
