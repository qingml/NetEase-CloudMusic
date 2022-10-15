<template>
  <div>
    <Swiper
      loop
      grabCursor
      centeredSlides
      :effect="'coverflow'"
      :initialSlide="3"
      :slidesPerView="2"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false, //用户操作之后是否停止自动轮播默认true
      }"
      :coverflowEffect="{
        rotate: 30,
        stretch: 0,
        depth: 80,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="{ clickable: true }"
      :modules="modules"
      class="swiper-container"
    >
      <SwiperSlide v-for="(item, idx) in data" :key="idx">
        <div class="banner-item">
          <ElImage :src="item.imageUrl" lazy />
          <span class="banner-item__type">{{ item.typeTitle }}</span>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination, Autoplay, EffectFade } from "swiper";
import { type PropType } from "vue";
import { ElImage } from "element-plus";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export interface IBannerItem {
  imageUrl: string;
  typeTitle: string;
  url: string;
}

defineProps({
  data: {
    type: Array as PropType<IBannerItem[]>,
    default: () => [],
  },
});

const modules = [EffectCoverflow, Pagination, Autoplay, EffectFade];
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 550px;
  height: 200px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 220px;
  border-radius: 8px;
}

.banner-item {
  position: relative;

  &__type {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #bd534f;
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: bolder;
  }
}
</style>
