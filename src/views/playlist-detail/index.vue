<template>
  <div class="playlist-detail-whole">
    <div class="playlist-detail-left">
      <PlayListDetailInfo :data="playlistdetailData" />
      <Playlist :data="playListData" />
    </div>
    <div class="playlist-detail-right">
      <PlaylistDetailSubscribers :data="PlayListSubscriberData" />
      <playlistRelatedRecommend :data="playlistRelatedRecommendData" />
      <playlistDetailComments :data="playlistDetailCommentsData" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlayListDetailInfo from "@/components/playlist-detail-info/index.vue";
import {
  getPlaylistDetail,
  getPlayList,
  getPlayListSubscribers,
  getPlayListRelatedrecommend,
  getPlayListComments,
} from "@/api/playlist-detail";
import Playlist from "@/components/base/playlist/index.vue";
import PlaylistDetailSubscribers from "@/components/playlist-detail-subscribers/index.vue";
import playlistRelatedRecommend from "@/components/playlist-related-recommend/index.vue";
import playlistDetailComments from "@/components/playlist-detail-comments/index.vue";

const { currentRoute } = useRouter();

const playId = currentRoute?.value?.params?.id as string;

const playlistdetailData = ref({});
const playListData = ref([]);
const PlayListSubscriberData = ref([]);
const playlistRelatedRecommendData = ref([]);
const playlistDetailCommentsData = ref([]);

onMounted(async () => {
  const [playListDetailRes, PlayListSubscriberRes,playlistRelatedRecommendRes,playlistDetailCommentsRes] = await Promise.all([
    getPlaylistDetail(playId),
    getPlayListSubscribers(playId),
    getPlayListRelatedrecommend(playId),
    getPlayListComments(playId),
  ]);

  playlistdetailData.value = playListDetailRes.playlist;
  PlayListSubscriberData.value = PlayListSubscriberRes.subscribers;
  playlistRelatedRecommendData.value = playlistRelatedRecommendRes.playlists
  playlistDetailCommentsData.value = playlistDetailCommentsRes.hotComments


  const ids = playListDetailRes.playlist.trackIds.map(
    (it: any) => it.id
  ) as string[];

  const playListRes = await getPlayList(ids);

  playListData.value = playListRes.songs.map((songItem: any) => ({
    ...songItem,
    name: songItem.name,
    coverImg: songItem.al.picUrl,
    singer: songItem.ar.map((arItem: any) => arItem.name).join(" / "),
    album: songItem.al.name,
  }));

 
});
</script>

<style lang="less">
.playlist-detail {
  &-whole {
    display: flex;
  }

  &-left {
    width: 960px;
    padding-right: 32px;
  }
  &-right{
    width: 320px;
  
    flex-direction: column;
  }
}
</style>
