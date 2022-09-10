<template>
  <div class="playlist-detail-whole">
    <PlaylistDetailLeft :data="playlistdetailData" />

  </div>
  
  
</template>


<script setup lang="ts">

import { useRouter } from "vue-router";

import { onMounted, ref } from "vue";
import { getPlaylistDetail} from "@/api/home";
import PlaylistDetailLeft, {IPlaylistDetailLeftItem} from "@/components/playlist-detail-left/index.vue";

const { currentRoute } = useRouter();
const playlistdetailData = ref<IPlaylistDetailLeftItem[]>([]);



onMounted(async () => {
  const [playListDetailRes] = await Promise.all([
   getPlaylistDetail(Number(currentRoute.value.params.id))
  ]);

  playlistdetailData.value = playListDetailRes.playlist;

});



</script>
<style scoped lang="less"></style>
