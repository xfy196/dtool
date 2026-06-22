<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage, type SelectOption } from 'naive-ui';
  import { Bulb, Cash, Calendar, Percentage, ChartBar } from '@vicons/tabler';
  import {
    calculateLoan,
    formatCurrency,
    type LoanResult,
    type RepaymentType
  } from './loan-calculator.models';

  const { t } = useI18n();
  const message = useMessage();

  // ----- form state -----
  const principal = ref<number>(1_000_000);
  const months = ref<number>(360);
  const annualRate = ref<number>(3.1);
  const repaymentType = ref<RepaymentType>('equal-payment');

  const repaymentOptions = computed<SelectOption[]>(() => [
    {
      label: t('tools.loan-calculator.repayment.equal-payment'),
      value: 'equal-payment'
    },
    {
      label: t('tools.loan-calculator.repayment.equal-principal'),
      value: 'equal-principal'
    }
  ]);

  // ----- derived result -----
  const result = computed<LoanResult>(() =>
    calculateLoan(
      principal.value,
      annualRate.value,
      months.value,
      repaymentType.value
    )
  );

  // ----- formatted display values -----
  const monthlyText = computed(() =>
    formatCurrency(result.value.monthlyPayment)
  );
  const interestText = computed(() =>
    formatCurrency(result.value.totalInterest)
  );
  const totalText = computed(() => formatCurrency(result.value.totalPayment));

  // ----- handlers -----
  function handleCalculate() {
    if (principal.value <= 0) {
      message.warning(t('tools.loan-calculator.errors.invalidPrincipal'));
      return;
    }
    if (months.value <= 0 || months.value > 360) {
      message.warning(t('tools.loan-calculator.errors.invalidMonths'));
      return;
    }
    if (annualRate.value < 0) {
      message.warning(t('tools.loan-calculator.errors.invalidRate'));
      return;
    }
    // Result is reactive; this click is mostly for affordance + analytics parity.
    message.success(t('tools.loan-calculator.calculated'));
  }

  // function handleAiAdvice() {
  //   message.info(t('tools.loan-calculator.ai.comingSoon'));
  // }
</script>

<template>
  <div class="mx-auto !flex-1 flex w-full max-w-5xl flex-col gap-5">
    <!-- input form -->
    <n-card class="rounded-xl" :bordered="true">
      <n-grid :x-gap="20" :y-gap="16" :cols="2" responsive="screen">
        <n-form-item-gi
          :label="t('tools.loan-calculator.fields.principal')"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-group-label>
              <n-icon><Cash /></n-icon>
            </n-input-group-label>
            <n-input-number
              v-model:value="principal"
              :min="0"
              :step="10000"
              :show-button="false"
              class="flex-1"
            />
            <n-input-group-label>元</n-input-group-label>
          </n-input-group>
        </n-form-item-gi>

        <n-form-item-gi
          :label="t('tools.loan-calculator.fields.months')"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-group-label>
              <n-icon><Calendar /></n-icon>
            </n-input-group-label>
            <n-input-number
              v-model:value="months"
              :min="1"
              :max="360"
              :step="12"
              :show-button="false"
              class="flex-1"
            />
            <n-input-group-label>
              {{ t('tools.loan-calculator.fields.monthsSuffix') }}
            </n-input-group-label>
          </n-input-group>
        </n-form-item-gi>

        <n-form-item-gi
          :label="t('tools.loan-calculator.fields.annualRate')"
          :show-feedback="false"
        >
          <n-input-group>
            <n-input-group-label>
              <n-icon><Percentage /></n-icon>
            </n-input-group-label>
            <n-input-number
              v-model:value="annualRate"
              :min="0"
              :max="100"
              :step="0.1"
              :precision="3"
              :show-button="false"
              class="flex-1"
            />
            <n-input-group-label>%</n-input-group-label>
          </n-input-group>
        </n-form-item-gi>

        <n-form-item-gi
          :label="t('tools.loan-calculator.fields.repaymentType')"
          :show-feedback="false"
        >
          <n-select
            v-model:value="repaymentType"
            :options="repaymentOptions"
            :consistent-menu-width="false"
          />
        </n-form-item-gi>
      </n-grid>

      <n-button
        class="mt-4"
        type="primary"
        size="large"
        block
        @click="handleCalculate"
      >
        {{ t('tools.loan-calculator.calculate') }}
      </n-button>
    </n-card>

    <!-- result -->
    <n-card
      class="rounded-xl"
      :bordered="true"
      :title="t('tools.loan-calculator.result.title')"
    >
      <template #header-extra>
        <n-icon size="18" :depth="3"><ChartBar /></n-icon>
      </template>

      <div
        class="loan-calc-results mb-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]"
      >
        <div
          class="flex flex-col gap-2 rounded-lg border border-blue-500/15 bg-blue-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.loan-calculator.result.monthly') }}
          </div>
          <div class="flex gap-1 items-baseline">
            <span
              class="text-2xl font-bold leading-tight text-blue-600 sm:text-[1.5rem]"
              >{{ monthlyText }}</span
            >
            <span class="text-sm text-gray-500 dark:text-zinc-400">元</span>
          </div>
        </div>

        <div
          class="flex flex-col gap-2 rounded-lg border border-purple-500/15 bg-purple-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.loan-calculator.result.interest') }}
          </div>
          <div class="flex gap-1 items-baseline">
            <span
              class="text-2xl font-bold leading-tight text-purple-600 sm:text-[1.5rem]"
              >{{ interestText }}</span
            >
            <span class="text-sm text-gray-500 dark:text-zinc-400">元</span>
          </div>
        </div>

        <div
          class="flex flex-col gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08] p-4"
        >
          <div class="text-sm text-gray-600 dark:text-zinc-300">
            {{ t('tools.loan-calculator.result.total') }}
          </div>
          <div class="flex gap-1 items-baseline">
            <span
              class="text-2xl font-bold leading-tight text-emerald-600 sm:text-[1.5rem]"
              >{{ totalText }}</span
            >
            <span class="text-sm text-gray-500 dark:text-zinc-400">元</span>
          </div>
        </div>
      </div>

      <!-- <div class="flex justify-center my-6">
        <n-button
          type="primary"
          size="medium"
          class="bg-gradient-to-br from-indigo-500 to-violet-500 border-transparent"
          @click="handleAiAdvice"
        >
          <template #icon>
            <n-icon><Bulb /></n-icon>
          </template>
          {{ t('tools.loan-calculator.ai.button') }}
        </n-button>
      </div> -->
    </n-card>
  </div>
</template>
