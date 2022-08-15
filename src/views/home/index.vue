<template>
  <div>home</div>
</template>



<script setup lang="ts">
import { getRecommendPlaylist } from "@/api/home";
import { onMounted } from "vue";

onMounted(async () => {
  const resp = await getRecommendPlaylist();
  console.log("RecommendPlaylist", resp);
});
</script>


<style scoped lang="less">
</style>
