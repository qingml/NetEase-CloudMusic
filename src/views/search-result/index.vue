<template>
  <div class="search-result-detail">
    <div class="search-result-banner-container">
      <div class="search-area">
        <div class="search-box">
          <ElInput
            size="large"
            placeholder="搜索音乐/MV/歌单/歌手"
            :suffix-icon="Search"
            v-model="searchWord"
            @keyup="handleInput"
          />
        </div>
      </div>
    </div>
    <div class="main-container">
      <span class="span-wrapper">搜索结果</span>
      <div class="wrapper">
        <el-tabs v-model="activeName" class="search-detail-nav-title">
          <el-tab-pane label="单曲" name="song">
            <Playlist :data="playListData" :hasCollect="false" />
          </el-tab-pane>
          <el-tab-pane label="歌手" name="singer">
            <SimSingers :data="singerData" /> 
          </el-tab-pane>
          <el-tab-pane label="专辑" name="ablum">
            <Album :data='ablumData'/> 
          </el-tab-pane>
          <el-tab-pane label="视频" name="vedio">
            <MV :data="vedioData" />
          </el-tab-pane>
          <el-tab-pane label="歌单" name="songlist">
            <!-- <SimSingers :data="" /> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import { ElInput } from "element-plus";
import { Search } from "@element-plus/icons-vue";

import { getSearchSongDetail } from "@/api/search-result";

import Playlist from "@/components/base/playlist/index.vue";
import SimSingers from "@/components/base/singers/index.vue";
import MV from "@/components/base/mv/index.vue";
import Album from "@/components/base/album/index.vue";
import { formatSong } from "@/utils/song";

const searchHistoryTag = ref(JSON.parse(window.localStorage.searchHistory));

const { currentRoute } = useRouter();
const activeName = ref("song");
const playListData = ref([])
const singerData = ref([])
const ablumData = ref([])
const vedioData = ref([])
const songlistData = ref([])
// const searchKey = currentRoute?.value?.params?.keyword as string;

const keyword = String(currentRoute?.value?.params?.keyword);
const searchWord = ref(keyword);

const querySearchResultData = async (keyword: any) => {
   const [playListRes,singerRes,ablumRes,vedioRes,songlistRes] = await Promise.all([
    getSearchSongDetail(keyword,1),
    getSearchSongDetail(keyword,100),
    getSearchSongDetail(keyword,10),
    getSearchSongDetail(keyword,1014),
    getSearchSongDetail(keyword,1000),
   ])

  playListData.value = playListRes?.result?.songs.map(formatSong)
  singerData.value = singerRes?.result?.artists
  ablumData.value = ablumRes?.result?.albums
  vedioData.value = vedioRes?.result?.videos
  songlistData.value = songlistRes?.result?.playlists
};

const handleInput = (e: any) => {
  if (e.code == "Enter") {
    if (searchWord.value.length) {
      if (!searchHistoryTag.value.includes(searchWord.value.trim())) {
        searchHistoryTag.value.push(searchWord.value.trim());
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(searchHistoryTag.value)
        );
        console.log("enter", searchHistoryTag);
      }
      searchWord.value = "";
    }
  }
};

onMounted(()=> querySearchResultData(keyword))
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.keywors !== from.params.keyword) {
    querySearchResultData(String(to.params.keyword));
    searchWord.value = String(to.params.keyword)
  }
});

</script>

<style lang="less">


.search-result-banner-container {
  width: 100%;
  height: 250px;
  background: url(/img/searchResultBg.jpg);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
 
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background: #8A2387;
    background: linear-gradient(to left, #F27121, #E94057, #8A2387);
    opacity: 0.3;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}

  .search-area {
    height: 50px;
    width: 720px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .search-box {
      position: relative;
      z-index: 10;
      border-radius: 2px;
      background: #f5f5f5;

      .el-input--large .el-input__inner {
        height: 60px;
      }
    }
  }
}

.main-container {
  width: 100%;
 vertical-align: middle;
  align-items:center;
  margin-top: 30px;

  .span-wrapper {
    float: left;
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    margin: 4px 4px;
    width: 100px;
  }

  .search-detail-nav-title{
    .el-tabs__nav-wrap::after {
        display: none;
      }

      .el-tabs__nav {
        width: 100%;
        float: none;
        display: flex;

        .el-tabs__item.is-active {
          color: var(--color-text-red);
        }

        .el-tabs__item:hover {
          color: var(--color-text-red);
        }

        .el-tabs__active-bar {
          background-color: var(--color-text-red);
        }
      }
  }
}
</style>
