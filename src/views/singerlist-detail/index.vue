<template>
  <div class="singerlist-detail-whole">
    <div class="singerlist-detail-top">
      <SingerInfo :data="singerInfoData" />
    </div>
    <div class="singerlist-detail-bottom">
      <el-tabs v-model="activeName" class="singer-detail-nav-title">
        <el-tab-pane label="作品" name="work">
          <Playlist :data="singerPlaylistData" :hasCollect="false" />
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album"> Config </el-tab-pane>
        <el-tab-pane label="MV" name="mv">
          <MV :data="singerMvData"/>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="singerDetai">
          <SingerIntro :data="singerIntroductionData" />
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="simSinger">
          <SimSingers :data="simSingerData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter,onBeforeRouteUpdate  } from "vue-router";

import SingerInfo from "@/components/singer-detail-info/index.vue";
import {
  getSingerDetailInfo,
  getSingerIntroduction,
  getSimSingerDetail,
  getSingerMV,
} from "@/api/singerlist-detail";
import Playlist from "@/components/base/playlist/index.vue";
import SimSingers from "@/components/base/singers/index.vue";
import SingerIntro from "@/components/singers-introduction/index.vue";
import MV from "@/components/base/mv/index.vue"

const { currentRoute } = useRouter();
const singerId = currentRoute?.value?.params?.id as string;
const activeName = ref("work");

const singerInfoData = ref({});
const singerPlaylistData = ref([]);
const simSingerData = ref([]);
const singerIntroductionData = ref({});
const singerMvData = ref([]);

const queryPlayListData = async (singerId: string) => {
  const [
      singerInfoRes, 
      simSingerRes,
      singerIntroductionRes,
      singerMVRes
  ] = await Promise.all([
      getSingerDetailInfo(singerId),
      getSimSingerDetail(singerId),
      getSingerIntroduction(singerId),
      getSingerMV(singerId),
  ]);
  
  singerInfoData.value = singerInfoRes.artist;
  singerPlaylistData.value = singerInfoRes.hotSongs.map((songItem: any) => ({
    ...songItem,
    name: songItem.name,
    coverImg: songItem.al.picUrl,
    singer: songItem.ar.map((arItem: any) => arItem.name).join(" / "),
    album: songItem.al.name,
  }));
  activeName.value = 'work'
  simSingerData.value = simSingerRes.artists;
  singerIntroductionData.value = singerIntroductionRes;
  singerMvData.value = singerMVRes.mvs
};

onMounted(()=>queryPlayListData(singerId));

onBeforeRouteUpdate(async (to, from) => {
 
  if (to.params.id !== from.params.id) {
    queryPlayListData(to.params.id as string);
  }
});

</script>

<style lang="less">
.singerlist-detail {
  &-top {
    width: 1280px;
    height: 550px;
    background: url(/img/top-bg.5c3d6989.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  &-top::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-top: 90px solid transparent;
    border-right: 640px solid #fff;
    border-left: 640px solid #fff;
    bottom: 0;
  }
  &-bottom {
    margin-bottom: 100px;
    //padding-left: 30px;
   // padding-right: 30px;
  //  text-align: center;
    .singer-detail-nav-title {
      padding-top: 20px;

      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item{
        font-weight: bold;
      }

      .el-tabs__nav {
        width: 560px;
        float: none;
        display: flex;
        justify-content: space-around;
        margin: auto;
      
        .el-tabs__item.is-active {
          color:  var(--color-text-red);
        }

        .el-tabs__item:hover {
          color:  var(--color-text-red);
        }

        .el-tabs__active-bar {
          background-color:  var(--color-text-red);
        }
        
      }
    }
  }
}
</style>
