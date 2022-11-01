import { getAjax } from ".";

// 获取个人播放列表
export const getPersonalPlaylist = (uid: string, type: number) => {
  return getAjax("/user/record", { params: { uid, type } });
};

export const getPersonalInfo = (uid: string) => {
  return getAjax("/user/detail", { params: { uid } });
};

export const getPersonalSonglist = (uid: string) => {
  return getAjax("/user/playlist", { params: { uid } });
};
/** 获取关注列表 */
export const getFollow = (uid: string) => {
  return getAjax(`/user/follows?uid=${uid}`);
};

/** 获取粉丝列表 */
export const getFollower = (uid: string) => {
  return getAjax(`/user/followeds?uid=${uid}`);
};