import { getAjax, postAjax } from "./index";

interface LoginCellphone {
  phone: string;
  password: string;
}

/** 手机密码登陆 */
export const loginCellphone = (params: LoginCellphone) => {
  return postAjax("/register/anonimous", {
    data: { ...params },
  });
};

export const getUserInfo = () => {
  return getAjax("/user/account", {
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

export const logout = () => {
  return postAjax("/logout");
};

export const getQRCodeKey = () => {
  return getAjax("/login/qr/key", {
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

export const createQRCodeImg = (key: string) => {
  return getAjax("/login/qr/create", {
    params: {
      timestamp: new Date().getTime(),
      qrimg: true,
      key,
    },
  });
};

export const checkScanQRCodeStatus = (key: string) => {
  return getAjax("/login/qr/check", {
    params: {
      key,
      timestamp: new Date().getTime(),
    },
  });
};
