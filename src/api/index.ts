import axios, { AxiosRequestConfig } from "axios";

export const getAjax = (url: string, config: AxiosRequestConfig<any>) => {
  return axios.get(url, config);
};
