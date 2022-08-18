
<template>
  <TopBanner :data="bannerData" />
  <RecommendSongs :data="recommendData" />
</template>

<script setup lang="ts">
import { getBanner, getRecommendPlaylist } from "@/api/home";
import { onMounted, ref } from "vue";
import RecommendSongs, { IRecommendSongItem } from "@/components/recommend-songs/index.vue";
import TopBanner, { IBannerItem } from "@/components/top-banner/index.vue";

const recommendData = ref<IRecommendSongItem[]>([])
const bannerData = ref<IBannerItem[]>([])

onMounted(async () => {
  //todo  promise.all 收敛
  const bannerRes = await getBanner() as any;
  bannerData.value = bannerRes.banners

  const playlistRes = await getRecommendPlaylist() as any;
  recommendData.value = playlistRes.result
});
</script>

<style scoped lang="less">
</style>
