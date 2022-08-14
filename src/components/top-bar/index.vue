<template>
  <header>
    <div class="top-bar__logo" />

    <div class="top-bar__wrapper">
      <nav>
        <RouterLink v-for="(item, index) in data" :key="index" :to="item.path">
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>



<script setup lang="ts">
import { RouterLink } from "vue-router";
import { toRefs } from "vue";
import type { PropType } from "vue";
import type { IMenuItem } from "./type";

const props = defineProps({
  data: {
    type: Array as PropType<IMenuItem[]>,
    default: () => [],
  },
});

const { data } = toRefs(props);
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
    height: 69px;
    background: url(@/assets/topbar.png) no-repeat 0 9999px;
    background-position: 0 0;
    margin-right: 30px;
  }

  &__wrapper {
    max-width: 1024px;

    nav {
      flex: 1;
      font-size: 14px;
      text-align: center;

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
}
</style>
