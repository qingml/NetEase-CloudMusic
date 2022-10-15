<template>
  <div v-if="visible" class="music-overlay__wrapper">
    <div class="search-area__container">
      <div class="search-area__block">
        <ElInput
          size="large"
          placeholder="请输入歌手、歌曲、专辑名搜索"
          :suffix-icon="Search"
          v-model="searchWord"
          @change="handleChange"
        />
      </div>
      <div class="search-area__tags">
        <div class="history-tags">
          <p>历史搜索</p>
        </div>
        <div class="hot-tags">
          <p>热门搜索</p>
          <ElTag
            v-if="hotTags?.length"
            v-for="(item, key) in hotTags"
            :key="key"
            :label="item.first"
            type="info"
            effect="light"
            round
          >
            {{ item.first }}
          </ElTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from "vue";
import { ElInput, ElTag } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { querySearchHotTag } from "@/api/search";

interface HotTagItem {
  first: string;
  iconType: number;
  second: number;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const hotTags = ref<HotTagItem[]>();
const searchWord = ref("");

const emit = defineEmits(["update:visible", "close"]);

const { visible } = toRefs(props);

const openOverlay = (e: any) => {
  if (e.code === "Escape") {
    emit("update:visible", false);
  }
};

const getHotSearchTags = async () => {
  try {
    const resp = await querySearchHotTag();
    if (resp.code === 200) {
      console.log("resp.result, ", resp.result);
      hotTags.value = resp.result?.hots;
    }
  } catch (error) {
    console.log("error");
  }
};

onMounted(async () => {
  document.addEventListener("keyup", openOverlay);

  getHotSearchTags();
});

onUnmounted(() => {
  document.removeEventListener("keyup", openOverlay);
});

const handleChange = (value: string) => {
  console.log("value", value);
};
</script>

<style lang="less" scoped>
.music-overlay {
  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    backdrop-filter: blur(20px);
    .search-area {
      &__container {
        width: 780px;
        background-color: #fff;
      }
      &__block {
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-input.el-input {
          width: 700px;
        }
      }

      &__tags {
        margin: 20px 50px;

        .el-tag {
          margin: 0 20px 20px 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
