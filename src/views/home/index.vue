<template>
  <TopBanner :data="bannerData" />
  <RecommendPlayList :data="recommendData" />
  <RecommendSong :data="songsData" />
  <RecommendSingers :data="singersData" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getBanner,
  getRecommendPlaylist,
  getNewSongs,
  getHotSingers,
} from "@/api/home";
import RecommendPlayList from "@/components/recommend-play-list/index.vue";
import TopBanner, { IBannerItem } from "@/components/top-banner/index.vue";
import RecommendSong from "@/components/recommend-song/index.vue";
import RecommendSingers from "@/components/recommend-singers/index.vue";

import { IRecommendSongItem } from "@/components/base/song-list/type";
import { IRecommendPlayItem} from  "@/components/base/curate-playlist/type"
import {IRecommendSingersItem} from "@/components/base/singers/type"

const recommendData = ref<IRecommendPlayItem[]>([]);
const bannerData = ref<IBannerItem[]>([]);
const songsData = ref<IRecommendSongItem[]>([]);
const singersData = ref<IRecommendSingersItem[]>([]);

onMounted(async () => {
  const [bannerRes, playlistRes, newSongsRes, hotSingerRes] = await Promise.all(
    [getBanner(), getRecommendPlaylist(), getNewSongs(9), getHotSingers()]
  );

  bannerData.value = bannerRes.banners;

  recommendData.value = playlistRes.result;

  songsData.value = newSongsRes.result;

  singersData.value = hotSingerRes.artists;
});
</script>

<style scoped lang="less"></style>
