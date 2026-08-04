<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from 'naive-ui';
  import { Calculator, FileText, Star, Eraser, ChartBar } from '@vicons/tabler';
  import { parseAndCalculate, EXAMPLE_DATA } from './number-sum-average.models';

  const { t } = useI18n();
  const message = useMessage();

  const rawInput = ref('');

  const parsed = computed(() => parseAndCalculate(rawInput.value));
  const rows = computed(() => parsed.value.rows);
  const summary = computed(() => parsed.value.summary);
  const hasResult = computed(() => rows.value.length > 0);

  function generate() {
    const result = parsed.value;
    if (result.error) {
      message.error(result.error);
      return;
    }
    if (result.rows.length === 0) {
      message.warning(t('tools.number-sum-average.errors.empty'));
      return;
    }
    message.success(t('tools.number-sum-average.generated'));
  }

  function loadExample() {
    rawInput.value = EXAMPLE_DATA;
    message.info(t('tools.number-sum-average.example_loaded'));
  }

  function clearData() {
    rawInput.value = '';
    message.info(t('tools.number-sum-average.cleared'));
  }

  function formatNumber(n: number): string {
    if (Number.isInteger(n)) return String(n);
    return parseFloat(n.toFixed(2)).toString();
  }
</script>

<template>
  <div class="mx-auto !flex-1 flex w-full max-w-5xl flex-col gap-5">
    <!-- 输入区域 -->
    <n-card class="rounded-xl" :bordered="true">
      <template #header>
        <div class="flex items-center gap-2">
          <n-icon size="18" :depth="3"><FileText /></n-icon>
          <span class="text-base font-semibold">{{
            t('tools.number-sum-average.input.title')
          }}</span>
        </div>
      </template>

      <n-input
        v-model:value="rawInput"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 12 }"
        placeholder="1 2 3&#10;4 5 6&#10;7 8 9"
        class="font-mono text-sm"
      />

      <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {{ t('tools.number-sum-average.input.hint') }}
      </div>

      <div class="mt-4 flex flex-wrap gap-3">
        <n-button type="primary" size="large" @click="generate">
          <template #icon
            ><n-icon><ChartBar /></n-icon
          ></template>
          {{ t('tools.number-sum-average.buttons.generate') }}
        </n-button>
        <n-button type="success" size="large" @click="loadExample">
          <template #icon
            ><n-icon><Star /></n-icon
          ></template>
          {{ t('tools.number-sum-average.buttons.example') }}
        </n-button>
        <n-button size="large" @click="clearData">
          <template #icon
            ><n-icon><Eraser /></n-icon
          ></template>
          {{ t('tools.number-sum-average.buttons.clear') }}
        </n-button>
      </div>
    </n-card>

    <!-- 统计结果 -->
    <n-card
      v-if="hasResult"
      class="rounded-xl"
      :bordered="true"
      :title="t('tools.number-sum-average.result.title')"
    >
      <template #header-extra>
        <n-icon size="18" :depth="3"><Calculator /></n-icon>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="border-b-2 border-gray-200 dark:border-gray-700">
              <th
                class="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                {{ t('tools.number-sum-average.table.row') }}
              </th>
              <th
                v-for="c in summary.maxColumns"
                :key="'h-' + c"
                class="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                {{ t('tools.number-sum-average.table.data') }}{{ c }}
              </th>
              <th
                class="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400"
              >
                {{ t('tools.number-sum-average.table.average') }}
              </th>
              <th
                class="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400"
              >
                {{ t('tools.number-sum-average.table.sum') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.rowIndex"
              class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td
                class="px-4 py-3 font-medium text-gray-800 dark:text-gray-100"
              >
                {{ row.rowIndex }}
              </td>
              <td
                v-for="(val, ci) in row.values"
                :key="'v-' + row.rowIndex + '-' + ci"
                class="px-4 py-3 text-gray-700 dark:text-gray-300"
              >
                {{ formatNumber(val) }}
              </td>
              <td
                class="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400"
              >
                {{ formatNumber(row.average) }}
              </td>
              <td
                class="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400"
              >
                {{ formatNumber(row.sum) }}
              </td>
            </tr>
            <!-- 统计行 -->
            <tr
              class="bg-amber-50 dark:bg-amber-900/20 border-t-2 border-amber-200 dark:border-amber-800"
            >
              <td class="px-4 py-3 font-bold text-gray-800 dark:text-gray-100">
                {{ t('tools.number-sum-average.table.stats') }}
              </td>
              <td
                v-for="(s, ci) in summary.columnSums"
                :key="'s-' + ci"
                class="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400"
              >
                {{ formatNumber(s) }}
              </td>
              <td
                class="px-4 py-3 font-bold text-amber-600 dark:text-amber-400"
              >
                {{ formatNumber(summary.overallAverage) }}
              </td>
              <td class="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">
                {{ formatNumber(summary.totalSum) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-card>

    <!-- 统计摘要 -->
    <n-card
      v-if="hasResult"
      class="rounded-xl"
      :bordered="true"
      :title="t('tools.number-sum-average.summary.title')"
    >
      <template #header-extra>
        <n-icon size="18" :depth="3"><BarChart3 /></n-icon>
      </template>

      <div
        class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]"
      >
        <div
          class="flex flex-col gap-1 rounded-lg border border-violet-500/20 bg-violet-500/[0.08] p-4"
        >
          <span class="text-xs text-gray-600 dark:text-gray-300">
            {{ t('tools.number-sum-average.summary.rows') }}
          </span>
          <span class="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {{ summary.rowCount }}
          </span>
        </div>
        <div
          class="flex flex-col gap-1 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.08] p-4"
        >
          <span class="text-xs text-gray-600 dark:text-gray-300">
            {{ t('tools.number-sum-average.summary.count') }}
          </span>
          <span class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {{ summary.totalCount }}
          </span>
        </div>
        <div
          class="flex flex-col gap-1 rounded-lg border border-amber-500/20 bg-amber-500/[0.08] p-4"
        >
          <span class="text-xs text-gray-600 dark:text-gray-300">
            {{ t('tools.number-sum-average.summary.avg') }}
          </span>
          <span class="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {{ formatNumber(summary.overallAverage) }}
          </span>
        </div>
        <div
          class="flex flex-col gap-1 rounded-lg border border-blue-500/20 bg-blue-500/[0.08] p-4"
        >
          <span class="text-xs text-gray-600 dark:text-gray-300">
            {{ t('tools.number-sum-average.summary.sum') }}
          </span>
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ formatNumber(summary.totalSum) }}
          </span>
        </div>
      </div>
    </n-card>
  </div>
</template>
