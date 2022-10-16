<template>
  <div class="mv">
    <MVTagBar
      :areaData="mvAreaMenusList"
      :typeData="mvTypeMenusList"
      :initialData="mvOrderMenusList"
      @changeData="changeData"
      :isMV="true"
    />
    <div class="mv-main">
      <MV :data="mvListData" />
      <div>数据加载中，请稍等...</div>
    </div>
  </div>
</template>

<script setup>
import { mvAreaMenus, mvTypeMenus, mvOrderMenus } from "@/constants/mvMenus";
import { onMounted, onUnmounted, ref, watch } from "vue";

import MVTagBar from "@/components/base/noPopover-tag-bar/index.vue";
import MV from "@/components/base/mv/index.vue";
import useScrollUpdate from "@/hooks/useScrollUpdate";

import { getMvList } from "@/api/mv";

const mvAreaMenusList = ref(mvAreaMenus);
const mvTypeMenusList = ref(mvTypeMenus);
const mvOrderMenusList = ref(mvOrderMenus);
const currentArea = ref("全部");
const currentType = ref("全部");
const currentOrder = ref("全部");
const currentPage = ref(1);

const mvListData = ref([]);

watch(
  [currentArea, currentType, currentOrder, currentPage],
  ([newArea, newType, newOrder], []) => {
    queryMvListData(newArea, newType, newOrder);
  }
);

const queryMvListData = async (area, type, order) => {
  const offset = (currentPage.value - 1) * 12;
  const mvListRes = await getMvList({ area, type, order, offset });
  // const requestData = mvListRes?.data?.map((item) => ({
  //     ...item,
  //     imgurl16v9: item.cover,
  //   })),
  mvListData.value = [...mvListData.value,...mvListRes?.data?.map((item) => ({
   ...item,
    imgurl16v9: item.cover,
  }))]

};

onMounted(() => {
  queryMvListData(currentArea.value, currentType.value, currentOrder.value);
});

useScrollUpdate({
  handleScollUpdate: () => {
    currentPage.value += 1;
    console.log(currentPage.value)
  },
})

const changeData = (type, val, data) => {
  mvListData.value = []
  currentPage.value = 1
  if (type === "area") {
    mvAreaMenusList.value = data;
    currentArea.value = val;
  } else if (type === "type") {
    mvTypeMenusList.value = data;
    currentType.value = val;
  } else {
    mvOrderMenusList.value = data;
    currentOrder.value = val;
  }
};
</script>

<style lang="less">
.mv {
  overflow-y: auto;
  &-main {
    width: 100%;
  }
}
</style>
