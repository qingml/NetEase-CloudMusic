import { getAjax, postAjax } from ".";

/** 获取歌单详情信息 */
export const getPlaylistDetail = (
  id: string,
  s = 100
) => {
  return getAjax("/playlist/detail", { params: { id,  s } });
};

/** 获取歌单详情列表 */
export const getPlayList = (ids: string[]) => {
  // @ts-ignore
  return postAjax("/song/detail", { ids: ids.join(",") });
};
/** 获取歌单详订阅者 */
export const getPlayListSubscribers = (
  id: string,
  limit = 28, 
  offset = 0) => {
  return getAjax('/playlist/subscribers', { params: { id,limit, offset } })
}