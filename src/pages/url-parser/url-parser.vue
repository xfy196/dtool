<script setup lang="ts">
  import InputCopy from '@/components/InputCopy.vue';
  import { computed, ref } from 'vue';
  import { SubdirectoryArrowRightRound } from '@vicons/material';

  const url = ref(
    'https://me:pwd@xxytime.top:3000/url-parser?key1=value&key2=value2#the-hash'
  );
  const urlParsed = computed(() => new URL(url.value));
  const properties: { title: string; key: keyof URL }[] = [
    { title: 'Protocol', key: 'protocol' },
    { title: 'Username', key: 'username' },
    { title: 'Password', key: 'password' },
    { title: 'Hostname', key: 'hostname' },
    { title: 'Port', key: 'port' },
    { title: 'Path', key: 'pathname' },
    { title: 'Params', key: 'search' }
  ];
  console.log('🚀 ~ urlParsed:', urlParsed.value);
</script>

<template>
  <n-card>
    <n-form-item :show-feedback="false" label="Your url to parse">
      <n-input :value="url"></n-input>
    </n-form-item>
    <n-divider />
    <InputCopy
      v-for="{ title, key } in properties"
      :key="key"
      label-placement="right"
      :label-width="90"
      label-align="left"
      :value="(urlParsed?.[key] as string) ?? ''"
      :label="title"
      readonly
      class="mb-2"
      :show-feedback="false"
    />
    <div
      v-for="[key, value] in Object.fromEntries(
        urlParsed.searchParams.entries()
      )"
      :key="key"
      class="flex w-full mb-2"
    >
      <div style="flex: 0 0 90px">
        <n-icon size="24">
          <SubdirectoryArrowRightRound />
        </n-icon>
      </div>
      <InputCopy
        label-placement="left"
        :show-feedback="false"
        :value="key"
        readonly
      />
      <InputCopy
        label-placement="left"
        :show-feedback="false"
        :value="value"
        readonly
      />
    </div>
  </n-card>
</template>

<style lang="scss" scoped></style>
