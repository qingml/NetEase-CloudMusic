<template>
  <div>
    <ElImage :src="item.picUrl" />
    <div class="recommend-play-list__block--item-bottom">
      <span class="recommend-play-list__block--item-count">
        <i class="iconfont icon-erji"></i>
        <span>{{ formatNumber(item.playCount) }}</span>
      </span>
      <i class="iconfont icon-bofang"></i>
    </div>
    <div class="recommend-play-list__block--item-title" :title="item.name">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
</script>
<style>
</style>
