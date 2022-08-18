declare module "*.vue" {
  import Vue from "@/vue";
  export default Vue;
}

declare module "swiper" {
  import swiper, { EffectCoverflow, Pagination } from "swiper";

  export { EffectCoverflow, Pagination };
  export default swiper;
}

declare module "swiper/vue" {
  import { Swiper, SwiperSlide } from "swiper/vue";
  export { Swiper, SwiperSlide };
}
