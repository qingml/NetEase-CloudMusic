<template>
  <div class="recommend-song__container">
    <h2 class="recommend-song__title">新歌推荐</h2>

    <div class="recommend-song__block">
      <div
        v-for="(item, key) in data"
        :key="key"
        class="recommend-song__block--item"
      >
        <img :src="item.picUrl" class="recommend-song__block--item-pic" />
        <div class="recommend-song__block--item-content">
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.song.artists[0].name }}</div>
          </div>
          <div>{{ item.song.duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Artists {
  name: string;
  id: number;
  picId: number;
  picUrl: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}

export interface Song {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: number;
  disc: string;
  no: number;
  artists: Artists[];
  score: number;
  duration: number;
}

export interface IRecommendSongItem {
  id: number;
  type: number;
  name: string;
  picUrl: string;
  song: Song;
}

import { type PropType, defineProps } from "vue";

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

  &__title {
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: bolder;
  }

  &__block {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    cursor: pointer;

    &--item {
      display: flex;
      width: 33.3%;
      padding: 0 24px 28px 0;
      font-size: 14px;

      &-pic {
        width: 86px;
        height: 86px;
        margin-right: 16px;
      }

      &-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
