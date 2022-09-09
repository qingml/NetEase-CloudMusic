<template>
  <div class="recommend-singers__container">
    <h2 class="recommend-singers__title">推荐歌手</h2>
    <ul class="recommend-singers__block">
      <li  v-for="(item, index) in data"
        :key="index"
        class="recommend-singers__block--item">
        <div class="recommend-singers__block--item-cover">
          <div class="image">
            <div class="el-image">
              <img :src="item.img1v1Url" class="img-inner" >
            </div>
          </div> 
        </div>
        <div class="recommend-singers__block--item-info">
          <p class="singername">{{item.name}}</p>
          <p class="playcount">单曲数{{item.musicSize}}</p>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { formatNumber } from "@/utils/number";
//import { it } from "node:test";

export interface IRecommendSingersItem {
  img1v1Url: string;
  name: string;
  musicSize: number;
}

defineProps({
  data: {
    type: Array as PropType<IRecommendSingersItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
//@import "@/assets/base.css";

.recommend-singers {
  &__container {
    margin-top: 40px;
    box-sizing: border-box;
    display: block;
  }

  &__title {
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: bolder;
  }

  &__block {
    display: flex;
    flex-wrap: wrap;
    margin: 5px -55px 0;
    margin-right:0;
    
    &--item {
      padding:0 15px 30px;
      flex: 0 0 10%;
      max-width: 10%;
      list-style: none;

      &-cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 50%;
        background-color: #d9d9d9;
      }
      &-cover .image {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       border-radius: 50%;
       overflow: hidden;
      }
      &-cover .image .el-image {
        width: 100%;
        height: 100%;
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      &-cover .image .el-image .img-inner {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
      &-info {
        margin-top: 15px;
        text-align: center;
      }
      &-info .singername{
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-info .playcount {
        font-size: 14px;
        margin-top: 10px;
        color: #fa2800;;
       
      }
    }
  }
}
</style>
