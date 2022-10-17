import { getSongDetailLyric } from "./../api/player";
import { defineStore } from "pinia";
import { getSongDetailUrl } from "@/api/player";
import { IRecommendSongItem } from "@/components/base/song-list/type";

enum ModeEnum {
  /** 顺序 */
  ORDER = 1,
  /** 随机 */
  RANDOM = 2,
  /** 单曲 */
  SINGLE = 3,
}

const modeIconValues = {
  [ModeEnum.ORDER]: "icon-xunhuanbofang",
  [ModeEnum.RANDOM]: "icon-suijibofang",
  [ModeEnum.SINGLE]: "icon-danquxunhuan",
};

interface IPlayerState {
  /** 播放列表 */
  playSongList: any[];
  /** 当前播放歌曲下标 */
  currentPlayIndex: number;
  /** 模式 */
  mode: ModeEnum;
  /** 播放状态 */
  isPlaying?: boolean;
  /** 播放歌曲歌词 */
  lyric: string;
  /** 歌词页面状态 */
  openLyric: boolean;
}

export const usePlayerStore = defineStore({
  id: "palyer",

  state: (): IPlayerState => ({
    playSongList: [],
    currentPlayIndex: 0,
    isPlaying: false,
    mode: ModeEnum.ORDER,
    lyric: "",
    openLyric: false,
  }),

  getters: {
    currentSongData: (state) => state.playSongList,
    currentSong: (state): IRecommendSongItem =>
      state.playSongList[state.currentPlayIndex],
    playStatus: (state) => state.isPlaying,
    iconValue: (state) => modeIconValues[state.mode],
    lyricContent: (state) => state.lyric,
    canOpenLyric: (state) => state.openLyric,
  },

  actions: {
    async getSongDetailUrl(id: number) {
      try {
        const resp = await getSongDetailUrl(id);
        this.playSongList = this.currentSongData.map((it) => ({
          ...it,
          playUrl: it.id === id ? resp?.data?.[0].url : null,
        }));
        console.log(
          "currentSong",
          JSON.parse(JSON.stringify(this.currentSong))
        );
        this.isPlaying = true;
      } catch (error) {
        console.log("error", error);
      }
    },

    async getSongDetailLyric(id: number) {
      try {
        const response = await getSongDetailLyric(id);
        this.lyric = response?.romalrc?.lyric;
      } catch (error) {
        console.log("error", error);
      }
    },

    async setCurrentPlaySongList(
      el: IRecommendSongItem | IRecommendSongItem[],
      index = 0
    ) {
      if (Array.isArray(el)) {
        this.playSongList = el;
        this.setCurrentPlayIndex(index);
      } else if (el) {
        // todo
        this.playSongList = [el];
        this.setCurrentPlayIndex(index);
      }
    },

    setCurrentPlayIndex(index: number) {
      this.currentPlayIndex = index;

      if (this.currentSongData.length > index) {
        this.getSongDetailUrl(this.currentSongData[index].id);
      }
    },

    setPlayStatus() {
      this.isPlaying = !this.isPlaying;
    },

    toNext() {
      const nextIndex = this.currentPlayIndex + 1;
      if (nextIndex < this.currentSongData.length) {
        this.setCurrentPlayIndex(nextIndex);
      } else {
        this.setCurrentPlayIndex(0);
      }
    },

    toLast() {
      const lastIndex = this.currentPlayIndex - 1;
      if (lastIndex > 0) {
        this.setCurrentPlayIndex(lastIndex);
      }
    },

    setModeVaule() {
      switch (this.mode) {
        case ModeEnum.ORDER:
          this.mode = ModeEnum.RANDOM;
          break;
        case ModeEnum.RANDOM:
          this.mode = ModeEnum.SINGLE;
          break;
        case ModeEnum.SINGLE:
          this.mode = ModeEnum.ORDER;
          break;
      }
    },
  },
});
