<script setup lang="ts">
  import { watchEffect, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { isEmpty, get } from 'lodash';
  import JsonDiffNode from '@/pages/json-diff/component/json-diff-node.vue';

  const leftJson = defineModel('left-json', { type: String, required: true });
  const rightJson = defineModel('right-json', {
    type: String,
    required: true
  });
  const diffResult = ref({});
  const message = useMessage();
  const deepDiff = (
    obj1: any,
    obj2: any,
    onlyDifferences = true,
    path = '',
    seen = new Map()
  ) => {
    // 处理循环引用
    if (seen.has(obj1) || seen.has(obj2)) return {};
    seen.set(obj1, true);
    seen.set(obj2, true);

    // 类型不同直接返回差异
    if (typeof obj1 !== typeof obj2) {
      return onlyDifferences
        ? { [path]: { type: 'TYPE_MISMATCH', old: obj1, new: obj2 } }
        : {};
    }

    // 基本类型直接比较
    if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
      return obj1 !== obj2
        ? { [path]: { type: 'MODIFIED', old: obj1, new: obj2 } }
        : onlyDifferences
          ? {}
          : { [path]: { type: 'UNCHANGED', value: obj1 } };
    }

    // 处理特殊类型
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() !== obj2.getTime()
        ? { [path]: { type: 'MODIFIED', old: obj1, new: obj2 } }
        : onlyDifferences
          ? {}
          : { [path]: { type: 'UNCHANGED', value: obj1 } };
    }

    // 数组处理（顺序敏感）
    if (Array.isArray(obj1)) {
      const diff = {};
      const maxLen = Math.max(obj1.length, obj2.length);
      for (let i = 0; i < maxLen; i++) {
        const currentPath = `${path}[${i}]`;
        const itemDiff = deepDiff(
          obj1[i],
          obj2[i],
          onlyDifferences,
          currentPath,
          seen
        );
        Object.assign(diff, itemDiff);
      }
      return diff;
    }

    // 对象处理
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const diff: any = {};
    keys.forEach((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (!(key in obj1)) {
        diff[currentPath] = { type: 'ADDED', value: val2 }; // 新增属性
      } else if (!(key in obj2)) {
        diff[currentPath] = { type: 'REMOVED', value: val1 }; // 删除属性
      } else {
        const itemDiff = deepDiff(
          val1,
          val2,
          onlyDifferences,
          currentPath,
          seen
        );
        Object.assign(diff, itemDiff);
      }
    });

    // 过滤未变更字段
    return onlyDifferences
      ? Object.fromEntries(
          Object.entries(diff).filter(
            ([_, v]: [any, any]) => v.type !== 'UNCHANGED'
          )
        )
      : diff;
  };
  watchEffect(() => {
    let leftJsonObj = {};
    let rightJsonObj = {};

    if (leftJson.value) {
      try {
        leftJsonObj = JSON.parse(leftJson.value);
      } catch (e) {
        message.error('left json is not a valid json');
        return;
      }
    }
    if (rightJson.value) {
      try {
        rightJsonObj = JSON.parse(rightJson.value);
      } catch (e) {
        message.error('right json is not a valid json');
        return;
      }
    }
    if (isEmpty(leftJson.value) || isEmpty(rightJson.value)) {
      return;
    }
    diffResult.value = deepDiff(leftJsonObj, rightJsonObj);
    Object.keys(diffResult.value).forEach((key) => {
      console.log(get(leftJsonObj, key));
      console.log(get(rightJsonObj, key));
    });
  });
</script>

<template>
  <n-card>
    <div class="json-diff-view">
      <!-- 递归渲染对比结果 -->
      <JsonDiffNode :data="diffResult" />
    </div>
  </n-card>
</template>

<style scoped lang="scss"></style>
