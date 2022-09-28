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
    </div>
  </div>
</template>

<script setup>
import { mvAreaMenus, mvTypeMenus, mvOrderMenus } from "@/constants/mvMenus";
import { onMounted, onUnmounted, ref, watch } from "vue";

import MVTagBar from "@/components/base/noPopover-tag-bar/index.vue";
import MV from "@/components/base/mv/index.vue";

import { getMvList } from "@/api/mv";

const mvAreaMenusList = ref(mvAreaMenus);
const mvTypeMenusList = ref(mvTypeMenus);
const mvOrderMenusList = ref(mvOrderMenus);
const currentArea = ref("全部");
const currentType = ref("全部");
const currentOrder = ref("全部");
const currentOffset = ref(0);

const mvListData = ref([]);
const moreListData = ref([]);
let readyForLoad = false;
let scrollnum = 0

watch(
  [currentArea, currentType, currentOrder],
  ([newArea, newType, newOrder], []) => {
    queryMvListData(newArea, newType, newOrder);
  }
);

const queryMvListData = async (area, type, order, offset) => {
  const mvListRes = await getMvList({ area, type, order, offset });
  mvListData.value = mvListRes?.data?.map((item) => ({
    ...item,
    imgurl16v9: item.cover,
  }));
};

onMounted(() => {
  queryMvListData();
  window.addEventListener("scroll", handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, false);
});

const changeData = (type, val, data) => {
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

const handleScroll = () => {
  const scrollHeight = document.body.scrollHeight
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  // //窗口可视范围高度
  const clientHeight = document.body.clientHeight
  const distance = scrollHeight - scrollTop - clientHeight;
    console.log(distance)
  if (distance < - 145) {
    console.log("加载更多内容");
    readyForLoad = true;
    currentOffset.value= (scrollnum += 1) *12
    console.log(currentOffset.value)
   // loadMore(currentOffset.value);
  }
  console.log("gun l");
};

const loadMore = (newOffset) => {
  if (readyForLoad) {
    readyForLoad = false;
    queryMvListData(
      currentArea.value,
      currentType.value,
      currentOrder.value,
      currentOffset.value,
      newOffset
    ).then((res) => {
      moreListData.value = res?.data?.map((item) => ({
        ...item,
        imgurl16v9: item.cover,
      }));
      mvListData.value.push(...moreListData.value);
    });
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
