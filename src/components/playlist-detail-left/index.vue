<template>
<div class="playlist-detail-left_container">
  <div class="playlist-detail-left_intorduction">
    <!-- <img :src="data.coverImgUrl" class="playlist-detail-left_intorduction-img">  -->
    <div class="playlist-detail-left_intorduction-content">
      <div class="playlist-detail-left_intorduction-title">{{data.name}}</div>
      <div class="playlist-detail-left_intorduction-creator">
        <img :src="data." class="playlist-detail-left_intorduction-creator-avatar">
        <p class="playlist-detail-left_intorduction-creator-nickname">{{}}</p>
        <p class="playlist-detail-left_intorduction-creator-data">{{}}</p>
      </div>
      <div class="playlist-detail-left_intorduction-creator-tags"></div>
      <div class="playlist-detail-left_intorduction-description">{{data.description}}</div>

    </div>
  </div>
</div>
</template>
<script setup lang="ts">
  import { type PropType } from "vue";

  export interface IPlaylistDetailLeftItem {
  coverImgUrl: string;
  description: string;
  name: string;
  tags: [string];
  
  
}


  defineProps({
    data: {
      type: Array as PropType<IPlaylistDetailLeftItem[]>,
      default: () => [],
    },
  });
</script>

<style lang="less">

  .playlist-detail-left_intorduction{
    padding-top: 15px;
    height: 210px;

    &-img{
      float: left;
      width: 200px;
    }
    &-content{
      // float: right;
    }

  }



</style>