import { getAjax } from '.';

/** 获取歌曲播放url */
export const getSongDetailUrl = (id: number) => {
  return getAjax(`/song/url?id=${id}`);
};
