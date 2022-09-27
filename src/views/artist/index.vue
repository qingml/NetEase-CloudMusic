<template>
  <div class="aritst">
    <ArtistTagBar
      :artistAreaData="artistAreaMenusList"
      :artistTypeData="artistTypeMenusList"
      :artistInitialData="artistInitialMenusList"
      @changeData="changeData"
    />
    <div class="artistList-main">
      <Singers :data="artistListData" />
    </div>
  </div>
</template>

<script setup>
import {
  artistAreaMenus,
  artistTypeMenus,
  artistInitialMenus,
} from "@/constants/artistMenus";
import { onMounted, ref, watch } from "vue";

import ArtistTagBar from "@/components/base/artist-tag-bar/index.vue";
import Singers from "@/components/base/singers/index.vue";

import { getArtistList } from "@/api/artists";

const artistAreaMenusList = ref(artistAreaMenus);
const artistTypeMenusList = ref(artistTypeMenus);
const artistInitialMenusList = ref(artistInitialMenus);
const currentArea = ref(-1);
const currentType = ref(-1);
const currentInitial = ref(-1);

const artistListData = ref([]);

watch(
  [currentArea, currentType, currentInitial],
  ([newArea, newType, newInitial], []) => {
    console.log("new", newInitial);
    queryArtistListData(newArea, newType, newInitial);
  }
);

const queryArtistListData = async (area, type, initial, offset) => {
  const artistRes = await getArtistList({ area, type, initial, offset });
  artistListData.value = artistRes.artists;
};
onMounted(() => {
  queryArtistListData();
});

const changeData = (type, val, data) => {
  if (type === "area") {
    artistAreaMenusList.value = data;
    currentArea.value = val;
  } else if (type === "type") {
    artistTypeMenusList.value = data;
    currentType.value = val;
  } else {
    artistInitialMenusList.value = data;
    currentInitial.value = val;
  }
};
</script>

<style scoped lang="less">
.artist {
  &-main {
    width: 100%;
  }
}
</style>
