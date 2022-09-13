<template>
  <div>
    <div class="featured-list__container" >
      <TopTitle :show-line="true" title="云音乐特色榜" />
      <CuratePlaylist :data="FeaturedListData" />
    </div>
    <div class="medai-list__container">
      <TopTitle :show-line="true" title="全球媒体榜" />
      <CuratePlaylist :data="MediaListData" />
    </div>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import {getRankTopList} from "@/api/rank-list"
  import TopTitle from "@/components/base/top-title/index.vue";
  import CuratePlaylist from  "@/components/base/curate-playlist/index.vue";

  import { IRecommendPlayItem} from  "@/components/base/curate-playlist/type";

  
  const FeaturedListData = ref<IRecommendPlayItem[]>([])
  const MediaListData = ref<IRecommendPlayItem[]>([])

  onMounted(async () => {
    const RankTopListRes = await getRankTopList();
   
    for(let i = 0; i < RankTopListRes.list.length; i++) {
      RankTopListRes.list[i].picUrl = RankTopListRes.list[i].coverImgUrl
    }
    FeaturedListData.value = RankTopListRes.list.slice(0,4)
    MediaListData.value = RankTopListRes.list.slice(4)
  })

 

</script>

<style scoped lang="less">
  .featured-list{
    &__container {
      padding-top:20px
    }
  }

</style>