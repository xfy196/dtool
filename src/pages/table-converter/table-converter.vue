<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue';
  import { Copy, Download } from '@vicons/tabler';
  import {
    csvToJson,
    csvToMarkdown,
    jsonToCsv,
    jsonToMarkdown,
    markdownTableToCSV,
    markdownToJson
  } from '@/pages/table-converter/utils.ts';
  import { useCopy } from '@/composable/copy.ts';
  import { useDownloadBase64File } from '@/composable/downloadBase64.ts';

  const inputType = ref<string>('md');
  const outputType = ref<string>('csv');
  const inputContent = ref<string>(
    '| 姓名 | 年龄 | 城市 |\n' +
      '| --- | --- | --- |\n' +
      '| 张三 | 28 | 北京 |\n' +
      '| 李四 | 32 | 上海 |\n' +
      '| 王五 | 25 | 广州 |'
  );
  const outputContent = ref<string>('');
  const options = [
    {
      label: 'Markdown',
      value: 'md'
    },
    {
      label: 'CSV',
      value: 'csv'
    },
    {
      label: 'JSON',
      value: 'json'
    }
  ];

  // 格式转换主函数
  const convert = () => {
    if (!inputContent.value.trim()) {
      outputContent.value = '';
      return;
    }
    try {
      if (inputType.value === outputType.value) {
        outputContent.value = inputContent.value;
        return;
      }

      if (inputType.value === 'md' && outputType.value === 'csv') {
        outputContent.value = markdownTableToCSV(inputContent.value);
      } else if (inputType.value === 'csv' && outputType.value === 'md') {
        outputContent.value = csvToMarkdown(inputContent.value);
      } else if (inputType.value === 'md' && outputType.value === 'json') {
        outputContent.value = markdownToJson(inputContent.value);
      } else if (inputType.value === 'json' && outputType.value === 'md') {
        outputContent.value = jsonToMarkdown(inputContent.value);
      } else if (inputType.value === 'csv' && outputType.value === 'json') {
        outputContent.value = csvToJson(inputContent.value);
      } else if (inputType.value === 'json' && outputType.value === 'csv') {
        outputContent.value = jsonToCsv(inputContent.value);
      }
    } catch (error: any) {
      outputContent.value = `转换错误: ${error.message}`;
    }
  };
  // 处理输入格式变更
  const handleInputTypeChange = (newType: string, oldType: string) => {
    if (!inputContent.value.trim()) {
      convert();
      return;
    }

    try {
      // 从旧格式转换为新格式
      if (oldType === 'md' && newType === 'csv') {
        inputContent.value = markdownTableToCSV(inputContent.value);
      } else if (oldType === 'csv' && newType === 'md') {
        inputContent.value = csvToMarkdown(inputContent.value);
      } else if (oldType === 'md' && newType === 'json') {
        inputContent.value = markdownToJson(inputContent.value);
      } else if (oldType === 'json' && newType === 'md') {
        inputContent.value = jsonToMarkdown(inputContent.value);
      } else if (oldType === 'csv' && newType === 'json') {
        inputContent.value = csvToJson(inputContent.value);
      } else if (oldType === 'json' && newType === 'csv') {
        inputContent.value = jsonToCsv(inputContent.value);
      }
    } catch (error: any) {
      inputContent.value = `格式转换错误: ${error.message}`;
    }

    // 延迟执行转换，确保输入内容已更新
    nextTick(() => {
      convert();
    });
  };
  watch(
    () => inputType.value,
    (newInputType, oldInputType) => {
      handleInputTypeChange(newInputType, oldInputType);
    }
  );
  watch(() => outputType.value, convert);

  watch(() => inputContent.value, convert, { immediate: true });

  const { copy, isSupported, copied } = useCopy({
    source: outputContent,
    isToast: false
  });

  const handleDownloadFile = () => {
    const { download } = useDownloadBase64File({
      source: ref(btoa(unescape(encodeURIComponent(outputContent.value)))),
      fileName: 'table',
      extension: outputType.value
    });
    download();
  };
</script>

<template>
  <n-card :title="'输入'">
    <template #header-extra>
      <div class="w-36">
        <n-space vertical>
          <n-select v-model:value="inputType" :options="options" />
        </n-space>
      </div>
    </template>
    <n-input
      :rows="12"
      type="textarea"
      placeholder="请输入内容"
      v-model:value="inputContent"
    ></n-input>
  </n-card>
  <n-card :title="'输出'">
    <template #header-extra>
      <div class="w-36">
        <n-space vertical>
          <n-select v-model:value="outputType" :options="options" />
        </n-space>
      </div>
    </template>
    <n-input
      :rows="12"
      type="textarea"
      placeholder=""
      v-model:value="outputContent"
    ></n-input>
    <template #action>
      <n-space>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button v-if="isSupported" @click.stop="copy" tertiary>
              <template #icon>
                <n-icon>
                  <Copy />
                </n-icon>
              </template>
              复制
            </n-button>
          </template>
          {{ copied ? 'Copied!' : 'Copy to clipboard' }}
        </n-tooltip>
        <n-button @click.stop="handleDownloadFile" tertiary>
          <template #icon>
            <n-icon>
              <Download />
            </n-icon>
          </template>
          下载
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<style scoped lang="scss"></style>
