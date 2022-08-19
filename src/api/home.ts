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
