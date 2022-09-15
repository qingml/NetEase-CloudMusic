import { getAjax, postAjax } from ".";

/** 获取歌手详情信息 */
export const getSingerDetailInfo = (id: string) => {
  return getAjax("/artists",{params:{id}})
};
/** 获取相似歌手信息 */
export const getSimSingerDetail = (id: string) => {
  return getAjax("/simi/artist",{params:{id}})
};
/** 获取歌手完整介绍 */
export const getSingerIntroduction = (id: string) => {
  return getAjax("/artist/desc",{params:{id}})
};
