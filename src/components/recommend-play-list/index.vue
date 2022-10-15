<template>
  <div class="recommend-play-list__container">
    <TopTitle title="歌单推荐" />
    <CuratePlaylist :data="data" />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import CuratePlaylist from "@/components/base/curate-playlist/index.vue";
import TopTitle from "@/components/base/top-title/index.vue";
import { IRecommendPlayItem } from "../base/curate-playlist/type";

defineProps({
  data: {
    type: Array as PropType<IRecommendPlayItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
@import "@/assets/base.css";
</style>
