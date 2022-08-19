<template>
  <div class="recommend-play-list__container">
    <h2 class="recommend-play-list__title">歌单推荐</h2>
    <div class="recommend-play-list__block">
      <div
        class="recommend-play-list__block--item"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="recommend-play-list__block--item-wrap">
          <img :src="item.picUrl" />
          <div class="recommend-play-list__block--item-bottom">
            <span class="recommend-play-list__block--item-count">
              <i class="iconfont icon-erji"></i>
              <span>{{ formatNumber(item.playCount) }}</span>
            </span>
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="recommend-play-list__block--item-title" :title="item.name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { formatNumber } from "@/utils/number";

export interface IRecommendPlayItem {
  picUrl: string;
  id: number;
  name: string;
  playCount: number;
  trackCount: number;
  alg: string;
}

defineProps({
  data: {
    type: Array as PropType<IRecommendPlayItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
@import "@/assets/base.css";

.recommend-play-list {
  &__title {
    padding-bottom: 16px;
    // font-size: 16px;
    font-weight: bolder;
  }

  &__container {
    h2 {
      font-size: 16px;
    }
  }

  &__block {
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
        height: 136px;
        width: 100%;
        position: relative;
      }

      &-title {
        padding-top: 6px;
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
        width: 136px;
        &:hover {
          color: var(--color-text-red);
        }
      }

      &-bottom {
        background-color: rgb(16 22 26 / 35%);
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        color: #fff;
        width: 136px;
        font-size: 12px;
        border-radius: 8px;
        padding: 0 4px;
      }
    }
  }
}
</style>
