import { defineStore } from 'pinia';
import { getSongDetailUrl } from '@/api/player';
import { IRecommendSongItem } from '@/components/base/song-list/type';

enum ModeEnum {
  /** 顺序 */
  ORDER = 1,
  /** 随机 */
  RANDOM = 2,
  /** 单曲 */
  SINGLE = 3,
}

interface IPlayerState {
  /** 播放列表 */
  playSongList: IRecommendSongItem[];
  /** 当前播放歌曲下标 */
  currentPlayIndex: number;
  /** 模式 */
  mode?: ModeEnum;
  /** 播放状态 */
  isPlaying?: boolean;
}

export const usePlayerStore = defineStore({
  id: 'palyer',

  state: (): IPlayerState => ({
    playSongList: [],
    currentPlayIndex: 0,
    isPlaying: false,
  }),

  getters: {
    currentSongData: (state) => state.playSongList,
    currentSong: (state): IRecommendSongItem =>
      state.playSongList[state.currentPlayIndex],
    playStatus: (state) => state.isPlaying,
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
          'currentSong',
          JSON.parse(JSON.stringify(this.currentSong)),
        );
        this.isPlaying = true;
      } catch (error) {
        console.log('error', error);
      }
    },

    async setCurrentPlaySongList(
      el: IRecommendSongItem | IRecommendSongItem[],
      index = 0,
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
      console.log('setCurrentPlayIndex', index);

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
        this.setCurrentPlayIndex(0)
      }
    },

    toLast() {
      const lastIndex = this.currentPlayIndex - 1;
      if (lastIndex > 0) {
        this.setCurrentPlayIndex(lastIndex);
      }
    },
  },
});
