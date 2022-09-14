<template>
  <div class="singer-detail-nav">
    <div class="singer-detail-nav__wrapper">
      <nav>
        <RouterLink  v-for="(item,index) in data" :key="index" :to="item.path">
          {{item.name}}
        </RouterLink>
      </nav>
    </div>

  </div>
</template>


<script setup >
 import { RouterLink } from "vue-router";

  defineProps({
    data: {
      type:Array,
      default: ()=> []
    },
  });

</script>

<style scoped lang="less">
  
</style>