<template>
  <div class="mv-detail-whole">
    <div class="mv-detail-left">
      <MvDetailInfo
        :infoData="mvDetailData"
        :descriData="mvDescriData"
        :countData="mvRelatedCountData"
      />
      <div class="comment">
        <CommentsDetail
          v-if="hasHotCom"
          :isMv="true"
          :data="mvHotCommentData"
          :showLine="false"
        />
        <CommentsDetail
          :isMv="true"
          :data="mvLatestCommentData"
          :showLine="false"
        />
      </div>

      <div class="mv-comment-pagination-block">
        <div class="mv-comment-pagination-block-wrap">
          <span class="el-page-total">共{{ commentCount }}条</span>
          <el-pagination
            v-model:currentPage="currentPage1"
            :page-size="20"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next"
            :total="commentCount"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="mv-detail-right">
      <playlistDetailSubcibers
        :isMvDescri="true"
        :mvDescriData="mvBriefDescriData"
      />
      <MvRecommend :data="mvRecommendData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

import {
  getMVComment,
  getMVDetailCount,
  getMVDetailDesc,
  getMVDetailInfo,
  getMVRecommend,
} from "@/api/mv-detail";

import MvDetailInfo from "../../components/mv-detail-info/index.vue";
import playlistDetailSubcibers from "@/components/playlist-detail-subscribers/index.vue";
import MvRecommend from "../../components/mv-recommend/index.vue";
import CommentsDetail from "@/components/comments-detail/index.vue";

const currentPage1 = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);


const { currentRoute } = useRouter();
const mvId = currentRoute?.value?.params?.id as string;
const hasHotCom = ref(true);
const commentCount = ref(0);
const mvDetailData = ref({});
const mvDescriData = ref({});
const mvRelatedCountData = ref({});
const mvBriefDescriData = ref("");
const mvRecommendData = ref([]);
const mvHotCommentData = ref([]);
const mvLatestCommentData = ref([]);

const queryMVDetailData = async (mvId: string) => {
  const [
    mvDetailDataRes,
    mvDescriRes,
    mvRelatedCountRes,
    mvRecommendRes
  ] = await Promise.all([
    getMVDetailInfo(mvId),
    getMVDetailDesc(mvId),
    getMVDetailCount(mvId),
    getMVRecommend(mvId),
   
  ]);

  mvDetailData.value = mvDetailDataRes?.data;
  mvDescriData.value = mvDescriRes?.data;
  mvRelatedCountData.value = mvRelatedCountRes;
  commentCount.value = mvRelatedCountRes?.commentCount;
  mvBriefDescriData.value = mvDescriRes?.data.briefDesc.length
    ? mvDescriRes.data.briefDesc
    : "视频暂无简介";
  mvRecommendData.value = mvRecommendRes?.mvs;
};

const queryCommentData = async (mvId: string, offset: number = 0) => {
  const mvCommentRes = await getMVComment(mvId, offset);

  mvHotCommentData.value = mvCommentRes?.hotComments;
  mvLatestCommentData.value = mvCommentRes?.comments;
  hasHotCom.value = mvCommentRes?.hotComments ? true : false;
  
};
const handleCurrentChange = (val: number) => {
  queryCommentData(mvId, (val - 1) * 20);
};

onMounted(() => {
  queryMVDetailData(mvId), queryCommentData(mvId);
});
onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    queryMVDetailData(to.params.id as string);
  }
});
</script>

<style lang="less">
.mv-detail {
  &-whole {
    display: flex;
  }

  &-left {
    width: 960px;
    padding-right: 32px;

    .comment {
      margin-top: -30px;
      padding-left: 5px;
    }

    .mv-comment-pagination-block {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &-wrap {
        padding-bottom: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .el-page-total {
        font-size: 13px;
      }
      .el-pager li,
      .el-pagination .btn-next,
      .el-pagination .btn-prev {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
      }

      .el-pager li {
        font-weight: 500;
        font-size: 12px;

        &:hover {
          color: var(--vt-c-text-light-2);
        }
      }
      .el-pager li.is-active {
        background-color: var(--vt-c-text-light-2);
        color: #fff;
      }
    }
  }
  &-right {
    width: 320px;

    flex-direction: column;
  }
}
</style>
