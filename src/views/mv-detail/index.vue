<template>
  <div class="mv-detail-whole">
    <div class="mv-detail-left">
      <MvDetailInfo :infoData="mvDetailData" :descriData="mvDescriData" :countData="mvRelatedCountData" />
      <PlaylistDetailComments :isMv="true" />
    </div>
    <div class="mv-detail-right">
      <playlistDetailSubcibers :isMvDescri="true" :mvDescriData="mvBriefDescriData" />
      <MvRecommend :data="mvRecommendData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import { getMVDetailCount, getMVDetailDesc, getMVDetailInfo, getMVRecommend} from "@/api/mv-detail"

import MvDetailInfo from "../../components/mv-detail-info/index.vue";
import playlistDetailSubcibers from "@/components/playlist-detail-subscribers/index.vue"
import MvRecommend from "../../components/mv-recommend/index.vue"


const { currentRoute } = useRouter();
const mvId = currentRoute?.value?.params?.id as string;

const mvDetailData = ref({});
const mvDescriData = ref({});
const mvRelatedCountData = ref({})
const mvBriefDescriData = ref('')
const mvRecommendData = ref([])

const queryMVDetailData = async (albumId:string) => {
  const[mvDetailDataRes,mvDescriRes,mvRelatedCountRes,mvRecommendRes] = await Promise.all([
    getMVDetailInfo(mvId),
    getMVDetailDesc(mvId),
    getMVDetailCount(mvId),
    getMVRecommend(mvId)
  ])
  
  mvDetailData.value = mvDetailDataRes?.data
  mvDescriData.value = mvDescriRes?.data
  mvRelatedCountData.value = mvRelatedCountRes
  mvBriefDescriData.value = mvDescriRes?.data.briefDesc.length?mvDescriRes.data.briefDesc:'视频暂无简介'
  mvRecommendData.value = mvRecommendRes?.mvs
}


onMounted(() => queryMVDetailData(mvId));



</script>

<style lang="less">
.mv-detail {
  &-whole{
    display: flex;
  }

  &-left {
    width: 960px;
    padding-right: 32px;
  }
  &-right {
    width: 320px;

    flex-direction: column;
  }
}
</style>