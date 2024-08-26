<script setup lang='ts'>
import FavoriteButton from '@/components/FavoriteButton.vue';
import { watch } from 'vue';
import {useRoute} from "vue-router";
const route = useRoute();
watch(() => route.meta, (val) => {
    console.log("🚀 ~ watch ~ val:", val)
    
}, {
    deep: true,
    immediate: true
})
</script>

<template>
<div class="">
    uuid
    {{ route.meta.description }}
    <FavoriteButton/>
</div>
</template>

<style lang="scss" scoped></style>