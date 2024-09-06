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
          label: 'Color depth',
          value: computed(() => `${window.screen.colorDepth} bits`)
        },
        {
          label: 'Pixel ratio',
          value: computed(() => `${window.devicePixelRatio} dppx`)
        },
        {
          label: 'Window Size',
          value: computed(() => `${width.value} x ${height.value}`)
        }
      ]
    },
    {
      name: 'Device',
      infos: [
        {
          label: 'Browser vendor',
          value: computed(() => navigator.vendor)
        },
        {
          label: 'Languages',
          value: computed(() => navigator.languages.join(', '))
        },
        {
          label: 'Platform',
          value: computed(() => navigator.platform)
        },
        {
          label: 'User agent',
          value: computed(() => navigator.userAgent)
        }
      ]
    }
  ];
</script>

<template>
  <n-card v-for="(card, index) in list" :key="card.name" :title="card.name">
    <n-grid :x-gap="8" :y-gap="8" :cols="2">
      <n-grid-item v-for="(info, idx) in card.infos" :key="info.label">
        <div
          class="flex flex-col justify-center p-4 bg-opacity-50 rounded bg-zinc-100"
        >
          <span class="text-sm text-zinc-600">
            {{ info.label }}
          </span>
          <n-tooltip
            v-if="index === list.length - 1 && idx === card.infos.length - 1"
            :style="{ maxWidth: '320px' }"
            trigger="hover"
          >
            <template #trigger>
              <n-text class="text-xl truncate">
                {{ info.value }}
              </n-text>
            </template>
            {{ info.value }}
          </n-tooltip>
          <n-text v-else class="text-xl truncate">
            {{ info.value }}
          </n-text>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<style lang="scss" scoped></style>
