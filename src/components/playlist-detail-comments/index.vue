<template>
<div class="playlist-detail-comments__container">
  <TopTitle :show-line="true" title="精彩评论" />
  <div class="playlist-detail-comments__block">
    <div
    v-for="(item,index) in data"
    :key = 'index'
    class="playlist-detail-comments__block--item"
    >
      <img :src="item.user.avatarUrl" class="playlist-detail-comments__block--item-img">
      <div class="playlist-detail-comments__block--item-info">
        <h2 class="playlist-detail-comments__block--item-info-commentor">{{item.user.nickname}} 
          <span>•{{dateDifference(item.time) }}月前</span>
        </h2>
        
        <p class="playlist-detail-comments__block--item-info-content">{{item.content}}</p>
      </div>
    </div>

  </div>
</div>
</template>
<script setup>
import TopTitle from "@/components/base/top-title/index.vue";
import { dateDifference } from "@/utils/number";

defineProps({
  data:{
    type:Array,
    default:()=>[],
  }
});

</script>

<style lang="less">
  .playlist-detail-comments{
    &__container {
      width: 320px;
     
      padding: 15px 10px 15px;
    }
    &__block{
      width: 300px;
      display: flex;
      flex-direction:column;
      flex-wrap: nowrap;
      justify-content: space-between;
      box-sizing: border-box;

      &--item{
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        &-img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
        &-info{
          display: flex;
          flex-direction: column;
          padding-left: 15px;

          &-commentor{
            font-size: 15px;
            span{
              font-size: 12px;
              color: #a5a5c1;
            }
            
          }

          &-content{
            display: block;
            width: 240px;
            margin-top: 10px;
            background-color: #f5f5f5;
            padding: 5px 10px 5px 10px;
            
            font-size: 12px;
            border-radius: 5px;
            color: #666;

          }
        }
        
      }
      
    }
  }

</style>