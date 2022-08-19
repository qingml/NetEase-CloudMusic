<template>
  <TopBanner :data="bannerData" />
  <RecommendPlayList :data="recommendData" />
  <RecommendSong :data="songsData" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBanner, getRecommendPlaylist, getNewSongs } from "@/api/home";
import RecommendPlayList, {
  IRecommendPlayItem,
} from "@/components/recommend-play-list/index.vue";
import TopBanner, { IBannerItem } from "@/components/top-banner/index.vue";
import RecommendSong, {
  IRecommendSongItem,
} from "@/components/recommend-song/index.vue";

const recommendData = ref<IRecommendPlayItem[]>([]);
const bannerData = ref<IBannerItem[]>([]);
const songsData = ref<IRecommendSongItem[]>([]);

onMounted(async () => {
  const [bannerRes, playlistRes, newSongsRes] = await Promise.all([
    getBanner(),
    getRecommendPlaylist(),
    getNewSongs(9),
  ]);

  bannerData.value = bannerRes.banners;

  recommendData.value = playlistRes.result;

  songsData.value = newSongsRes.result;
});
</script>

<style scoped lang="less"></style>
