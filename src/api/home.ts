import { getAjax } from "./index";

/** 获取推荐歌单 */
export const getRecommendPlaylist = (limit = 20) => {
  return getAjax("/personalized", { data: { limit } });
};
