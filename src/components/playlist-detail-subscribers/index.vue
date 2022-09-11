<template>
  <div class="playlist-detail-subscribers-container">
    <div class="playlist-detail-subscribers__block">
      <h4 class="playlist-detail-subscribers__block-title">喜欢这个歌单的人</h4>
      <div class="playlist-detail-subscribers__block-box">
        <div 
        v-for="(item,index) in data"
        :key="index"
        class="playlist-detail-subscribers__block--item"
        >
          <div class="playlist-detail-subscribers__block--item-img">
            <img :src="item.avatarUrl" />
          </div>
          <P class="playlist-detail-subscribers__block--item-nickname">{{item.nickname}}</P>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
});
</script>
<style lang="less">
  .playlist-detail-subscribers{
    &-container{
      width: 320px;
      height: 250px;
      padding: 10px 10px 10px;
      padding-bottom: 5px;
      // background-color: #ffffff;
      // border-radius: 5px;
    }
    &__block{  
      width: 300px;
      height: 230px;
      &-title{
        font-weight: bold;
        padding-bottom: 15px;
      }
      &-box{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between
      }
      
      &--item{
        width: 42px;
        height: 42px;
        overflow: hidden;
  
        &-img{
          

          img{
          width: 38px;
          height: 38px;
          border-radius: 5px;
          }
        &-nickname{
          display: none;
        }

        }

        
      }
    }

  }

</style>