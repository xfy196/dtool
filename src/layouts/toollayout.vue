<script setup lang="ts">
import sidler from './sidler.vue';
import Header from './header.vue';
</script>

<template>
  <n-layout has-sider> 
    <sidler/>
    <n-layout>
        <Header/>
        <n-layout-content content-style="padding: 24px;">
            <RouterView/>
        </n-layout-content>
        <!-- <n-layout-footer>成府路</n-layout-footer> -->
      </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped></style>
