import { getAjax, postAjax } from ".";

/** 获取搜索结果 */
export const getSearchSongDetail = (keywords: string,type:number,offset=0,limit=30) => {
  return getAjax("/search", { params: { keywords,type,offset,limit } });
};

/** 获取搜索单曲列表和专辑 */
export const getPlayList = (keywords: string[]) => {
  return getAjax("/search/suggest", { params: { keywords } });
};

export const getPlayListDetail = () => {
  return postAjax(`/song/detail?timestamp=${new Date().getTime()}`);
};
