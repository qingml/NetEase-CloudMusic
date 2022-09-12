<template>
  <div class="playlist-related-recommend__container">
    <TopTitle :show-line="true" title="相关推荐" />
    <div class="playlist-related-recommend__block">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="playlist-related-recommend__block--item"
        @click="() => handleJumpDetail(item.id)"
      >
        <img
          :src="item.coverImgUrl"
          class="playlist-related-recommend__block--item-img"
        />
        <div class="playlist-related-recommend__block--item-content">
          <div
            class="playlist-related-recommend__block--item-content-name ellipsis"
          >
            {{ item.name }}
          </div>
          <span class="playlist-related-recommend__block--item-content-creator">
            By. {{ item.creator.nickname }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTitle from "@/components/base/top-title/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const handleJumpDetail = (id) => {
  router.replace(`/playlist-detail/${id}`);
};
</script>

<style lang="less">
.playlist-related-recommend {
  &__container {
    width: 320px;
    padding: 15px 10px 15px;
    padding-bottom: 25px;
  }

  &__block {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;

    &--item {
      width: 100%;
      height: 50px;
      display: flex;
      &-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
      }
      &-content {
        padding-left: 15px;
        height: 50px;
        width: 240px;
        &-name {
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: var(--color-text-red);
          }
        }
        &-creator {
          font-size: 12px;
          color: #a5a5c1;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
