<template>
  <div>歌单详情页面啦啦啦啦{{ currentRoute.params.id }}</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const { currentRoute } = useRouter();

console.log("router", currentRoute.value.params.id);
</script>
