<template>
  <div class="playlist__container">
    <div class="playlist__operate-btns">
      <ElButton color="#fa2800" round>播放全部</ElButton>
      <ElButton color="#fa2800" round>收藏</ElButton>
    </div>
    <div class="playlist-content">
      <div class="playlist-content__item">
        <span class="playlist-content__item-index">序号</span>
        <span class="playlist-content__item-song">歌曲</span>
        <span class="playlist-content__item-singer">歌手</span>
        <span class="playlist-content__item-album">专辑</span>
        <span class="playlist-content__item-time">时长</span>
      </div>
      <div
        class="playlist-content__item"
        v-for="(item, index) in data"
        :key="index"
      >
        <span class="playlist-content__item-index">{{ index }}</span>
        <span class="playlist-content__item-song">
          <img :src="item.coverImg" />
          <span>{{ item.name }}</span>
        </span>
        <span class="playlist-content__item-singer">{{ item.singer }}</span>
        <span class="playlist-content__item-album ellipsis" :title="item.album">
          {{ item.album }}
        </span>
        <span class="playlist-content__item-time">{{ item.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from "element-plus";

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less">
.playlist {
  &__container {
    padding-top: 20px;
  }

  &__operate-btns {
    float: right;
  }

  &-content {
    overflow: hidden;
    width: 100%;
    padding-top: 20px;

    div:nth-child(2n - 1) {
      background-color: #f7f7f7;
    }

    div:hover {
      background-color: #ffe8e9;
    }

    &__item {
      display: flex;
      height: 50px;
      align-items: center;
			cursor: pointer;

      > span {
        padding: 0 16px;
      }

      &-index {
        width: 10%;
        text-align: center;
      }

      &-song {
        width: 40%;
        display: flex;
        align-items: center;

        img {
          width: 35px;
          height: 35px;
          border-radius: 5px;
          margin-right: 16px;
        }
      }

      &-singer {
        width: 25%;
      }

      &-album {
        width: 15%;
      }

      &-time {
        width: 10%;
      }
    }
  }
}
</style>
