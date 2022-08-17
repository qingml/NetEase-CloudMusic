
<template>
  <h1>swiper 轮播图</h1>

  <RecommendSongs :data="recommendData" />
</template>

<script setup lang="ts">
import { getRecommendPlaylist } from "@/api/home";
import { onMounted, ref } from "vue";
import RecommendSongs, { IRecommendSongItem } from "@/components/recommend-songs/index.vue";

const recommendData = ref<IRecommendSongItem[]>([])

onMounted(async () => {
  const resp = await getRecommendPlaylist() as any;
  console.log('resp', resp)
  recommendData.value = resp.result
});
</script>

<style scoped lang="less">
</style>
