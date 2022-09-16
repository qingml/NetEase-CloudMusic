<template>
  <div class="mv__block">
    <div 
    class="mv__block--item"
    v-for="(item,index) in data"
    :key="index"
    >
      <div class="mv__block--item-wrap">
        <img :src="item.imgurl" >
        <div class="mv__block--item-top">
          <span class="mv__block--item-count"> 
            <i class="iconfont icon-bofang"></i>
            <span> {{formatNumber(item.playCount)}}</span>
          </span>
        </div>
        <div class="mv__block--item-middle">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="mv__block--item-bottom">
          <span class="mv__block--item-bottom-left"> {{item.artistName}}</span>
          <span class="mv__block--item-bottom-right">{{formatDurationMv(item.duration)}}</span>
        </div>
      </div>
      <div class="mv__block--item-title  ellipsis">
        {{item.name}}
      </div>
    </div>

  </div>
</template>

<script setup >
import { useRouter } from "vue-router";

import { formatNumber,formatDurationMv} from "@/utils/number";

defineProps({
  data:{
    type:Array,
    default:()=>[],
  }
})
</script>

<style lang="less" >
.mv {
  &__block{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 20px;
    padding-right:20px;
  

    &--item {
      padding: 20px 0 20px 0;
      width: 25%;
      
      img{
        width: 90%;
        height: 100%;
      }
      &-wrap{
        height: 160px;
        width: 100%;
        position: relative;

        &:hover{
          &-middle{
            display: inline-block;
            background: red;
            top:0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
      }
      }
      &-middle{
        display: none;
      }
      &-title{
        padding-top:6px;
        font-size: 14px;
        width: 90%;
        
      }
      &-bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20%;
        position: absolute;
        width: 90%;
        bottom: 0;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        background: rgba(0,0,0,0.6);
      
        &-left{
          padding-left: 10px;
        }
        &-right{
          padding-right: 10px;
        }
      }
      &-top{
        position:absolute;
        top:3px ;
        right: 35px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        background: black;
        margin-right: 7px;
        display: flex;
        align-items: center;
        padding-left: 7px;
        padding-right:7px;
       
        
      }
      &-count {
        display: flex;
        justify-content: space-between;

        span{
          padding-left: 3px;
        }
      }

    }
  }
  
}

</style>