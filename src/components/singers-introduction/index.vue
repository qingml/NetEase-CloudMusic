<template>
  <div class="singer-detail-introduction__container">
    <div class="singer-detail-introduction__container-brefdescription">
      <h2 class='singer-detail-introduction__container-brefdescription-title'> 简介</h2>
      <div class="singer-detail-introduction__container-brefdescription-content"> {{data.briefDesc}}</div>
    </div>
    <div class="singer-detail-introduction__container-introduction">
      <div class="singer-detail-introduction__container-introduction--item"
      v-for="(item,index) in data.introduction"
      :key="index"
      >
      <h3 class="singer-detail-introduction__container-introduction--item-title" >{{item.ti}}</h3>
      <p class="singer-detail-introduction__container-introduction--item-introdetail">{{item.txt}}</p>
      </div>
    </div>

  </div>
</template>
<script setup>
  


  defineProps({
    data: {
      type:Object,
      default:""
    },
   
  })

</script>

<style lang="less">
.singer-detail-introduction{
  &__container{
    &-brefdescription{
      margin-top: 30px;
      text-align: center;
      padding: 15px;
      &-title{    
        font-weight: 500px;
        font-size: 16px;
        margin-bottom: 30px;
     
      } 
      &-content{
        line-height: 1.7;
        margin-bottom: 20px;
        font-size: 14px;
      }
    }
    &-introduction{
      padding: 15px;
    }
  }
}
</style>