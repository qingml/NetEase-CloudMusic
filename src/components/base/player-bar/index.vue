<template>
  <div class="player-container" v-if="playerStore.currentSongData.length">
    <div class="player-block">
      <div class="player-song-info">
        <img :src="playerStore.currentSong.picUrl" />
      </div>
      <div class="play-song-operator">
        <span @click="playerStore.toLast">
          <i class="iconfont icon-shangyishouge"></i>
        </span>
        <span @click="handlePlay">
          <i v-if="playerStore.playStatus" class="iconfont icon-zanting"></i>
          <i v-else class="iconfont icon-bofang1"></i>
        </span>
        <span @click="playerStore.toNext">
          <i class="iconfont icon-xiayishou"></i>
        </span>
      </div>

      <div style="padding-left: 10px">{{ playerStore?.currentSong?.name }}</div>
      <div style="padding-left: 10px">
        {{ formatDurationPlay(currentPlayTime) }}
        /
        {{
          formatDurationPlay(
            formatSecond(
              playerStore?.currentSong?.song?.duration! ||
                playerStore?.currentSong?.dt!
            )
          )
        }}
      </div>

      <div class="player-slider">
        <el-slider
          :show-tooltip="false"
          :model-value="playProgressValue"
          size="small"
          input-size="small"
          @input="handleChange"
        />
      </div>
      <div v-if="playerStore.currentSong">
        <audio
          class="player-audio"
          ref="audioRef"
          @timeupdate="handleUpdateTime"
          autoplay
          controls
          :src="playerStore?.currentSong?.playUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../../../stores/player";
import { formatDurationPlay, formatSecond } from "@/utils/number";

const audioRef = ref<HTMLAudioElement>();
const currentPlayTime = ref(0);
const playProgressValue = ref(0);

const playerStore = usePlayerStore();

const handlePlay = () => {
  if (playerStore.playStatus) {
    audioRef?.value?.pause();
  } else {
    audioRef?.value?.play();
  }

  playerStore.setPlayStatus();

  currentPlayTime.value = audioRef.value?.currentTime || 0;
};

const handleUpdateTime = () => {
  currentPlayTime.value = audioRef.value?.currentTime || 0;

  playProgressValue.value = Math.floor(
    (audioRef.value?.currentTime! /
      formatSecond(
        playerStore?.currentSong?.song?.duration! ||
          playerStore?.currentSong?.dt!
      )) *
      100
  );

  console.log("playProgressValue.value", playProgressValue.value);

  if (playProgressValue.value === 100) {
    playerStore.toNext();
  }
};

const handleChange = (value: number) => {
  playProgressValue.value = value;
  audioRef.value!.currentTime =
    formatSecond(
      playerStore?.currentSong?.song?.duration! || playerStore?.currentSong?.dt!
    ) *
    (value / 100);
};
</script>

<style lang="less">
.player-container {
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  height: 80px;
  width: 100%;

  padding: 10px 32px;
}

.player-block {
  display: flex;
}

.player-song-info {
  img {
    width: 50px;
    height: 50px;
  }
}

.play-song-operator {
  span {
    margin-left: 16px;
  }

  i {
    cursor: pointer;
  }
}

.player-audio {
  display: none;
}

.player-slider {
  width: 500px;
  margin-left: 32px;

  // .el-progress__text.el-progress__text.el-progress__text {
  //   display: none;
  // }
}
</style>
