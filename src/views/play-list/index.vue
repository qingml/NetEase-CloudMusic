<template>
  <div class="playlist">
    <TagBar
      class="playlist-topbar"
      :catgoryList="tagCatgoryList"
      :hotTagList="hotTags"
      @changeTag="handleChangeTagActive"
    />
  </div>
  <div class="playlist-main">
    <CuratePlaylist :data="playListData" />
  </div>
  <div class="playlist-pagination-block">
    <div class="playlist-pagination-block-wrap">
      <span class="el-page-total">共{{ playlistCount }}条</span>
      <el-pagination
        v-model:currentPage="currentPage1"
        :page-size="40"
        :small="small"
        :disabled="disabled"
        :background="background"
        :total="playlistCount"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { getHotTag, getTagCatgoryList, getPlaylist } from "@/api/playlist";
import { onMounted, ref } from "vue";
import TagBar from "@/components/base/tag-bar/index.vue";
import CuratePlaylist from "@/components/base/curate-playlist/index.vue";

const currentPage1 = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const hotTags = ref([]);
const tagCatgoryList = ref([]);
const playlistCount = ref(0);
const playListData = ref([]);

const queryHotTags = async () => {
  try {
    const { tags } = await getHotTag();
    hotTags.value = tags;
  } catch (error) {
    console.log("err", error);
  }
};

const queryTagCatgoryList = async () => {
  try {
    const { categories, sub } = await getTagCatgoryList();

    const list = Object.entries(categories).map((item) => {
      const [key, name] = item;
      return {
        key,
        name,
        list: sub.filter((it) => it.category === +key),
      };
    });

    tagCatgoryList.value = list;
  } catch (error) {}
};

const queryPlaylistData = async () => {
  const playlistRes = await getPlaylist();

  playlistCount.value = playlistRes?.total;
  playListData.value = playlistRes?.playlists.map((playlistItem) => ({
    ...playlistItem,
    picUrl: playlistItem.coverImgUrl,
  }));
};

const handleCurrentChange = (val) => {
  queryPlaylistData(cat, (val - 1) * 40);
};

onMounted(() => {
  queryHotTags();
  queryTagCatgoryList();
  queryPlaylistData();
});

const handleChangeTagActive = (type, data) => {
  if (type === "hotTag") {
    hotTags.value = data;
  } else {
    tagCatgoryList.value = data;
  }
};
</script>

<style lang="less">
.playlist {
  width: 100%;
  display: flex;

  &-topbar {
    width: 100%;

    &:hover{
      z-index: 3;
    }
  }
  
  &-main{
    padding: 20px 0 20px;
  }

  &-pagination-block {
  
    display: flex;
    align-items: center;
    justify-content: center;
    &-wrap {
      padding-bottom: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .el-page-total {
      font-size: 13px;
    }
    .el-pager li,
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      min-width: 30px;
      border-radius: 2px;
    }

    .el-pager li {
      font-weight: 500;
      font-size: 12px;

      &:hover {
        color: var(--vt-c-text-light-2);
      }
    }
    .el-pager li.is-active {
      background-color: var(--vt-c-text-light-2);
      color: #fff;
    }
  }
}
</style>
