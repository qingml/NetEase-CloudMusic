<template>
  <header>
    <div class="top-bar__logo" />
    <div class="top-bar__wrapper">
      <nav>
        <RouterLink v-for="(item, index) in data" :key="index" :to="item.path">
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="top-bar__login">
        <span v-if="!loginStore.loginStatus" @click="handleLogin">登录</span>
        <div v-else class="top-bar__user-info">
          <span>{{ loginStore.userInfo?.nickname }}</span>
          <img :src="loginStore.userInfo?.avatarUrl" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, PropType } from "vue";
import { useLoginStore } from "@/stores/login";

interface IMenuItem {
  path: string;
  name: string;
}

defineProps({
  data: {
    type: Array as PropType<IMenuItem[]>,
    default: () => [],
  },
});

const router = useRouter();
const { path } = useRoute();

const loginStore = useLoginStore();

onMounted(async () => {
  loginStore.queryUserInfo();
});

const handleLogin = () => {
  router.push({
    path: "/login",
    query: {
      redirect: path,
    },
  });
};
</script>

<style scoped lang="less">
header {
  display: flex;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.top-bar {
  &__logo {
    width: 42px;
    height: 68px;
    background: url(@/assets/topbar.png) no-repeat 0 9999px;
    background-position: 0 0;
    margin-right: 30px;
  }

  &__wrapper {
    width: calc(100% - 42px);
    display: flex;
    justify-content: space-between;

    nav {
      // flex: 1;
      font-size: 14px;
      text-align: center;
      line-height: 68px;

      a {
        padding: 0 16px;
      }

      a.router-link-exact-active {
        color: var(--color-text-red);
      }

      a.router-link-exact-active:hover {
        background-color: transparent;
      }

      a:first-of-type {
        border: 0;
      }
    }
  }

  &__login {
    cursor: pointer;
    line-height: 68px;
  }

  &__user-info {
    line-height: 68px;
    font-size: 14px;
    display: flex;
    align-items: center;

    img {
      height: 48px;
      margin-left: 12px;
      width: 48px;
      border-radius: 50%;
    }
  }
}
</style>
