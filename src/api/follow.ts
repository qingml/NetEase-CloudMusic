
import { getAjax } from '.';

/** 获取关注列表 */
export const getFollow = (uid: number) => {
  return getAjax(`/user/follows?uid=${uid}`);
};

/** 获取粉丝列表 */
export const getFollower = (uid: number) => {
  return getAjax(`/user/followeds?uid=${uid}`);
};