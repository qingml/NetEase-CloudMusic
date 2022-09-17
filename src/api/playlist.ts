import { getAjax } from ".";

export const getHotTag = () => {
  return getAjax("/playlist/hot");
};

export const getTagCatgoryList = () => {
  return getAjax("/playlist/catlist");
};
