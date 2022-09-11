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
            {{ formatDuration(formatSecond(item.song.duration)) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IRecommendSongItem } from "./type";
import { formatDuration, formatSecond } from "@/utils/number";

defineProps({
  data: {
    type: Array as PropType<IRecommendSongItem[]>,
    default: () => [],
  },
});
</script>
