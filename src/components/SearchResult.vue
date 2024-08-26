<script setup lang="ts">
import { ref, watch } from "vue";
import { translate } from "../plugins/i18n.plugins";
import { useToolStore } from "../pages/tool.store";
import Fuse from "fuse.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const props = defineProps(["show"]);
const emit = defineEmits(["update:show"]);

const router = useRouter();

const showModal = ref<boolean>(false);
watch(
  () => props.show,
  (val) => {
    keywords.value = "";
    showModal.value = val;
  }
);
const options = ref<Array<any>>([]);

const { tools } = storeToRefs(useToolStore());

const fuse = new Fuse(tools.value, {
  keys: ["name", "description"],
  includeScore: true,
  threshold: 0.3,
});

const handleUpdateKeywords = (val: string) => {
  if (!val) return;
  const res = fuse.search(val);
  options.value = res.map((item) => {
    return {
      label: item.item.name,
      value: item.item.name,
      description: item.item.description,
      path: item.item.path,
    };
  });
};

const handleSelect = (val: string) => {
  const res = options.value.find((option) => option.label === val);
  emit("update:show", false);
  router.push({
    path: res?.path,
  });
};

const keywords = ref<string>("");

const handleUpdateShow = (val: boolean) => {
  if (!val) {
    keywords.value = "";
    emit("update:show", val);
  }
};
</script>

<template>
  <n-modal @update:show="handleUpdateShow" v-model:show="showModal">
    <n-card
      :closable="false"
      :bordered="false"
      class="w-[540px] top-20 fixed transition-none -translate-x-1/2 left-1/2"
    >
      <n-auto-complete
        clear-after-select
        @update:value="handleUpdateKeywords"
        v-model:value="keywords"
        :input-props="{
          autocomplete: 'disabled',
        }"
        @select="handleSelect"
        :options="options"
        :placeholder="translate('tools.searchPlaceholder')"
        clearable
      />
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped></style>
