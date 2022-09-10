import { getAjax, postAjax } from ".";

/** 获取歌单详情信息 */
export const getPlaylistDetail = (
  id: string,
  timestamp = Math.round(new Date().getTime() / 1000),
  s = 100
) => {
  return getAjax("/playlist/detail", { params: { id, timestamp, s } });
};

/** 获取歌单详情列表 */
export const getPlayList = (ids: string[]) => {
  // @ts-ignore
  return postAjax("/song/detail", { ids: ids.join(",") });
};
