import { getAjax, postAjax } from ".";

/** 获取歌手详情信息 */
export const getSingerDetailInfo = (id: string) => {
  return getAjax("/artists",{params:{id}})
};
