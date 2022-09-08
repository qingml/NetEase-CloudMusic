<template>
  <div class="main">
    <TopBar :data="menus" />
    <div class="mian-layout">
      <RouterView />
    </div>
  </div>
</template>


<script setup lang="ts">
  //git test
import { RouterView } from "vue-router";
import { menus } from "@/constants/menus";
import TopBar from "@/components/top-bar/index.vue";
</script>


<style scoped lang="less">
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.mian-layout {
  width: 1280px;
  margin: 0 auto;
}
</style>
