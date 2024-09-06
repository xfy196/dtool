<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core';
  import { computed } from 'vue';
  const { width, height } = useWindowSize();
  const list = [
    {
      name: 'Screen',
      infos: [
        {
          label: 'Screen Size',
          value: computed(
            () => `${window.screen.availWidth} x ${window.screen.availHeight}`
          )
        },
        {
          label: 'Orientation',
          value: computed(() => window.screen.orientation.type)
        },
        {
          label: 'Orientation angle',
          value: computed(() => window.screen.orientation.angle)
        },
        {
          label: 'Window Size',
          value: computed(() => `${width.value} x ${height.value}`)
        }
      ]
    }
  ];
</script>

<template>
  <div class="">
    {{ list }}
  </div>
</template>

<style lang="scss" scoped></style>
