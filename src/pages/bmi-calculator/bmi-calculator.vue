<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from 'naive-ui';
  import { Ruler, Scale, Activity, InfoCircle } from '@vicons/tabler';
  import {
    calculateBmi,
    getCategoryColor,
    CLASSIFICATION_TABLE
  } from './bmi-calculator.models';

  const { t } = useI18n();
  const message = useMessage();

  const height = ref<number>(170);
  const weight = ref<number>(65);

  const result = computed(() => calculateBmi(height.value, weight.value));

  const categoryColor = computed(() => getCategoryColor(result.value.category));

  function handleCalculate() {
    if (!height.value || height.value <= 0) {
      message.warning(t('tools.bmi-calculator.errors.invalidHeight'));
      return;
    }
    if (!weight.value || weight.value <= 0) {
      message.warning(t('tools.bmi-calculator.errors.invalidWeight'));
      return;
    }
    message.success(t('tools.bmi-calculator.calculated'));
  }
</script>

<template>
  <div class="mx-auto !flex-1 flex w-full max-w-5xl flex-col gap-5">
    <!-- 输入表单 -->
    <n-card class="rounded-xl" :bordered="true">
      <n-grid :x-gap="20" :y-gap="16" :cols="2" responsive="screen">
        <n-form-item-gi
          :label="t('tools.bmi-calculator.fields.height')"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-group-label>
              <n-icon><Ruler /></n-icon>
            </n-input-group-label>
            <n-input-number
              v-model:value="height"
              :min="1"
              :max="300"
              :step="1"
              :show-button="false"
              class="flex-1"
            />
            <n-input-group-label>{{
              t('tools.bmi-calculator.fields.heightUnit')
            }}</n-input-group-label>
          </n-input-group>
        </n-form-item-gi>

        <n-form-item-gi
          :label="t('tools.bmi-calculator.fields.weight')"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-group-label>
              <n-icon><Scale /></n-icon>
            </n-input-group-label>
            <n-input-number
              v-model:value="weight"
              :min="1"
              :max="500"
              :step="1"
              :precision="1"
              :show-button="false"
              class="flex-1"
            />
            <n-input-group-label>{{
              t('tools.bmi-calculator.fields.weightUnit')
            }}</n-input-group-label>
          </n-input-group>
        </n-form-item-gi>
      </n-grid>

      <n-button
        class="mt-4"
        type="primary"
        size="large"
        block
        @click="handleCalculate"
      >
        {{ t('tools.bmi-calculator.calculate') }}
      </n-button>
    </n-card>

    <!-- 计算结果 -->
    <n-card
      class="rounded-xl"
      :bordered="true"
      :title="t('tools.bmi-calculator.result.title')"
    >
      <template #header-extra>
        <n-icon size="18" :depth="3"><Activity /></n-icon>
      </template>

      <div
        class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]"
      >
        <div
          class="flex flex-col gap-2 rounded-lg border border-blue-500/15 bg-blue-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.bmi-calculator.result.bmi') }}
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-bold leading-tight text-blue-600">{{
              result.bmi
            }}</span>
          </div>
        </div>

        <div
          class="flex flex-col gap-2 rounded-lg border border-purple-500/15 bg-purple-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.bmi-calculator.result.category') }}
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold leading-tight text-purple-600">{{
              result.categoryLabel
            }}</span>
          </div>
        </div>

        <div
          class="flex flex-col gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.bmi-calculator.result.risk') }}
          </div>
          <div class="flex items-baseline gap-1">
            <span
              class="text-2xl font-bold leading-tight"
              :class="categoryColor"
              >{{ result.healthRisk }}</span
            >
          </div>
        </div>
      </div>
    </n-card>

    <!-- BMI 分类标准 -->
    <n-card
      class="rounded-xl"
      :bordered="true"
      :title="t('tools.bmi-calculator.classification.title')"
    >
      <template #header-extra>
        <n-icon size="18" :depth="3"><InfoCircle /></n-icon>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="px-4 py-3 font-semibold">
                {{ t('tools.bmi-calculator.table.range') }}
              </th>
              <th class="px-4 py-3 font-semibold">
                {{ t('tools.bmi-calculator.table.category') }}
              </th>
              <th class="px-4 py-3 font-semibold">
                {{ t('tools.bmi-calculator.table.risk') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in CLASSIFICATION_TABLE"
              :key="item.range"
              class="border-b border-gray-100 dark:border-gray-800"
            >
              <td class="px-4 py-3">{{ item.range }}</td>
              <td class="px-4 py-3 font-medium" :class="item.color">
                {{ item.category }}
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                {{ item.risk }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-card>
  </div>
</template>
