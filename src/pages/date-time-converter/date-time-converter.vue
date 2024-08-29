<script setup lang="ts">
import { useNow } from "@vueuse/core";
import type { DateFormat } from "./date-time-converter.types";
import { formatISO } from "date-fns";
import InputCopy from "@/components/InputCopy.vue";
import isDate from "validator/lib/isDate";
import { computed, ref } from "vue";

const value = ref("");
const now = useNow();
const toDate = (date: string) => new Date(date);
const formats: DateFormat[] = [
  {
    label: "JS locale date string",
    value: "js-locale-date-string",
    fromDate: (date) => date.toString(),
    toDate,
  },
  {
    label: "ISO 8601",
    value: "iso-8601",
    fromDate: formatISO,
    toDate,
  },
];
const formatType = ref(formats[0].value);
const normalizedDate = computed(() => {
  if (!value.value) {
    return now.value;
  }
  const format = formats.find((f) => f.value === formatType.value);
  try {
    if (format) {
      return format.toDate(value.value);
    }
  } catch (error) {
    return now.value;
  }
  return now.value;
});
const formatDateUsingFormatter = (
  formatter: (date: Date) => string,
  date?: Date
) => {
  if (!date || !isDate(date)) {
    return "Invalid date";
  }
  return formatter(date);
};
</script>

<template>
  <n-form class="w-full">
    <n-grid :x-gap="10">
      <n-form-item-gi :span="16">
        <n-input
          placeholder="Put your date string here..."
          v-model:value="value"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="8">
        <n-select v-model:value="formatType" :options="formats" />
      </n-form-item-gi>
    </n-grid>
    <div
      class="mt-2"
      v-for="{ value, label, fromDate } in formats"
      :key="value"
    >
      <n-input-group>
        <n-input-group-label style="flex: 0 0 160px">{{
          label
        }}</n-input-group-label>
        <InputCopy
          placeholder=""
          :value="formatDateUsingFormatter(fromDate, normalizedDate)"
        />
      </n-input-group>
    </div>
  </n-form>
</template>

<style lang="scss" scoped></style>
