<template>
  <div class="playlist-detail-whole">
    <div class="playlist-detail-left">
      <PlayListDetailInfo
        :data="AlbumDetailData"
        :hasTag="false"
        :hasPublishCompany="true"
      />
      <Playlist :data="AlbumPlaylistData" :hasCollect="false" />
    </div>
    <div class="playlist-detail-right">
      <PlaylistRelatedRecommend  :data="HotAlbumData" />
      <PlaylistDetailComments :data="HotCommentData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import { getAlbumDetail, getHotAlbum,getHotComment } from "@/api/ablum-detail";

import Playlist from "@/components/base/playlist/index.vue";
import PlayListDetailInfo from "@/components/playlist-detail-info/index.vue";
import PlaylistRelatedRecommend from "@/components/playlist-related-recommend/index.vue";
import PlaylistDetailComments from "@/components/playlist-detail-comments/index.vue";

const { currentRoute } = useRouter();
const AlbumId = currentRoute?.value?.params?.id as string;

const AlbumDetailData = ref({});
const AlbumPlaylistData = ref([]);
const HotAlbumData = ref([]);
const HotCommentData = ref([]);

const queryAlbumDetailData = async (albumId: string) => {
  const [AlbumDetailRes,HotCommentRes] = await Promise.all([
    getAlbumDetail(albumId),
    getHotComment(albumId),
  ]);
  AlbumDetailRes.album.coverImgUrl = AlbumDetailRes.album.blurPicUrl;
  AlbumDetailRes.album.createTime = AlbumDetailRes.album.publishTime;
  AlbumDetailRes.album.creator = {
    avatarUrl: AlbumDetailRes.album.artist.picUrl,
    nickname: AlbumDetailRes.album.artist.name,
  };
  AlbumDetailData.value = AlbumDetailRes?.album;

  AlbumPlaylistData.value = AlbumDetailRes?.songs?.map((songItem: any) => ({
    ...songItem,
    name: songItem.name,
    coverImg: songItem.al.picUrl,
    singer: songItem.ar.map((arItem: any) => arItem.name).join(" / "),
    album: songItem.al.name,
  }));

  HotCommentData.value = HotCommentRes.hotComments
  const hotAlbumId = AlbumDetailRes?.album?.artist.id;
  const  HotAlbumRes = await getHotAlbum(hotAlbumId)

  HotAlbumData.value = HotAlbumRes?.hotAlbums?.map((albumItem:any) => ({
    ...albumItem,
    name:albumItem.name,
    coverImgUrl:albumItem.blurPicUrl,
    creator:{nickname:albumItem.artist.name}
  }))
};
onMounted(() => queryAlbumDetailData(AlbumId));
onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    queryAlbumDetailData(to.params.id as string);
  }
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

  &-right {
    width: 320px;
    flex-direction: column;
  }
}
</style>
