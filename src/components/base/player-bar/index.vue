<template>
  <div class="player-container" v-if="playerStore.currentSongData.length">
    <div class="player-block">
      <div class="player-song-info">
        <img :src="playerStore.currentSong.picUrl" />
        <div class="song-detail">
          <div class="player-song-songName">
            {{ playerStore?.currentSong?.name }}
          </div>
          <div class="player-song-singer">
            {{ playerStore?.currentSong?.singer }}
          </div>
        </div>
      </div>
      <div class="play-song-control">
        <div class="play-song-operator">
          <div class="play-song-operator-wrapper">
            <span @click="playerStore.setModeVaule()">
              <i :class="['iconfont', playerStore.iconValue]"></i>
            </span>
            <span @click="playerStore.toLast">
              <i class="iconfont icon-shangyishouge"></i>
            </span>
            <span @click="handlePlay" class="bofang">
              <i
                v-if="playerStore.playStatus"
                class="iconfont icon-zanting"
              ></i>
              <i v-else class="iconfont icon-bofang1"></i>
            </span>
            <span @click="playerStore.toNext">
              <i class="iconfont icon-xiayishou"></i>
            </span>
            <span @click="handleLyric">
              <i class="iconfont icon-geci"></i>
            </span>
          </div>
        </div>
        <div class="play-song-slider">
          <div class="song-currentTime">
            {{ formatDurationPlay(currentPlayTime) }}
          </div>
          <el-slider
            :show-tooltip="false"
            :model-value="playProgressValue"
            size="small"
            input-size="small"
            @input="handleChange"
          />
          <div class="song-totolTime">
            {{ formatDurationPlay(playerStore?.currentSong?.duration!) }}
          </div>
        </div>
      </div>
      <div class="play-other-control">
        <div class="volume-control">
          <i v-if="muted" class="iconfont icon-jingyin"></i>
          <i v-else class="iconfont icon-yinliang"></i>
          <el-slider
            :show-tooltip="false"
            v-model="playVolumeValue"
            size="small"
            input-size="small"
          />
        </div>
        <div class="playlist">
          <i class="iconfont icon-playlistMusic"></i>
        </div>
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
import { ref, watch } from "vue";
import { usePlayerStore } from "../../../stores/player";
import { formatDurationPlay } from "@/utils/number";

const audioRef = ref<HTMLAudioElement>();
const currentPlayTime = ref(0);
const playProgressValue = ref(0);
const playVolumeValue = ref(2);
const muted = ref(false);

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
    (audioRef.value?.currentTime! / playerStore?.currentSong?.duration!) * 100
  );

  if (playProgressValue.value === 100) {
    playerStore.toNext();
  }
};

const handleChange = (value: number) => {
  playProgressValue.value = value;
  audioRef.value!.currentTime =
    playerStore?.currentSong?.duration! * (value / 100);
};

const handleLyric = () => {
  playerStore.getSongDetailLyric(playerStore?.currentSong?.id);
  playerStore.openLyric = !playerStore.canOpenLyric;
};

watch(playVolumeValue, (newValue: number) => {
  audioRef.value!.volume = newValue / 100;
  if (newValue == 0) {
    muted.value = true;
  } else {
    muted.value = false;
  }
});
</script>

<style lang="less">
.player-container {
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  height: 80px;
  width: 100%;
  padding: 10px 32px;
  box-shadow: 12px 10px 8px 6px rgb(0 0 0 / 30%);
  z-index: 14;
}

.player-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .el-slider {
    --el-slider-main-bg-color: var(--vt-c-text-light-2);
    --el-slider-height: 4px;
    --el-slider-button-size: 12px;
    padding: 0 8px 0 8px;
  }

  i {
    font-size: larger;
  }
}

.player-song-info {
  display: flex;
  align-items: center;
  padding-top: 4px;

  img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .song-detail {
    display: flex;
    flex-direction: column;

    .player-song-singer {
      font-size: 12px;
      color: #888;
      font-weight: 200;
    }
  }
}

.play-song-control {
  display: flex;
  flex-direction: column;
  width: 60%;

  .play-song-operator {
    justify-content: center;
    display: flex;
    &-wrapper {
      display: flex;
      align-items: center;

      span {
        margin-left: 16px;
      }

      i {
        cursor: pointer;
      }

      .bofang {
        font-size: x-large;
      }
    }
  }

  .play-song-slider {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -5px;
  }
}

.play-other-control {
  display: flex;
  flex-direction: row;
  .volume-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-slider {
      width: 80px;
    }
  }
}

.player-audio {
  display: none;
}
</style>
