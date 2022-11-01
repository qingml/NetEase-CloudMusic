<template>
  <div class="personal-container">
    <followList :data="followDetailData" :title="detailTitle" />
    <div class="personal-info">
      <div class="user-ava">
        <img :src="userInfoData?.profile?.avatarUrl" />
      </div>
      <div class="user-info">
        <h2>{{ userInfoData?.profile?.nickname }}</h2>
        <div class="info-specifi">
          <div class="info-level">Lv{{ userInfoData.level }}</div>
          <div
            :class="[
              userInfoData?.profile?.gender == 1 ? 'male' : 'female',
              'info-gender',
            ]"
          >
            <i
              v-if="userInfoData?.profile?.gender == 1"
              class="iconfont icon-nansheng"
            />
            <i v-else class="iconfont icon-nvsheng" />
          </div>
        </div>
        <div class="info-dynamic">
          <div>
            <span>{{ userInfoData?.profile?.eventCount }}</span>
            <span>动态</span>
          </div>
          <div class="fenge"></div>
          <div>
            <span @click="openFollowDetail">{{
              userInfoData?.profile?.follows
            }}</span>
            <span>关注</span>
          </div>
          <div class="fenge"></div>
          <div>
            <span @click="openFollowerDetail">{{
              userInfoData?.profile?.followeds
            }}</span>
            <span>粉丝</span>
          </div>
        </div>
        <div class="signature">
          <span>个人介绍：</span> {{ userInfoData?.profile?.signature }}
        </div>
      </div>
    </div>
    <div class="user-playlist">
      <el-tabs
        v-model="activeName"
        class="search-detail-nav-title"
        @click="requestOtherData"
      >
        <el-tab-pane label="听歌排行" name="playlist">
          <!-- <template> -->
          <div class="playlist-top-banner">
            <div class="playlist-title">
              累计听歌 <span> {{ userInfoData?.listenSongs }} </span>首
            </div>
            <div class="playlist-tab">
              <span
                :class="[highLight == 'week' ? 'title-highlight' : 'title']"
                @click.stop="requestWeekPlaylist"
                >最近一周</span
              >
              <span>|</span>
              <span
                :class="[highLight == 'all' ? 'title-highlight' : 'title']"
                @click.stop="requestAllPlaylist"
                >所有时间</span
              >
            </div>
          </div>
          <!-- </template> -->
          <Playlist :data="userPlaylistData" :hasCollect="false" />
        </el-tab-pane>
        <el-tab-pane label="创建的歌单" name="creatList">
          <songList :data="creatListData" />
        </el-tab-pane>
        <el-tab-pane label="收藏的歌单" name="collectList">
          <songList :data="collectListData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import Playlist from "@/components/base/playlist/index.vue";
import songList from "@/components/base/curate-playlist/index.vue";
import followList from "@/components/follower-list/index.vue";
import { onMounted, ref } from "vue";
import {
  getFollow,
  getFollower,
  getPersonalInfo,
  getPersonalPlaylist,
  getPersonalSonglist,
} from "@/api/personal";
import { formatSong } from "@/utils/song";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ElTabs, ElTabPane } from "element-plus";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
import { watch } from "vue";

const { currentRoute } = useRouter();

let uID = currentRoute?.value?.params?.id as string;
const activeName = ref("playlist");

const userPlaylistData = ref([]);
const userInfoData = ref({});
const creatListData = ref([]);
const collectListData = ref([]);
const highLight = ref("week");

const loginStore = useLoginStore();
const { openUserFollow } = storeToRefs(loginStore);
let userName = "";
const detailTitle = ref("");
const followDetailData = ref([]);

const queryUserInfoData = async (uid: string) => {
  const userInfoRes = await getPersonalInfo(uid);
  userInfoData.value = userInfoRes;
  userName = userInfoRes?.profile?.nickname;
};

const queryWeekSonglistData = async (uid: string) => {
  const userPlaylistWeekRes = await getPersonalPlaylist(uid, 1);
  userPlaylistData.value = userPlaylistWeekRes?.weekData?.map(formatSong);
};

const querySonglistData = async (uid: string) => {
  const userSonglistRes = await getPersonalSonglist(uid);
  const creatListNumber = userInfoData?.value?.profile?.playlistCount;
  creatListData.value = userSonglistRes?.playlist
    ?.slice(0, creatListNumber)
    .map(formatSong);
  collectListData.value = userSonglistRes?.playlist
    ?.slice(creatListNumber)
    .map(formatSong);
};

const queryAllPlaylistData = async (uid: string) => {
  const userPlaylistAllRes = await getPersonalPlaylist(uid, 0);
  userPlaylistData.value = userPlaylistAllRes?.allData?.map(formatSong);
};

const queryFollowListData = async (uid: string) => {
  const followListRes = await getFollow(uid);
  followDetailData.value = followListRes.follow;
};

const queryFollowerListData = async (uid: string) => {
  const followerListRes = await getFollower(uid);
  followDetailData.value = followerListRes.followeds;
};
onMounted(() => {
  queryUserInfoData(uID);
  queryWeekSonglistData(uID);
});

const requestWeekPlaylist = () => {
  if (highLight.value !== "week") {
    queryWeekSonglistData(uID);
    highLight.value = "week";
  }
};

const requestAllPlaylist = () => {
  if (highLight.value !== "all") {
    queryAllPlaylistData(uID);
    highLight.value = "all";
  }
};

const requestOtherData = () => {
  if (activeName.value != "playlist") {
    querySonglistData(uID);
  } else {
    queryWeekSonglistData(uID);
  }
};



onBeforeRouteUpdate(async (to, from) => {
  
  if (to.params.id !== from.params.id) {
    console.log('id',to.params.id,from.params.id,uID)
    uID = String(to.params.id),
    queryUserInfoData(uID);
    queryWeekSonglistData(uID);
    activeName.value = 'playlist'
  }
});

const openFollowDetail = () => {
  openUserFollow.value = true;

  detailTitle.value = userName + "的关注";
  queryFollowListData(uID);
};

const openFollowerDetail = () => {
  openUserFollow.value = true;
  detailTitle.value = userName + "的粉丝";
  queryFollowerListData(uID);
};
</script>
<style scoped lang="less">
.personal-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

  :deep(.el-tabs__nav) {
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
  .personal-info {
    display: flex;
    flex-direction: row;
    width: 100%;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dotted #666;
    }

    .user-info {
      padding-left: 40px;
      width: 100%;

      h2 {
        font-weight: bolder;
      }
      .info-specifi {
        width: 100%;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 2px solid #f1f1f1;
        .info-level {
          font-size: 12px;
          width: 40px;
          height: 20px;
          background-color: RGB(240, 240, 240);
          line-height: 20px;
          text-align: center;
          border-radius: 10px;
        }

        .info-gender {
          margin-left: 10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          text-align: center;
          vertical-align: center;
          &.male {
            background-color: RGB(191, 243, 255);
          }
          &.female {
            background-color: RGB(255, 204, 231);
          }

          .icon-nvsheng {
            color: RGB(250, 175, 210);
          }
          .icon-nansheng {
            color: RGB(113, 194, 248);
          }
        }
      }

      .info-dynamic {
        width: 270px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div {
          display: flex;
          flex-direction: column;
          cursor: pointer;

          span {
            text-align: center;

            &:first-child {
              font-weight: 500;
              font-size: 22px;
            }

            &:last-child {
              font-size: 12px;
            }
          }
        }
        .fenge {
          height: 40px;
          width: 2px;
          background-color: #f1f1f1;
          margin-top: 10px;
        }
      }

      .signature {
        padding-top: 10px;
        font-size: 14px;
        font-weight: lighter;

        span {
          font-weight: 500;
        }
      }
    }
  }

  .user-playlist {
    padding-top: 30px;

    .playlist-top-banner {
      padding: 4px 0 4px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;
      .title {
        font-weight: 400;
        color: #666;
        font-size: 12px;
      }
      .playlist-title {
        text-align: center;
        font-weight: 400;
        color: #666;
        font-size: 12px;

        span {
          font-weight: 500;
        }
      }

      .playlist-tab {
        span {
          padding-right: 4px;
        }
        .title {
          cursor: pointer;

          &-highlight {
            color: var(--color-text-red);
            cursor: pointer;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
