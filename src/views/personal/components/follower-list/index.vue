<template>
  <ElDialog
    v-model="visible"
    class="follow__dialog"
    @close="handleClose"
    width="60%"
    :center="true"
  >
    <div class="follow-detail-container">
      <h2 class="follow-title">
        {{ title }}
      </h2>
      <div class="list-block">
        <div class="list-item" v-for="(item, index) in data" :key="index">
          <div class="user-img">
            <ElImage
              :src="item.avatarUrl + '?param=100y100'"
              @click="handleClick(item.userId)"
            />
          </div>
          <div class="user-description">
            <span class="nickname">{{ item.nickname }}</span>
            <p class="user-signature ellipsis">{{ item.signature }}</p>
            <div class="user-playlist">
              <span class="playlist">歌单：{{ item.playlistCount }}</span>
              <span class="fenge">|</span>
              <span class="follow">粉丝：{{ item.followeds }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ElDialog>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { ElDialog } from "element-plus";
import { IFollowItem } from "../../type";

const router = useRouter();

defineProps({
  data: {
    type: Array as PropType<IFollowItem[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);

const handleClick = (id: string) => {
  emit("update:visible", false);

  router.push(`/personal-info/${id}`);
};

const handleClose = () => {
  emit("update:visible", false);
};
</script>

<style lang="less" scoped>
.follow-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .follow-title {
    display: inline-block;
    font-family: fantasy;
    font-weight: 600;
    font-size: 24px;
  }
  .list {
    &-block {
      margin: 20px auto;
      display: flex;
      flex-wrap: wrap;
      max-height: 500px;
      width: 885px;
      overflow: auto;
    }

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 150px;
      margin: 20px 145px 20px 0;

      .el-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px dotted;

        cursor: pointer;
      }
      .user-description {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-left: 10px;
        .nickname {
          font-weight: 500;
        }

        p {
          width: 200px;
          max-height: 40px;
          padding: 8px 0;
          font-size: 12px;
          font-weight: 300;
        }

        .user-playlist {
          line-height: 14px;

          span {
            font-size: 12px;
            font-weight: 300;
            display: inline-block;
          }

          span.fenge {
            padding: 0 8px;
          }
        }
      }
    }
  }
}
</style>
