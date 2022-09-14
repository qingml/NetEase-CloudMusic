<template>
  <div class="singerlist-detail-whole"> 
    <div class="singerlist-detail-top">
      <SingerInfo :data="singerInfoData" />
    </div>
     <div class="singerlist-detail-bottom">
      <SingerDetailNav :data="singermenus" />
      <div class="singerlist-detail-bottom__content">
        <RouterView />
      </div>
     </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter} from "vue-router";
import { RouterView } from "vue-router";
import SingerInfo from "@/components/singer-detail-info/index.vue"
import SingerDetailNav from "@/components/singer-detail-nav/index.vue"
import { singermenus } from "@/constants/singerdetaimenus";
import { getSingerDetailInfo } from "@/api/singerlist-detail";

const { currentRoute } = useRouter();
const singerId = currentRoute?.value?.params?.id as string;


const singerInfoData = ref({});

onMounted(async () => {
  const [singerInfoRes] = await Promise.all(
    [getSingerDetailInfo(singerId)]
  );

  singerInfoData.value = singerInfoRes.artist;
})

</script>

<style lang="less">
  .singerlist-detail {
    &-top{
      width: 100%;
      height: 550px;
      background: url(/img/top-bg.5c3d6989.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
     
    }
  }
</style>