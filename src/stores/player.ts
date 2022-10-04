import { defineStore } from 'pinia';
import { getSongDetailUrl } from '@/api/player';
import { IRecommendSongItem } from '@/components/base/song-list/type';

interface IPlayerState {
  playSongList: IRecommendSongItem[];
  currentPlayIndex: number;
  mode?: string;
  playStatus?: boolean;
  sequenceList?: IRecommendSongItem[];
}

export const usePlayerStore = defineStore({
  id: 'palyer',

  state: (): IPlayerState => ({
    playSongList: [],
    currentPlayIndex: 0,
  }),

  getters: {
    currentSongData: (state) => state.playSongList,
    currentSong: (state) => state.playSongList[state.currentPlayIndex],
  },

  actions: {
    async getSongDetailUrl(id: number) {
      try {
        const resp = await getSongDetailUrl(id);
        console.log('resp', resp);
        this.playSongList = this.currentSongData.map((it) => ({
          ...it,
          playUrl: it.id === id ? resp?.data?.[0].url : null,
        }));
      } catch (error) {
        console.log('error', error);
      }
    },

    async setCurrentPlaySongList(
      el: IRecommendSongItem | IRecommendSongItem[],
    ) {
      if (Array.isArray(el)) {
        this.playSongList = el;
        this.setCurrentPlayIndex(0);
      } else if (el) {
        // todo
        this.playSongList = [el];
        this.setCurrentPlayIndex(0);
      }
    },

    setCurrentPlayIndex(index: number) {
      this.currentPlayIndex = index;
      if (this.currentSongData.length > index) {
        this.getSongDetailUrl(this.currentSongData[index].id);
      }
    },
  },
});
