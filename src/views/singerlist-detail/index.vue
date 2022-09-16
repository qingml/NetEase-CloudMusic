<template>
  <div class="singerlist-detail-whole">
    <div class="singerlist-detail-top">
      <SingerInfo :data="singerInfoData" />
    </div>
    <div class="singerlist-detail-bottom">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="作品" name="first">
          <Playlist :data="singerPlaylistData" :hasCollect="false" />
        </el-tab-pane>
        <el-tab-pane label="专辑" name="second"> Config </el-tab-pane>
        <el-tab-pane label="MV" name="third">Role </el-tab-pane>
        <el-tab-pane label="歌手详情" name="fourth">
          <SingerIntro :data="singerIntroductionData" />
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="fifth">
          <SimSingers :data="simSingerData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import SingerInfo from "@/components/singer-detail-info/index.vue";
import {
  getSingerDetailInfo,
  getSingerIntroduction,
  getSimSingerDetail,
} from "@/api/singerlist-detail";
import Playlist from "@/components/base/playlist/index.vue";
import SimSingers from "@/components/base/singers/index.vue";
import SingerIntro from "@/components/singers-introduction/index.vue";

const { currentRoute } = useRouter();
const singerId = currentRoute?.value?.params?.id as string;
const activeName = ref("first");

const singerInfoData = ref({});
const singerPlaylistData = ref([]);
const simSingerData = ref([]);
const singerIntroductionData = ref({});

onMounted(async () => {
  const [singerInfoRes, simSingerRes, singerIntroductionRes] =
    await Promise.all([
      getSingerDetailInfo(singerId),
      getSimSingerDetail(singerId),
      getSingerIntroduction(singerId),
    ]);

  singerInfoData.value = singerInfoRes.artist;
  singerPlaylistData.value = singerInfoRes.hotSongs.map((songItem: any) => ({
    ...songItem,
    name: songItem.name,
    coverImg: songItem.al.picUrl,
    singer: songItem.ar.map((arItem: any) => arItem.name).join(" / "),
    album: songItem.al.name,
  }));

  simSingerData.value = simSingerRes.artists;
  singerIntroductionData.value = singerIntroductionRes;
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

    .demo-tabs {
      padding-top: 20px;

      .el-tabs__nav-wrap::after {
        display: none;
      }

      .el-tabs__nav {
        width: 560px;
        float: none;
        display: flex;
        justify-content: space-around;
        margin: auto;

        .el-tabs__item.is-active {
          color: #fa2800;
        }

        .el-tabs__item:hover {
          color: #fa2800;
        }

        .el-tabs__active-bar {
          background-color: #fa2800;
        }
      }
    }
  }
}
</style>
