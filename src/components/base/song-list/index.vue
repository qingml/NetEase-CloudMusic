<template>
  <div class="recommend-song__block">
    <div
      v-for="(item, key) in data"
      :key="key"
      class="recommend-song__block--item"
    >
      <div class="recommend-song__block--item-box">
        <img :src="item.picUrl" class="recommend-song__block--item-pic" />
        <div class="recommend-song__block--item-content">
          <div class="recommend-song__block--item-info">
            <div class="recommend-song__block--item-title">
              {{ item.name }}
            </div>
            <div class="recommend-song__block--item-name">
              {{ item.song.artists.map((it) => it.name).join(" / ") }}
            </div>
          </div>
          <div class="recommend-song__block--item-time">
            {{ formatDurationPlay(formatSecond(item.song.duration)) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IRecommendSongItem } from "./type";
import { formatDurationPlay, formatSecond } from "@/utils/number";

defineProps({
  data: {
    type: Array as PropType<IRecommendSongItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
  .recommend-song {
  
    &__block {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      cursor: pointer;
  
      &--item {
        width: 33.33%;
  
        &-box {
          border-top: 1px solid #f2f2f2;
          display: flex;
          padding: 12px 0;
          margin-right: 24px;
        }
  
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
  
        &-info {
          font-size: 14px;
          font-weight: 600;
        }
  
        &-name {
          font-weight: 500;
          color: #999;
        }
  
        &-title {
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
  </style>
  
