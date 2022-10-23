import { getAjax, postAjax } from ".";


// 获取个人播放列表
export const getPersonalPlaylist = (
  uid:number,
  type:number 
) => {
  return getAjax("/user/record", { params:{ uid,type } });
};

export const getPersonalInfo = ( uid:number) => {
  return getAjax("/user/detail", { params:{ uid } });
};

export const getPersonalSonglist = ( uid:number) => {
  return getAjax("/user/playlist", { params:{ uid } });
};

