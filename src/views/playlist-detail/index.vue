<template>
  <div class="playlist-detail-whole">
    <div class="playlist-detail-left">
      <PlayListDetailInfo :data="playlistdetailData" />
      <Playlist :data="playListData" />
    </div>
    <div class="playlist-detail-right">
      <PlaylistDetailSubscribers :data="PlayListSubscriberData" />

     
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlayListDetailInfo from "@/components/playlist-detail-info/index.vue";
import { getPlaylistDetail, getPlayList, getPlayListSubscribers } from "@/api/playlist-detail";
import Playlist from "@/components/playlist/index.vue";
import PlaylistDetailSubscribers from "@/components/playlist-detail-subscribers/index.vue";

const { currentRoute } = useRouter();

const playId = currentRoute?.value?.params?.id as string;

const playlistdetailData = ref({});
const playListData = ref([]);
const PlayListSubscriberData = ref([])

onMounted(async () => {
  const [playListDetailRes,PlayListSubscriberRes] = await Promise.all([
  getPlaylistDetail(playId),
  getPlayListSubscribers(playId)
  ]);

  playlistdetailData.value = playListDetailRes.playlist;
  PlayListSubscriberData.value = PlayListSubscriberRes.subscribers;

  const ids = playListDetailRes.playlist.trackIds.map(
    (it: any) => it.id
  ) as string[];

  const playListRes = await getPlayList(ids);

  playListData.value = playListRes.songs.map((songItem: any) => ({
    name: songItem.name,
    coverImg: songItem.al.picUrl,
    singer: songItem.ar.map((arItem: any) => arItem.name).join(" / "),
    album: songItem.al.name,
    duration: "03:58",
  }));

  console.log(
    "playListDetailRes.playlist",
    playListDetailRes.playlist,
    playListRes
  );
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
}
</style>
