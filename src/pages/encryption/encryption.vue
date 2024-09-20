<script setup lang="ts">
  import AES from 'crypto-js/aes';
  import { ref } from 'vue';

  const encrytForm = ref({
    encryptType: 'aes'
  });
  const encryptOptins = ref([
    {
      label: 'AES',
      value: 'aes'
    },
    {
      label: 'TripleDES',
      value: 'tripledes'
    },
    {
      label: 'Rabbit',
      value: 'rabbit'
    },
    {
      label: 'RC4',
      value: 'rc4'
    }
  ]);
  console.log(AES.encrypt('123456', '123456').toString());
</script>

<template>
  <n-card title="Encrypt">
    <n-select v-model:value="encrytForm.encryptType" :options="encryptOptins" />
  </n-card>
  <n-card title="Decrypt"></n-card>
</template>

<style lang="scss" scoped></style>
