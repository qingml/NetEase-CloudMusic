<template>
  <div class="playlist-detail-whole">
    <div class="playlist-detail-left">
      <PlayListDetailInfo :data="playlistdetailData" />
      <Playlist :data="playListData" />
    </div>
    <div class="playlist-detail-right">
      <PlaylistDetailSubscribers :data="PlayListSubscriberData" />
      <PlaylistRelatedRecommend :data="playlistRelatedRecommendData" />
      <PlaylistDetailComments :data="playlistDetailCommentsData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
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
import PlaylistRelatedRecommend from "@/components/playlist-related-recommend/index.vue";
import PlaylistDetailComments from "@/components/comments-detail/index.vue";
import { formatSong } from "@/utils/song";

const { currentRoute } = useRouter();

const playListId = currentRoute?.value?.params?.id as string;

const playlistdetailData = ref({});
const playListData = ref([]);
const PlayListSubscriberData = ref([]);
const playlistRelatedRecommendData = ref([]);
const playlistDetailCommentsData = ref([]);

const queryPlayListData = async (playId: string) => {
  const [
    playListDetailRes,
    PlayListSubscriberRes,
    playlistRelatedRecommendRes,
    playlistDetailCommentsRes,
  ] = await Promise.all([
    getPlaylistDetail(playId),
    getPlayListSubscribers(playId),
    getPlayListRelatedrecommend(playId),
    getPlayListComments(playId),
  ]);

  playlistdetailData.value = playListDetailRes.playlist;
  PlayListSubscriberData.value = PlayListSubscriberRes.subscribers;
  playlistRelatedRecommendData.value =
    playlistRelatedRecommendRes?.playlists || [];
  playlistDetailCommentsData.value =
    playlistDetailCommentsRes?.hotComments || [];

  const ids = playListDetailRes.playlist.trackIds.map(
    (it: any) => it.id
  ) as string[];

  const playListRes = await getPlayList(ids);
  playListData.value = playListRes?.songs?.map(formatSong) || [];
};

onMounted(() => queryPlayListData(playListId));

onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    queryPlayListData(to.params.id as string);
  }
});
</script>

<style lang="less">
.left-wrap {
  margin-right: 16px;
}
.playlist-detail {
  &-whole {
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
