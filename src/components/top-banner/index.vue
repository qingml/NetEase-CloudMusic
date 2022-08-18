<template>
	<div>
		<Swiper :effect="'coverflow'" :grabCursor="true" :autoPlay="1000" :centeredSlides="true" :slidesPerView="'auto'"
			:coverflowEffect="{
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			}" :pagination="true" :modules="modules" class="mySwiper">
			<SwiperSlide v-for="(item, idx) in data" :key="idx">
				<div class="banner-item">
					<img :src="item.imageUrl" />
					<span class="banner-item__type">{{ item.typeTitle }}</span>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper";
import { PropType, ref, computed, watch } from "vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export interface IBannerItem {
	imageUrl: string,
	typeTitle: string,
	url: string
}

defineProps({
	data: {
		type: Array as PropType<IBannerItem[]>,
		default: () => []
	}
})





const modules = [EffectCoverflow, Pagination]
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
	height: 200px;
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