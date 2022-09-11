<template>
  <div class="recommend-song__container">
    <TopTitle title="新歌推荐" />
    <SongList :data="data" />
  </div>
</template>

<script setup lang="ts">
import SongList from "@/componets/base/song-list/index.vue";
import TopTitle from "@/componets/base/top-title/index.vue";

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
