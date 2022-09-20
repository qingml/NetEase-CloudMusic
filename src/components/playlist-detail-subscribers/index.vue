<template>
  <div class="playlist-detail-subscribers__container">
    <TopTitle :show-line="true" title="喜欢这个歌单的人" />
    <div class="playlist-detail-subscribers__block">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="playlist-detail-subscribers__block--item"
      >
        <div
          class="playlist-detail-subscribers__block--item-img"
          :title="item.nickname"
        >
          <img :src="item.avatarUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/base/top-title/index.vue";

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="less">
.playlist-detail-subscribers {
  &__container {
    background-color: #fff;
    width: 320px;
    height: 250px;
    padding: 15px 10px 15px;
    padding-bottom: 5px;
  }

  &__block {
    width: 300px;
    height: 170px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    &--item {
      width: 42px;
      height: 42px;
      overflow: hidden;
      cursor: pointer;

      &-img {
        img {
          width: 38px;
          height: 38px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
