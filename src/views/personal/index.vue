<template>
  <div class="personal-container">
    <div class="top-background"></div>
    <div class="personal-info">
      <div class="info-left">
        <div class="playlist-top-banner">
          <div class="playlist-title">
            <TopTitle title="听歌排行" :showLine="true" />
            <div>
              <span class="title">(累计听歌 </span>
              <span class="songs-number"> {{ listenSongs }} </span>
              <span class="title">首)</span>
            </div>
          </div>
          <div class="playlist-tab" @click="changePlaylistData">
            <span class="title" name="week">最近一周</span>
            <span>|</span>
            <span class="title" name="all">所有时间</span>
          </div>
        </div>
        <Playlist :data="userPlaylistData" :hasCollect="false" />
      </div>
      <div class="info-right">
        <div class="user-info">
          <div class="bg-pic">
            <!-- <img :src=" backgroundUrl" > -->
          </div>
        </div>
        <div class="creat-playlist">
          <TopTitle title="我创建的歌单" :showLine="true" />
          <songList :data="creatListData" /> 
        </div>
        
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Playlist from "@/components/base/playlist/index.vue";
import songList from "@/components/base/curate-playlist/index.vue"
import { useLoginStore } from "@/stores/login";
import TopTitle from "@/components/base/top-title/index.vue";
import { onMounted, ref } from "vue";
import { getPersonalInfo, getPersonalPlaylist, getPersonalSonglist } from "@/api/personal";
import { formatSong } from "@/utils/song";
import { useRouter } from "vue-router";


const { currentRoute } = useRouter();

const loginStore = useLoginStore();
const userPlaylistData = ref([]);
const userInfoData = ref({});
const creatListData  = ref([]);
const collectListData = ref([])

const listenSongs = ref(0);
// const  backgroundUrl = ref('')
const creatListNum = ref(0)


const queryUserData = async (uid: number) => {
  const [userPlaylistWeekRes, userInfoRes,userSonglistRes] = await Promise.all([
    getPersonalPlaylist(uid, 1),
    getPersonalInfo(uid),
    getPersonalSonglist(uid)
  ]);
  userPlaylistData.value = userPlaylistWeekRes?.weekData?.map(formatSong);
  userInfoData.value = userInfoRes?.profile,
  creatListNum.value = userInfoRes?.profile?.playlistCount,
  creatListData.value = userSonglistRes?.playlist?.slice(0,creatListNum.value).map(formatSong),
  collectListData.value = userSonglistRes?.playlist?.slice(creatListNum.value),
    
  listenSongs.value = userInfoRes?.listenSongs;
  // backgroundUrl.value = userInfoRes?.profile?.backgroundUrl
};

const queryAllPlaylistData = async (uid: number) => {
  const userPlaylistAllRes = await getPersonalPlaylist(uid,0)
}

onMounted(() => queryUserData(Number(loginStore?.userInfo?.userId)));

const changePlaylistData = (e:any) =>{
  console.log('e',e.target)
}
</script>
<style scoped lang="less">
.personal-container {
  width: 100%;
  // display: flex;
  // flex-direction: row;

  .top-background {
    height: 350px;
    background: url(/img/searchResultBg.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background: #8a2387;
      background: linear-gradient(to left, #f27121, #e94057, #8a2387);
      opacity: 0.3;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .personal-info{
    display: flex;
    flex-direction: row;
  }

  .info-left {
    width: 70%;
    background-color: #fff;
    padding: 10px 4px 10px 4px;

    .playlist-top-banner {
      padding: 4px 20px 4px 14px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      flex: 1;
      // align-items: center;

      .title {
        font-weight: 200;
        color: #666;
        font-size: 12px;
      }
      .songs-number {
        font-size: 12px;
      }

      .playlist-title {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .title {
          padding: 2px 0 0 4px;
        }
      }

      .playlist-tab {
        span {
          padding-right: 4px;
        }
        .title {
          cursor: pointer;

          &:active {
            color: red;
          }
        }
      }
    }
  }

  .info-right{
    width: 100%;
    padding-left: 10px;
    // background-color: red;

    .user-info{
      width: 100%;
      // img{
      //   width: 100%;
      //   height: 50px;
      // }
    }

    .creat-playlist{
      width: 100%;
    }
  }
}
</style>
