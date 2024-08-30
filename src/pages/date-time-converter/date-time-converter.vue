<script setup lang="ts">
import { useNow } from "@vueuse/core";
import type { DateFormat } from "./date-time-converter.types";
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
} from "date-fns";
import InputCopy from "@/components/InputCopy.vue";
import { useStyleStore } from "@/stores/style.store";
import {
  isISO9075DateString,
  isISO8601DateString,
  isRFC7231DateString,
  isRFC3399DateString,
  isUnixDateString,
  isTimestamp,
  isUTCDateString,
} from "./date-time-converter.util";
import { computed, ref, watch } from "vue";
import { FormInst, FormRules } from "naive-ui";
import { storeToRefs } from "pinia";
const now = useNow();
const toDate = (date: string) => new Date(date);
const formats: DateFormat[] = [
  {
    label: "JS locale time",
    value: "js-locale-time",
    fromDate: (date) => date.toString(),
    toDate,
    formatMatcher: () => false,
  },
  {
    label: "ISO 8601",
    value: "iso-8601",
    fromDate: formatISO,
    toDate: parseISO,
    formatMatcher: (date: string) => isISO8601DateString(date),
  },
  {
    label: "ISO 9075",
    value: "iso-9075",
    fromDate: formatISO9075,
    toDate: parseISO,
    formatMatcher: (date: string) => isISO9075DateString(date),
  },
  {
    label: "RFC 3399",
    value: "rfc-3399",
    fromDate: formatRFC3339,
    toDate,
    formatMatcher: (date: string) => isRFC3399DateString(date),
  },
  {
    label: "RFC 7231",
    value: "rfc-7231",
    fromDate: formatRFC7231,
    toDate,
    formatMatcher: (date: string) => isRFC7231DateString(date),
  },
  {
    label: "Unix timestamp",
    value: "unix-timestamp",
    fromDate: (date) => String(getUnixTime(date)),
    toDate: (sec) => fromUnixTime(+sec),
    formatMatcher: (date: string) => isUnixDateString(date),
  },
  {
    label: "Timestamp",
    value: "timestamp",
    fromDate: (date) => String(getTime(date)),
    toDate: (ms) => new Date(+ms),
    formatMatcher: (date: string) => isTimestamp(date),
  },
  {
    label: "UTC format",
    value: "utc-format",
    fromDate: (date) => date.toUTCString(),
    toDate,
    formatMatcher: (date: string) => isUTCDateString(date),
  },
];
const form = ref({
  value: "",
  formatType: formats[0].value,
});
const normalizedDate = computed(() => {
  if (!form.value.value) {
    return now.value;
  }
  const format = formats.find((f) => f.value === form.value.formatType);
  try {
    if (format) {
      return format.toDate(form.value.value);
    }
  } catch (error) {
    return undefined;
  }
});
const rules: FormRules = {
  value: {
    trigger: ["input", "blur"],
    validator: (_rule, value) => {
      if (!value) {
        return true;
      }
      const format = formats.find((f) => f.value === form.value.formatType);
      if (format) {
        try {
          const date = format.toDate(value);
          if (isDate(date) && isValid(date)) {
            return true;
          } else {
            return new Error("This date is invalid for this format");
          }
        } catch (error) {
          return new Error("This date is invalid for this format");
        }
      }
    },
  },
};
const formRef = ref<FormInst | null>(null);
watch(
  () => form.value.formatType,
  () => {
    formRef.value?.validate();
  }
);
const handleUpdateDate = (date: string) => {
  const fIndex = formats.findIndex(({ formatMatcher }) => formatMatcher(date));
  if (fIndex !== -1) {
    form.value.formatType = formats[fIndex].value;
  }
};
const formatDateUsingFormatter = (
  formatter: (date: Date) => string,
  date?: Date
) => {
  if (date && isDate(date) && isValid(date)) {
    return formatter(date);
  }
  return "Invalid date";
};
const styleStore = useStyleStore();
const { isSmallScreen } = storeToRefs(styleStore);
</script>

<template>
  <n-form ref="formRef" :rules="rules" :model="form" class="w-full">
    <n-grid :x-gap="10">
      <n-form-item-gi path="value" :span="isSmallScreen ? 14 : 18">
        <n-input
          clearable
          @update:value="handleUpdateDate"
          placeholder="Put your date string here..."
          v-model:value="form.value"
        />
      </n-form-item-gi>
      <n-form-item-gi path="formatType" :span="isSmallScreen ? 10 : 6">
        <n-select v-model:value="form.formatType" :options="formats" />
      </n-form-item-gi>
    </n-grid>
    <div
      class="mt-2"
      v-for="{ value, label, fromDate } in formats"
      :key="value"
    >
      <n-input-group>
        <n-input-group-label style="flex: 0 0 130px">{{
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
