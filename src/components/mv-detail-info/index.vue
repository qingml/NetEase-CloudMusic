<template>
  <div class="mv-detail-info__container">
    <div class="mv-detail-info-vedio">
      <video autoplay="autoplay"  :src="infoData.url" controls="controls" controlslist="nodownload" class="vedio"></video>
    </div>
    <div class="mv-detail-info-descri">
      <i class=" iconfont icon-mv"></i>
      <h2 class="mv-detail-info-name">{{ descriData.name}}</h2>
    </div>
    <div class="mv-detail-info-other">
      <span class="publish">发布：{{descriData.publishTime}}</span>
      <!-- <span>播放次数：{{formatNumber(descriData.playCount)}}</span> -->
    </div>
    <div class="mv-detail-info-count">
      <div class="likeCount">
        <i class="iconfont icon-like"></i>
        <span>{{descriData.shareCount}}</span>
      </div>
      <div class="collectCount">
        <i class="iconfont icon-collect"></i>
        <span>{{descriData.subCount}}</span>
      </div>
      <div class="shareCount">
        <i class="iconfont icon-share"></i>
        <span>{{countData.likedCount}}</span>
      </div>
    </div>
    <div class="mv-detail-info-foot">
      <i class="iconfont icon-pinglun1"></i>
       Comments | 
      <span><a href="">{{descriData.commentCount}}评论</a></span>
    </div>
  </div>
</template>

<script setup>
 import {formatNumber}  from '@/utils/number.ts'
defineProps({
    infoData: {
      type: Object,
      default: () => ({}),
    },
    descriData: {
      type: Object,
      default: () => ({}),
    },
    countData: {
      type: Object,
      default: () => ({}),
    },
  });
  </script>

<style lang="less">
.mv-detail-info {
  &__container {
    background-color:#fff;
    display:flex;
    flex-direction: column;
    padding: 20px 15px;
  
    //flex-direction:clomun
   
  }
  &-vedio {
    position:relative;
    height:450px;
    width: 100%;
   
    .vedio {
      object-fit: fill;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      background-color: #000;
    }
  }

  &-descri{
    display: flex;
    padding: 10px 0;
    flex-direction: row;
    align-items: center;

    i {
      padding-right:5px;
      color: var(--vt-c-text-light-2);
    }
    
    h2 {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-other{
    display: flex;
    flex-direction: row;

    span{
      font-size: 12px;
      color: #999;
      font-weight: 400;
    }

    .publish{
      padding-right:30px;
    }
  }
  
  &-count{
    display: flex;
    flex-direction: row;
    padding-top:10px;
    
    div{
     border-radius: 15px;
     width: auto;
     padding:0 15px 0 20px;
     background: #f2f2f2;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #161e27;
      cursor: pointer;
      height: 40px;
    
    }

    span{
      padding-left:3px;
      font-size: 14px;
      font-weight: 400;
    }
  }

  &-foot {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:30px 0 10px 0;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 3px;
    border-bottom: 1px solid #f1f1f1;

    i{
      padding-right: 13px;
    }

    span{
      padding-left: 4px;
    }

    
  }
   
    

}

</style>