import { getAjax } from "./index";

/** 获取推荐歌单 */
export const getRecommendPlaylist = (limit = 24) => {
  return getAjax("/personalized", { params: { limit } });
};

export const getBanner = () => {
  return getAjax("/banner");
};
