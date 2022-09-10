<template>
  <h2 class="top-title">{{ title }}</h2>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less">
.top-title {
  padding-bottom: 16px;
  font-weight: bolder;
  font-size: 16px;
}
</style>
