import { getAjax } from "./index";

/** 获取推荐歌单 */
export const getRecommendPlaylist = (limit = 24) => {
  return getAjax("/personalized", { params: { limit } });
};

/** 获取banner轮播图 */
export const getBanner = () => {
  return getAjax("/banner");
};

/** 获取推荐新歌 */
export const getNewSongs = (limit = 10) => {
  return getAjax("/personalized/newsong", { params: { limit } });
};

/** 獲取熱門歌手 */
export const getHotSingers = (limit = 30, offset = 0) => {
  return getAjax('/top/artists', { params: { limit, offset } })
}

export const getPlaylistDetail = (id: number | string,timestamp=Math.round(new Date().getTime()/1000),s=100) => {
  return getAjax('/playlist/detail',{params: { id, timestamp,s }})
}
