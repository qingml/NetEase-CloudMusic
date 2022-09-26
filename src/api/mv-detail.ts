import { getAjax, postAjax } from ".";

/** 获取mv详情和资源 */
export const getMVDetailInfo = (id: string) => {
  return getAjax("/mv/url", { params: { id } });
};
/** 获取mv相关信息 */
export const getMVDetailDesc = (mvid: string) => {
  return getAjax("/mv/detail", { params: { mvid } });
};
/** 获取mv收藏和播放次数 */
export const getMVDetailCount = (mvid: string,
   timestamp = new Date().getTime()
  ) => {
  return getAjax("/mv/detail/info", { params: { mvid,timestamp } });
};
/** 获取mv评论 */
export const getMVDetailComment = (id: string,
  limit=20,
  offset=0
 ) => {
 return getAjax("/mv/detail/info", { params: { id,limit,offset } });
};
/** 获取mv相关推荐 */
export const getMVRecommend = (mvid: string,
 ) => {
 return getAjax("/simi/mv", { params: { mvid } });
};
/** 获取mv评论内容 */
export const getMVComment = (
  id: string,
  offset=0,
  limit=20,
  timestamp = new Date().getTime()
  ) => {
  return getAjax("/comment/mv", { params: { id ,offset,limit,timestamp} });
 };

