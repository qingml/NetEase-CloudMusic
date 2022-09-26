import { getAjax } from ".";

export const getHotTag = () => {
  return getAjax("/playlist/hot");
};

export const getTagCatgoryList = () => {
  return getAjax("/playlist/catlist");
};
export const getPlaylist = (
cat:string = '全部',
offset:number = 0,
order:string = 'hot',
limit:number = 40
)=> {
  return getAjax("/top/playlist",{ params: { cat ,offset,order,limit} });
};
