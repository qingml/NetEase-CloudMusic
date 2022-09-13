<template>
  <div class="recommend-song__container">
    <TopTitle title="新歌推荐" />
    <SongList :data="data" />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import TopTitle from "@/components/base/top-title/index.vue";
import SongList from "@/components/base/song-list/index.vue";
import { IRecommendSongItem } from "../base/song-list/type";

defineProps({
  data: {
    type: Array as PropType<IRecommendSongItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
.recommend-song {
  &__container {
    width: 100%;
  }

 
}
</style>
