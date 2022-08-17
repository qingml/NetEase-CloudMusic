<template>
  <div class="recommend-song__container">
    <h2 class="recommend-song__title">推荐歌单</h2>
    <div class="recommend-song__list">
      <div class="recommend-song__list--item" v-for="(item, index) in data" :key="index">
        <div class="recommend-song__list--item-wrap">
          <img :src="item.picUrl" />
          <div class="recommend-song__list--item-bottom">
            <span class="recommend-song__list--item-count">
              <i class="iconfont icon-erji"></i>
              <span>{{ formatNumber(item.playCount) }}</span>
            </span>
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="recommend-song__list--item-title" :title="item.name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { formatNumber } from '@/utils/number'

export interface IRecommendSongItem {
  picUrl: string;
  id: number;
  name: string;
  playCount: number;
  trackCount: number;
  alg: string;
}

defineProps({
  data: {
    type: Array as PropType<IRecommendSongItem[]>,
    default: () => [],
  },
});


</script>

<style lang="less">
.recommend-song {
  &__title {
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: bolder;
  }

  &__container {
    h2 {
      font-size: 16px;
    }
  }

  &__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;


    &--item {
      padding: 0 12px 24px 0;
      width: 12.5%;

      img {
        border-radius: 8px;
        height: 100%;
      }

      &-wrap {
        height: 132px;
        width: 100%;
        position: relative;
      }

      &-title {
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }

      &-bottom {
        background-color: rgb(16 22 26 / 35%);
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        color: #fff;
        width: 132px;
        font-size: 12px;
        border-radius: 8px;
        padding: 0 4px;
      }

      &-count {}
    }
  }
}
</style>
