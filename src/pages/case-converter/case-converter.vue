<script setup lang="ts">
  import InputCopy from '@/components/InputCopy.vue';
  import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    kebabCase,
    noCase,
    pascalCase,
    pascalSnakeCase,
    pathCase,
    sentenceCase,
    snakeCase,
    trainCase
  } from 'change-case';
  import { computed, ref } from 'vue';
  const inputValue = ref('hello world');
  const formats = computed(() => [
    {
      label: 'Lowercase',
      value: inputValue.value.toLocaleLowerCase()
    },
    {
      label: 'Uppercase',
      value: inputValue.value.toLocaleUpperCase()
    },
    {
      label: 'CamelCase',
      value: camelCase(inputValue.value)
    },
    {
      label: 'CapitalCase',
      value: capitalCase(inputValue.value)
    },
    {
      label: 'ConstantCase',
      value: constantCase(inputValue.value)
    },
    {
      label: 'DotCase',
      value: dotCase(inputValue.value)
    },
    {
      label: 'KebabCase',
      value: kebabCase(inputValue.value)
    },
    {
      label: 'NoCases',
      value: noCase(inputValue.value)
    },
    {
      label: 'PascalCase',
      value: pascalCase(inputValue.value)
    },
    {
      label: 'PascalCase',
      value: pascalSnakeCase(inputValue.value)
    },
    {
      label: 'PathCase',
      value: pathCase(inputValue.value)
    },
    {
      label: 'SentenceCase',
      value: sentenceCase(inputValue.value)
    },
    {
      label: 'SnakeCase	',
      value: snakeCase(inputValue.value)
    },
    {
      label: 'TrainCase	',
      value: trainCase(inputValue.value)
    },
    {
      label: 'Mockingcase',
      value: inputValue.value
        .split('')
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join('')
    }
  ]);
</script>

<template>
  <n-card>
    <n-form-item
      :show-feedback="false"
      :label-width="110"
      label-placement="left"
      label="内容"
    >
      <n-input v-model:value="inputValue" placeholder="请输入内容"></n-input>
    </n-form-item>
    <n-divider />
    <template v-for="item in formats" :key="item.label">
      <n-form-item
        class="mt-2"
        :show-feedback="false"
        :label-width="110"
        label-placement="left"
        :label="item.label"
      >
        <InputCopy :value="item.value" placeholder="请输入内容" />
      </n-form-item>
    </template>
  </n-card>
</template>

<style lang="scss" scoped></style>
