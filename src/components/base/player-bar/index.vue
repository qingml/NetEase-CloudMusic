<template>
  <div class="player-container" v-if="currentSongData.length">
    <PlaySongDetail :currentTime="currentPlayTime" />
    <div class="player-block">
      <div class="player-song-info">
        <img :src="currentSong.picUrl" />
        <div class="song-detail">
          <div class="player-song-songName ellipsis">
            {{ currentSong?.name }}
          </div>
          <div class="player-song-singer">
            {{ currentSong?.singer }}
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
              <i v-if="isPlaying" class="iconfont icon-zanting"></i>
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
            {{ formatDurationPlay(currentSong?.duration!) }}
          </div>
        </div>
      </div>
      <div class="play-other-control">
        <div class="volume-control">
          <div @click="changeMuted" div="volume-wrapper">
            <i v-if="muted" class="iconfont icon-jingyin"></i>
            <i v-else class="iconfont icon-yinliang"></i>
          </div>
          <el-slider
            :model-value="playVolumeValue"
            size="small"
            input-size="small"
            @input="handleVolumeChange"
          />
        </div>
        <div class="playlist">
          <i class="iconfont icon-playlistMusic" @click="showPopover"></i>
          <div class="playlist-popover" v-if="showPlaylistPopover">
            <div class="playlist-title">
              播放列表
              <i
                class="iconfont icon-qingkong"
                @click="handleResetPlayList"
              ></i>
            </div>
            <div class="playlist-content">
              <el-scrollbar>
                <div
                  v-for="(item, index) in currentSongData"
                  :key="index"
                  :class="[
                    'playlist-item',
                    index == playingIndex ? 'highlight' : '',
                  ]"
                  @click="() => playerStore.setCurrentPlayIndex(index)"
                >
                  <span class="item-index">
                    <i class="iconfont icon-bofang"></i>
                    <span class="index">{{ paddingZero(index + 1, 2) }}</span>
                  </span>
                  <span class="item-name ellipsis">{{ item.name }}</span>
                  <span class="item-singer ellipsis">{{ item.singer }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentSong">
        <audio
          id="myAudio"
          class="player-audio"
          ref="audioRef"
          @timeupdate="handleUpdateTime"
          autoplay
          controls
          :src="currentSong?.playUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePlayerStore } from "../../../stores/player";
import { formatDurationPlay } from "@/utils/number";
import { storeToRefs } from "pinia";
import PlaySongDetail from "@/components/base/play-song-detail/index.vue";
import { paddingZero } from "@/utils/number";
import { ElSlider } from "element-plus";

const audioRef = ref<HTMLAudioElement>();
const currentPlayTime = ref(0);
const playProgressValue = ref(0);
const playVolumeValue = ref(0);
const muted = ref(false);
const showPlaylistPopover = ref(false);

const playerStore = usePlayerStore();

const { isPlaying, openLyric, currentSong, currentSongData, playingIndex } =
  storeToRefs(playerStore);

watch(isPlaying, (newVal) => {
  if (!newVal) {
    audioRef?.value?.pause();
  } else {
    audioRef?.value?.play();
  }
});

const handlePlay = () => {
  playerStore.setPlayStatus();
  currentPlayTime.value = audioRef.value?.currentTime || 0;
};

const handleUpdateTime = () => {
  currentPlayTime.value = audioRef.value?.currentTime || 0;

  playProgressValue.value = Math.floor(
    (audioRef.value?.currentTime! / currentSong.value?.duration!) * 100
  );

  if (playProgressValue.value === 100) {
    playerStore.toNext(true);
  }
};

const handleChange = (value: any) => {
  playProgressValue.value = value;
  audioRef.value!.currentTime = currentSong.value?.duration! * (value / 100);
};

const handleVolumeChange = (value: any) => {
  playVolumeValue.value = value;
  audioRef.value!.volume = value / 100;
  if (value == 0) {
    muted.value = true;
  } else {
    muted.value = false;
  }
};

const handleLyric = () => {
  openLyric.value = !openLyric.value;
  if (openLyric.value) {
    playerStore.getSongDetailLyric(currentSong.value?.id);
  }
};

watch([currentSong], (newSong) => {
  if (newSong && audioRef.value && !playVolumeValue.value) {
    audioRef.value.volume = 0.4;
    playVolumeValue.value = 40;
  }
});

const changeMuted = () => {
  muted.value = !muted.value;
  if (muted.value) {
    audioRef.value!.muted = true;
    playVolumeValue.value = 0;
  } else {
    audioRef.value!.muted = false;
    playVolumeValue.value = audioRef.value!.volume * 100;
  }
};

const showPopover = () => {
  showPlaylistPopover.value = !showPlaylistPopover.value;
};

onMounted(async () => {
  playerStore?.getPlayList();
  audioRef.value?.pause();
});

const handleResetPlayList = () => {
  playerStore?.setCurrentPlaySongList([]);
};

</script>

<style lang="less" scoped>
.iconfont {
  user-select: none;
}
.player-container {
  width: 100%;
  position: relative;
}

i {
  cursor: pointer;
}
.player-block {
  position: fixed;
  bottom: 0;
  background-color: #ddd;
  opacity: 0.9;
  height: 80px;
  width: 100%;
  padding: 10px 32px;
  box-shadow: 12px 10px 8px 6px rgb(0 0 0 / 30%);
  z-index: 1001;
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
  width: 180px;

  img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .song-detail {
    width: 160px;
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
      margin-left: 8px;
      width: 100px;
    }
  }

  .playlist {
    // position: relative;

    i {
      margin-left: 8px;
    }

    &-popover {
      height: 560px;
      width: 400px;
      position: fixed;
      bottom: 58px;
      background-color: white;
      right: 0px;
      box-shadow: 5px 0 12px -6px #141414;
      padding: 10px 10px;
      overflow: hidden;
      user-select: none;

      .playlist-title {
        padding: 0 0 20px 10px;
        user-select: none;
        font-weight: 500;
        font-size: 16px;

        i {
          float: right;
          margin-right: 10px;
        }
      }

      .playlist-content {
        display: flex;
        flex-direction: column;
        height: 480px;

        .playlist-item {
          font-size: 14px;
          color: #4a4a4a;
          display: flex;
          cursor: pointer;
          line-height: 40px;
          height: 40px;
          justify-content: space-between;

          &:hover {
            .item-index {
              .icon-bofang {
                display: inline-block;
                margin: 0;
              }

              span {
                display: none;
              }
            }
          }

          &.highlight {
            color: var(--vt-c-text-light-2);
          }

          .item-name {
            flex: 1;
            padding-left: 15px;
          }

          .item-singer {
            width: 30%;
          }

          .item-index {
            width: 10%;
            text-align: center;

            .icon-bofang {
              display: none;
            }
          }
        }
      }
    }
  }
}

.player-audio {
  display: none;
}
</style>
