import { getAjax } from "./index";

interface LoginCellphone {
  phone: string;
  password: string;
}

/** 手机密码登陆 */
export const loginCellphone = (params: LoginCellphone) => {
  return getAjax("/login/cellphone", { params });
};

export const getUserInfo = () => {
  return getAjax("/user/account", {
    params: {
      timestamp: new Date().getTime(),
    },
  });
};
