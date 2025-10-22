<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { Netmask } from 'netmask';

  const inputValue = ref('');
  const netInfo = ref<Netmask>();
  const inputValidationStatus = ref<'error' | 'success' | 'warning'>();
  const inputFeedback = ref<string>('');
  const data = ref();
  watchEffect(() => {
    if (inputValue.value) {
      try {
        netInfo.value = new Netmask(inputValue.value);
        data.value = Object.keys(netInfo.value).map((item: string) => {
          return {
            key: item,
            value: netInfo.value[item]
          };
        });
        inputValidationStatus.value = undefined;
        inputFeedback.value = '';
      } catch (error: any) {
        inputValidationStatus.value = 'error';
        inputFeedback.value = error.toString();
      }
    } else {
      data.value = [];
      inputValidationStatus.value = undefined;
      inputFeedback.value = '';
    }
  });
</script>

<template>
  <n-card>
    <n-form-item
      :label-width="100"
      :validation-status="inputValidationStatus"
      :feedback="inputFeedback"
      label-placement="top"
      label="An IPv4 address with or without mask"
    >
      <n-input placeholder="ipv4 address..." v-model:value="inputValue" />
    </n-form-item>
    <n-table :bordered="false">
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped lang="scss"></style>
