<script setup lang="ts">
  import { computed, h, onBeforeMount, ref } from 'vue';
  import standardTypes from 'mime/types/standard.js';
  import type { tableItemType } from './mime-types.d.ts';
  import otherTypes from 'mime/types/other.js';
  import { NTag, SelectOption } from 'naive-ui';
  const mimeTypes = { ...standardTypes, ...otherTypes };
  const columns = [
    {
      title: 'Mime Types',
      minWidth: '220',
      key: 'type'
    },
    {
      title: 'Extensions',
      key: 'exts',
      render(row: tableItemType) {
        return row.exts.map((ext: string) =>
          h(
            NTag,
            {
              type: 'success',
              round: true,
              bordered: false,
              class: 'ml-2 mt-2'
            },
            {
              default: () => ext
            }
          )
        );
      }
    }
  ];
  const data = ref<Array<tableItemType>>([]);
  const exts = ref<Array<SelectOption>>([]);
  const selectType = ref<string>();
  const selectExt = ref<string>();
  const extRes = computed(() => {
    return data.value.find((item) => item.type === selectType.value)?.exts;
  });
  const typeRes = computed(() => {
    return data.value.find((item) => item.exts.includes(selectExt.value!))
      ?.type;
  });
  onBeforeMount(() => {
    data.value = Object.entries(mimeTypes).map(
      ([key, value]: [key: string, value: Array<string>]) => {
        const es = value.map((item: string) => `.${item}`);
        exts.value.push(
          ...es.map((item: string) => ({ label: item, value: item }))
        );
        return {
          type: key,
          exts: es
        };
      }
    );
  });
</script>

<template>
  <n-card title="Mime type to extension">
    <n-select
      filterable
      v-model:value="selectType"
      placeholder="Select a mime type (ex: application/json)"
      label-field="type"
      value-field="type"
      :options="data"
    />
    <div v-if="selectType">
      <n-text>Extensions:</n-text>
      <n-tag
        round
        :bordered="false"
        class="mt-2 ml-2"
        type="success"
        v-for="ext in extRes"
        :key="ext"
      >
        {{ ext }}
      </n-tag>
    </div>
  </n-card>
  <n-card title="File extension to mime type">
    <n-select
      filterable
      v-model:value="selectExt"
      placeholder="Select a extension (ex: .json)"
      :options="exts"
    />

    <div v-if="selectExt">
      <n-text>MimeTypes:</n-text>
      <n-tag round :bordered="false" class="mt-2 ml-2" type="success">
        {{ typeRes }}
      </n-tag>
    </div>
  </n-card>

  <n-data-table :borderd="false" :columns :data></n-data-table>
</template>

<style lang="scss" scoped></style>
