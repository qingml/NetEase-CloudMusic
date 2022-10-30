<template>
  <div class="recommend-singers__container">
    <TopTitle title="推荐歌手" />
    <SingerList :data="data" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import TopTitle from "@/components/base/top-title/index.vue";
import SingerList from "@/components/base/singers/index.vue";
import { IRecommendSingersItem } from "@/components/base/singers/type";

defineProps({
  data: {
    type: Array as PropType<IRecommendSingersItem[]>,
    default: () => [],
  },
});
</script>

<style lang="less">
.recommend-singers {
  &__container {
    padding-top: 24px;
  }
}
</style>
