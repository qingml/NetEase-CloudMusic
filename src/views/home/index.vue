<template>
  <TopBanner :data="bannerData" />
  <RecommendPlayList :data="recommendData" />
  <RecommendSong :data="songsData" />
  <RecommendSingers :data="singersData"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBanner, getRecommendPlaylist, getNewSongs, getHotSingers } from "@/api/home";
import RecommendPlayList, {
  IRecommendPlayItem,
} from "@/components/recommend-play-list/index.vue";
import TopBanner, { IBannerItem } from "@/components/top-banner/index.vue";
import RecommendSong, {
  IRecommendSongItem,
} from "@/components/recommend-song/index.vue";
import RecommendSingers,{IRecommendSingersItem} from "@/components/recommend-singers/index.vue"
const recommendData = ref<IRecommendPlayItem[]>([]);
const bannerData = ref<IBannerItem[]>([]);
const songsData = ref<IRecommendSongItem[]>([]);
const singersData = ref<IRecommendSingersItem[]>([]);

onMounted(async () => {
  const [bannerRes, playlistRes, newSongsRes, hotSingerRes] = await Promise.all([
    getBanner(),
    getRecommendPlaylist(),
    getNewSongs(9),
    getHotSingers()
  ]);

  bannerData.value = bannerRes.banners;

  recommendData.value = playlistRes.result;

  songsData.value = newSongsRes.result;

  singersData.value = hotSingerRes.artists;
});
</script>

<style scoped lang="less"></style>
