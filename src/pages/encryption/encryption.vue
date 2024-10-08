<script setup lang="ts">
  import { AES, RC4, TripleDES, Rabbit, enc } from 'crypto-js';
  import { ref, computed } from 'vue';
  const algos: Record<string, any> = {
    aes: AES,
    tripledes: TripleDES,
    rabbit: Rabbit,
    rc4: RC4
  };
  const encrytForm = ref({
    encryptType: 'aes',
    encryptText: 'Hello World',
    encryptSecretKey: 'my scret key'
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
  const encryptResult = computed(() =>
    algos[encrytForm.value.encryptType]
      .encrypt(encrytForm.value.encryptText, encrytForm.value.encryptSecretKey)
      .toString()
  );
  const decryptForm = ref({
    decryptType: 'aes',
    decryptText: 'U2FsdGVkX195o067PFWq67082/8muDSwq3UAEjW4JLo=',
    decryptSecretKey: 'my scret key'
  });
  const decryptResult = computed(() => {
    try {
      return algos[decryptForm.value.decryptType]
        .decrypt(
          decryptForm.value.decryptText,
          decryptForm.value.decryptSecretKey
        )
        .toString(enc.Utf8);
    } catch (error) {
      return '';
    }
  });
</script>

<template>
  <n-card title="Encrypt">
    <n-space vertical>
      <n-form-item :show-feedback="false" label="Your secret key">
        <n-input
          clearable
          v-model:value="encrytForm.encryptSecretKey"
        ></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false" label="Encryption algorithm">
        <n-select
          v-model:value="encrytForm.encryptType"
          :options="encryptOptins"
        />
      </n-form-item>
      <n-form-item :show-feedback="false" label="Your text">
        <n-input
          clearable
          v-model:value="encrytForm.encryptText"
          type="textarea"
          placeholder="Enter text to encrypt"
        />
      </n-form-item>
      <n-form-item label="Your encrypted text">
        <n-input
          type="textarea"
          readonly
          v-model:value="encryptResult"
        ></n-input>
      </n-form-item>
    </n-space>
  </n-card>
  <n-card title="Decrypt">
    <n-space vertical>
      <n-form-item :show-feedback="false" label="Your secret key">
        <n-input
          clearable
          v-model:value="decryptForm.decryptSecretKey"
        ></n-input>
      </n-form-item>
      <n-form-item :show-feedback="false" label="Encryption algorithm">
        <n-select
          v-model:value="decryptForm.decryptType"
          :options="encryptOptins"
        />
      </n-form-item>
      <n-form-item :show-feedback="false" label="Your decrypted text">
        <n-input
          clearable
          v-model:value="decryptForm.decryptText"
          type="textarea"
          placeholder="Enter text to decrypt"
        />
      </n-form-item>
      <n-form-item label="Your encrypted text">
        <n-input
          type="textarea"
          readonly
          v-model:value="decryptResult"
        ></n-input>
      </n-form-item>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped></style>
