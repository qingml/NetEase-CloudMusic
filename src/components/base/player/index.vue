<template>
  <div class="player-container">
    <div>
      <span>上一曲</span>
      <span>暂停</span>
      <span>下一曲</span>
    </div>
    <div>{{ palyerStore?.currentSong?.name }}</div>
    <div v-if="palyerStore.currentSong">
      <audio autoplay controls :src="palyerStore?.currentSong?.playUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { usePlayerStore } from '../../stores/player';
import { usePlayerStore } from '../../../stores/player';

const palyerStore = usePlayerStore();

// watch(palyerStore.currentSongData, (...args) => {
//   console.log('args', args);
// });
</script>

<style lang="less">
.player-container {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 80px;
}
</style>
