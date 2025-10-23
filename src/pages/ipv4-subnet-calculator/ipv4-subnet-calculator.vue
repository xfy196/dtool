<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { Netmask } from 'netmask';
  import { useStorage } from '@vueuse/core';
  import { NavigateNextFilled, NavigateBeforeFilled } from '@vicons/material';
  import CopyText from '../../components/CopyText.vue';

  const ip = useStorage('ipv4', '192.168.8.0/24');
  let netInfo: Netmask;
  const inputValidationStatus = ref<'error' | 'success' | 'warning'>();
  const inputFeedback = ref<string>('');
  const keyMap: Record<string, string> = {
    base: '网络基地址',
    mask: '网络掩码',
    hostmask: '主机掩码',
    bitmask: '块地址网络位数',
    size: '块IP地址数',
    broadcast: '块广播地址',
    first: '第一个可用地址',
    last: '最后一个可用地址'
  };
  const data = ref<Array<{ label: string; value: string | number }>>();
  watchEffect(() => {
    if (ip.value) {
      try {
        netInfo = new Netmask(ip.value);
        data.value = Object.keys(netInfo)
          .filter((key: string) => key in keyMap)
          .map((item: string) => {
            return {
              label: keyMap[item],
              value: netInfo[item as keyof Netmask]
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
  const handleUpdateIp = ({ count = 1 }: { count?: number }): void => {
    const val = netInfo.next(count).toString();
    if (val) {
      ip.value = val;
    }
  };
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
      <n-input placeholder="ipv4 address..." v-model:value="ip" />
    </n-form-item>
    <n-table :bordered="false">
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.label }}</td>
          <td>
            <CopyText :text="item.value" />
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-flex class="mt-2" justify="space-between">
      <n-button @click.stop="handleUpdateIp({ count: -1 })" secondary>
        <template #icon>
          <n-icon>
            <NavigateBeforeFilled />
          </n-icon>
        </template>
        上一个块区
      </n-button>
      <n-button
        @click.stop="handleUpdateIp({ count: 1 })"
        secondary
        icon-placement="right"
      >
        下一个块区
        <template #icon>
          <n-icon>
            <NavigateNextFilled />
          </n-icon>
        </template>
      </n-button>
    </n-flex>
  </n-card>
</template>

<style scoped lang="scss"></style>
