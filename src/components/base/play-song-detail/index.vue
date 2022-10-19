<template>
  <div class="play-page">
    <div class="wrapper" :class="isRotate">
      <div class="page-left" >
        <div class="img-wrapper" :class="isRotate"></div>
        <img :src="songDeatail?.picUrl" />
      </div>
      <div class="page-right">
        <h3>
          {{ songDeatail?.name }}
        </h3>
        <p>{{ songDeatail?.singer }} - {{ songDeatail?.name }}</p>
        <div class="lyric"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fromPairs } from "lodash-es";
import { onMounted, ref } from "vue";

const isRotate = ref('rotate')

const props = defineProps({
  songDeatail: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.play-page {
  z-index: 10;
  position: relative;
  width: 100%;
  background-color: #fff;
  padding-top: 30px;

  .wrapper {
    display: flex;
    flex-direction: row;
  }

  .page-left {
    width: 50%;

    img {
      width: 400px;
      height: 400px;
      border-radius: 10px;
      position: relative;
    }

    .img-wrapper {
      &::after {
        content: "";
        border-radius: 50%;
        left: 80px;
        z-index: -1;
        top: 0px;
        position: absolute;
        width: 400px;
        height: 400px;
        display: block;
        box-shadow: 5px 0 10px -5px #141414;
        // animation: spin 2s linear 1s infinite;
        background: transparent url(/img/bofang.png) center no-repeat;
        transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.8s 0.5s;
      }
      
    }

  }

  .page-right {
    width: 50%;
    h3 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
    }

    .lyric {
      width: 100%;
      margin-top: 30px;
      padding: 30px;
      height: 480px;
      border-radius: 4px;
      overflow: hidden;
      background: #f8f9ff;
    }
  }
}
</style>
