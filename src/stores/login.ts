import { defineStore } from "pinia";

interface LoginState {
  loginStatus: boolean;
  token: string;
}

export const useLoginStore = defineStore({
  id: "counter",
  state: (): LoginState => ({
    loginStatus: false,
    token: "",
  }),
  getters: {
    isLogin: (state) => state.loginStatus,
  },
  actions: {
    setLoginStatus(status: boolean) {
      this.loginStatus = status;
    },
    setLoginToken(token: string) {
      this.token = token;
    },
  },
});
