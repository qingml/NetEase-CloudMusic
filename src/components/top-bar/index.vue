<template>
  <header>
    <div class="top-bar__logo" />
    <div class="top-bar__wrapper">
      <nav>
        <RouterLink v-for="(item, index) in data" :key="index" :to="item.path">
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="top-bar__right-block">
        <div class="top-bar__search" @click="handleSearchClick">
          <i class="iconfont icon-search" />
        </div>
        <div class="top-bar__login">
          <span
            class="top-bar__login-text"
            v-if="!loginStore.loginStatus"
            @click="handleLogin"
            >登录</span
          >
          <div v-else class="top-bar__user-info">
            <img :src="loginStore.userInfo?.avatarUrl" />
            <div class="user-nickname" @click="showPopover">
              <span>{{ loginStore.userInfo?.nickname }}</span>
              <i class="iconfont icon-jiantouxia" />
            </div>
            <div class="user-info-popover" v-if="showUserPopover">
              <div class="wrapper">
                <div>
                  <i class="iconfont icon-gerenzhuye" />
                  <span>个人主页</span>
                </div>
                <div>
                  <i class="iconfont icon-gerenshezhi" />
                  <span>个人设置</span> 
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <SearchOverLay v-model:visible="searchOverlayVisible" />
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, PropType, ref } from "vue";
import { useLoginStore } from "@/stores/login";
import SearchOverLay from "@/components/base/search-overlay/index.vue";

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

const searchOverlayVisible = ref(false);
const showUserPopover = ref(false)
const handleSearchClick = () => {
  searchOverlayVisible.value = true;
};

const handleClose = () => {};

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

const showPopover = () => {
  showUserPopover.value = !showUserPopover.value
}
</script>

<style scoped lang="less">
header {
  display: flex;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  top: 0;
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

  &__right-block {
    display: flex;
    align-items: center;
  }

  &__search {
    i {
      font-size: 24px;
      cursor: pointer;
      margin-right: 24px;
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
    position: relative;

    img {
      margin: 0 12px 0 0;
      height: 36px;
      width: 36px;
      border-radius: 50%;
    }

    i{
      margin-left: 6px;
      font-size: small;
    }

    .user-info-popover {
      width: 136px;
      border-radius: 10px;
      position: absolute;
      top:60px;
      left:40px;
      background-color: #fff;
      z-index: 102;

      .wrapper{
        display: flex;
        flex-direction: column;

        div{
           display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 40px;

          span{
            padding-left: 8px;
            line-height: 36px;
          }

          i{
            font-size: larger;
          }
        }
      }
    }
  }
}
</style>
